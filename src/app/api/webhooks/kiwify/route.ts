import { createHmac, timingSafeEqual } from 'crypto';
import { bumpsNoPedido, produtoDoPedido, type Produto } from '@/config/entrega';
import { enviarEntrega } from '@/lib/server/email';
import { sendUtmifyOrder } from '@/lib/server/utmify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Obj = Record<string, unknown>;
const obj = (o: Obj, ...k: string[]): Obj => {
  for (const x of k) if (o[x] && typeof o[x] === 'object') return o[x] as Obj;
  return {};
};
const str = (o: Obj, ...k: string[]): string => {
  for (const x of k) if (typeof o[x] === 'string' || typeof o[x] === 'number') return String(o[x]);
  return '';
};
const json = (d: unknown, status = 200) => Response.json(d, { status });

/** Kiwify assina o corpo com HMAC-SHA1 usando o token do webhook (um por produto: separe por vírgula). */
function assinaturaValida(raw: string, sig: string | null, corpo?: unknown): boolean {
  const tokens = (process.env.KIWIFY_WEBHOOK_TOKEN ?? '').split(/[\s,;]+/).filter(Boolean);
  if (!tokens.length) return true; // sem token configurado, aceita (configure em produção)
  if (!sig) return false;
  // A Kiwify calcula sobre o JSON do pedido; aceita o corpo como chegou ou re-serializado.
  const textos = [raw, corpo === undefined ? '' : JSON.stringify(corpo)].filter(Boolean);
  return tokens.some((t) =>
    textos.some((txt) => {
      const esperado = createHmac('sha1', t).update(txt).digest('hex');
      try {
        return timingSafeEqual(Buffer.from(esperado), Buffer.from(sig.toLowerCase()));
      } catch {
        return false;
      }
    }),
  );
}

/**
 * Diagnóstico: abra https://SEU-DOMINIO/api/webhooks/kiwify no navegador.
 * Mostra só se cada configuração existe (nunca os valores) e se o domínio do remetente está verificado no Resend.
 */
export async function GET() {
  const from = process.env.EMAIL_FROM || '';
  const dominio = (from.match(/@([^>\s]+)/)?.[1] || '').toLowerCase();
  let resendDominio: string = 'não deu para conferir';
  const key = process.env.RESEND_API_KEY;
  if (key && dominio) {
    try {
      const r = await fetch('https://api.resend.com/domains', { headers: { authorization: `Bearer ${key}` } });
      if (r.status === 401 || r.status === 403) resendDominio = 'a chave do Resend é só de envio (normal); confira em resend.com/domains se o domínio está "Verified"';
      else if (r.ok) {
        const d = (await r.json()) as { data?: { name: string; status: string }[] };
        const achou = d.data?.find((x) => x.name.toLowerCase() === dominio);
        resendDominio = achou ? `domínio ${dominio}: ${achou.status}` : `domínio ${dominio} NÃO está cadastrado no Resend`;
      } else resendDominio = `Resend respondeu ${r.status}`;
    } catch {
      /* ignore */
    }
  }
  return json({
    webhook: 'ok, esta rota está no ar',
    KIWIFY_WEBHOOK_TOKEN: (process.env.KIWIFY_WEBHOOK_TOKEN ?? '').split(/[\s,;]+/).filter(Boolean).length + ' token(s)',
    RESEND_API_KEY: !!key,
    EMAIL_FROM: from ? `preenchido (domínio: ${dominio || 'não reconhecido'})` : false,
    resend: resendDominio,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || false,
    NEXT_PUBLIC_SUPORTE_EMAIL: process.env.NEXT_PUBLIC_SUPORTE_EMAIL ? (/^[^\s<>"',;]+@[^\s<>"',;]+\.[a-z]{2,}$/i.test(process.env.NEXT_PUBLIC_SUPORTE_EMAIL.trim()) ? 'ok' : 'fora do formato (o e-mail de resposta é ignorado até corrigir)') : 'vazio',
    UTMIFY_API_TOKEN: !!process.env.UTMIFY_API_TOKEN,
  });
}

/**
 * Webhook da Kiwify (Apps → Webhooks). Eventos: Compra aprovada, Reembolso e Chargeback.
 * Compra aprovada → envia por e-mail os materiais do produto comprado (e de cada order bump, num e-mail próprio).
 * Order bump (pedido à parte) → também repassa a venda para a Utmify pela API.
 * Os registros ficam nos logs da Vercel (Deployments → Logs).
 */
export async function POST(req: Request) {
  const raw = await req.text();
  let body: Obj;
  try {
    body = JSON.parse(raw);
  } catch {
    console.warn('[kiwify] corpo inválido');
    return json({ error: 'json' }, 400);
  }
  if (!assinaturaValida(raw, new URL(req.url).searchParams.get('signature'), body)) {
    console.warn('[kiwify] recusado: token não confere (confira KIWIFY_WEBHOOK_TOKEN)', { temAssinatura: !!new URL(req.url).searchParams.get('signature') });
    return json({ error: 'signature' }, 401);
  }
  const o: Obj = body.order && typeof body.order === 'object' ? (body.order as Obj) : body;
  const cliente = obj(o, 'Customer', 'customer');
  const prod = obj(o, 'Product', 'product');
  const email = str(cliente, 'email').trim().toLowerCase();
  const nome = str(cliente, 'full_name', 'name');
  const pedido = str(o, 'order_id', 'id', 'order_ref');
  const status = str(o, 'order_status', 'status').toLowerCase();
  const evento = str(o, 'webhook_event_type', 'event').toLowerCase();
  const nomeProduto = str(prod, 'product_name', 'name') || str(o, 'product_name');
  const idProduto = str(prod, 'product_id', 'id');
  console.log('[kiwify] recebido', { evento, status, nomeProduto, pedido });

  // Botão "Testar" da Kiwify: cliente fictício. Só confirma que chegou.
  if (/@example\.(com|org|net)$/.test(email)) {
    console.log('[kiwify] teste recebido', { evento, nomeProduto });
    return json({ ok: true, teste: true });
  }
  if (!pedido) return json({ ok: true, ignorado: 'sem pedido' });

  const produto = produtoDoPedido(nomeProduto, idProduto);
  const pago = status === 'paid' || status === 'approved' || evento === 'order_approved';
  const reembolso = ['refunded', 'chargedback', 'chargeback'].includes(status) || ['order_refunded', 'chargeback'].includes(evento);

  // Dados para a Utmify (só order bumps: a venda principal chega na Utmify pelo webhook dela).
  const com = obj(o, 'Commissions', 'commissions');
  const centavos = Math.round(Number(str(com, 'charge_amount', 'product_base_price')) || 0);
  const utms: Obj = {};
  for (const [k, v] of Object.entries(obj(o, 'TrackingParameters', 'tracking_parameters'))) if (v) utms[k] = v;
  const utmify = (st: 'paid' | 'refunded' | 'chargedback') =>
    sendUtmifyOrder({
      orderId: pedido,
      status: st,
      paymentMethod: str(o, 'payment_method'),
      createdAt: str(o, 'created_at') || null,
      approvedAt: str(o, 'approved_date') || null,
      refundedAt: str(o, 'refunded_at') || null,
      customer: { name: nome, email, phone: str(cliente, 'mobile', 'phone'), document: str(cliente, 'CPF', 'cpf', 'cnpj') || null, ip: str(cliente, 'ip') || null },
      product: { id: idProduto || pedido, name: nomeProduto || produto?.titulo || 'Order bump', priceInCents: centavos },
      feeInCents: Math.round(Number(str(com, 'kiwify_fee')) || 0) || undefined,
      netInCents: Math.round(Number(str(com, 'my_commission')) || 0) || undefined,
      utms,
    });

  if (reembolso) {
    const ut = produto?.tipo === 'bump' ? await utmify(status.includes('charge') || evento.includes('charge') ? 'chargedback' : 'refunded') : false;
    console.log('[kiwify] reembolso', { pedido, nomeProduto, utmify: ut });
    return json({ ok: true, reembolso: true });
  }
  if (!pago) return json({ ok: true, ignorado: status || evento });
  if (!email) return json({ ok: true, ignorado: 'sem e-mail' });
  if (!produto) {
    console.warn('[kiwify] produto não reconhecido, nada enviado:', nomeProduto, idProduto);
    return json({ ok: true, ignorado: 'produto não reconhecido', produto: nomeProduto });
  }

  // 1) Materiais do produto comprado.
  const entregas: Produto[] = [produto];
  // 2) Order bumps que vieram dentro do mesmo pedido (cada um num e-mail próprio).
  if (produto.tipo === 'principal') {
    const semCliente = Object.fromEntries(Object.entries(o).filter(([k]) => !/customer|tracking/i.test(k)));
    entregas.push(...bumpsNoPedido(JSON.stringify(semCliente), produto.id));
  }

  const enviados: Record<string, boolean | string> = {};
  for (const p of entregas) {
    const r = await enviarEntrega({ para: email, nome, titulo: p.titulo, arquivos: p.arquivos, principal: p.tipo === 'principal', chave: `kiwify-${pedido}-${p.id}` });
    enviados[p.id] = r.ok || r.erro || false;
  }
  const ut = produto.tipo === 'bump' ? await utmify('paid') : undefined;
  console.log('[kiwify] compra', { pedido, nomeProduto, produto: produto.id, enviados, utmify: ut });
  return json({ ok: true, produto: produto.id, enviados, utmify: ut });
}
