import type { Arquivo } from '@/config/entrega';

const site = () => (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
/** Link completo para arquivos que estão no próprio site ("/arquivos/..."). */
export const linkAbsoluto = (u: string) => (u.startsWith('/') ? `${site()}${u}` : u);

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function layout(titulo: string, corpo: string): string {
  const suporte = soEmail(process.env.NEXT_PUBLIC_SUPORTE_EMAIL);
  return `<!doctype html><html><body style="margin:0;background:#F9F5E8;font-family:Arial,Helvetica,sans-serif;color:#1E2B25">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 14px">
  <table width="100%" style="max-width:540px;background:#FFFDF8;border-radius:22px;overflow:hidden;border:1px solid #E6DDC6" cellpadding="0" cellspacing="0">
  <tr><td style="background:#0B3D2E;padding:22px 24px" align="center"><img src="${site()}/brand/logo-horizontal.png" width="220" alt="Kits pra Vender" style="display:block;background:#F9F5E8;border-radius:10px;padding:8px 12px"></td></tr>
  <tr><td style="height:6px;background:#A61C2A"></td></tr>
  <tr><td style="padding:26px 26px 6px;font-size:23px;font-weight:bold;color:#0B3D2E;text-align:center">${titulo}</td></tr>
  ${corpo}
  <tr><td style="padding:18px 26px 26px;font-size:12.5px;line-height:1.5;color:#5B655F;text-align:center">Guarde este e-mail: os links ficam sempre disponíveis.${suporte ? `<br>Dúvidas? Responda este e-mail ou escreva para ${esc(suporte)}.` : ''}</td></tr>
  </table>
  <p style="font-size:11px;color:#8a8f88;max-width:540px">Produto digital. Os resultados dependem da dedicação de cada pessoa.</p>
  </td></tr></table></body></html>`;
}

const botao = (href: string, rotulo: string) =>
  `<a href="${esc(href)}" style="display:block;background:#A61C2A;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 18px;border-radius:12px;margin:0 0 10px;text-align:center">⬇ ${esc(rotulo)}</a>`;

/**
 * Envia pela Resend. A chave de idempotência (pedido + produto) impede e-mail repetido
 * quando a Kiwify manda o mesmo aviso mais de uma vez.
 */
/** Tira só o endereço de um texto (aceita espaços, aspas ou "Nome <email>"). */
const soEmail = (v: string | undefined) => (v || '').match(/[^\s<>"',;]+@[^\s<>"',;]+\.[a-z]{2,}/i)?.[0] || '';

/** Remetente: aceita "email" ou "Nome <email>". Só o e-mail vira "Kits pra Vender <email>" (nome que aparece na caixa de entrada). */
function remetente(): string {
  const v = (process.env.EMAIL_FROM || '').trim().replace(/^["']|["']$/g, '');
  const email = soEmail(v);
  if (!email) return '';
  const nome = v.includes('<') ? v.slice(0, v.indexOf('<')).trim().replace(/^["']|["']$/g, '') : '';
  return `${nome || 'Kits pra Vender'} <${email}>`;
}

async function enviar(para: string, assunto: string, html: string, idempotencia: string): Promise<{ ok: boolean; erro?: string }> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = remetente();
  if (!key || !from) return { ok: false, erro: 'RESEND_API_KEY ou EMAIL_FROM não configurados (ou EMAIL_FROM sem um e-mail válido)' };
  // Responder para: o e-mail de suporte, só se for um endereço válido (um valor fora do formato fazia o Resend recusar o envio).
  const replyTo = soEmail(process.env.NEXT_PUBLIC_SUPORTE_EMAIL) || undefined;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', 'Idempotency-Key': idempotencia.slice(0, 256) },
      body: JSON.stringify({ from, to: para, subject: assunto, html, reply_to: replyTo }),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error('resend', r.status, t);
      return { ok: false, erro: `${r.status} ${t.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    console.error('resend', e);
    return { ok: false, erro: String(e) };
  }
}

export function montarEntrega(o: { nome: string; titulo: string; arquivos: Arquivo[]; principal: boolean }) {
  const primeiro = (o.nome || '').trim().split(/\s+/)[0];
  const ola = primeiro ? `Oi, ${esc(primeiro)}!` : 'Oi!';
  const prontos = o.arquivos.filter((a) => a.url);
  const assunto = o.principal ? '🎄 Seus 40 Kits de Natal chegaram!' : `🎁 Seu material extra: ${o.titulo}`;
  const intro = o.principal
    ? `${ola} Sua compra do <b>${esc(o.titulo)}</b> foi aprovada. Aqui estão os seus materiais:`
    : `${ola} Sua compra do <b>${esc(o.titulo)}</b> foi aprovada. Aqui está o seu material:`;
  const dica = o.principal
    ? `<tr><td style="padding:6px 26px 0;font-size:14px;line-height:1.55;color:#1E2B25"><b>Por onde começar:</b> abra o PDF principal, leia as páginas de boas-vindas e escolha 2 ou 3 kits para montar as primeiras amostras. Os moldes estão no final do material.</td></tr>`
    : '';
  const lista = prontos.length
    ? prontos.map((a) => botao(linkAbsoluto(a.url), a.nome)).join('')
    : `<p style="font-size:14px;color:#A61C2A">Os links do material estão sendo preparados e chegam em seguida.</p>`;
  const html = layout(
    o.principal ? 'Seu material de Natal chegou! 🎄' : 'Seu material extra chegou! 🎁',
    `<tr><td style="padding:8px 26px 14px;font-size:15px;line-height:1.55;text-align:center">${intro}</td></tr>
     <tr><td style="padding:4px 26px 8px">${lista}</td></tr>${dica}`,
  );
  return { assunto, html };
}

export async function enviarEntrega(o: { para: string; nome: string; titulo: string; arquivos: Arquivo[]; principal: boolean; chave: string }) {
  const { assunto, html } = montarEntrega(o);
  return enviar(o.para, assunto, html, o.chave);
}
