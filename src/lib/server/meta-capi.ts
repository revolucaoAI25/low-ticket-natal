import { createHash } from 'crypto';

const sha = (v: string) => createHash('sha256').update(v.trim().toLowerCase()).digest('hex');

export interface CapiPurchase {
  orderId: string;
  value: number;
  contentName: string;
  email?: string | null;
  phone?: string | null;
  ip?: string | null;
  fbclid?: string | null;
}

/**
 * Compra de order bump para a Meta pela API de Conversões (servidor), igual ao ID Pet.
 * A compra principal vai pela Utmify; os order bumps (pedidos à parte) vão daqui.
 * Precisa de META_CAPI_TOKEN e NEXT_PUBLIC_META_PIXEL_ID na Vercel; sem eles, não faz nada.
 */
export async function sendCapiPurchase(p: CapiPurchase): Promise<boolean> {
  const token = process.env.META_CAPI_TOKEN;
  const pixel = (process.env.NEXT_PUBLIC_META_PIXEL_ID || '').replace(/\D/g, '');
  if (!token || !pixel) return false;
  const digits = (p.phone ?? '').replace(/\D/g, '');
  const user_data: Record<string, unknown> = {};
  if (p.email) user_data.em = [sha(p.email)];
  if (digits) user_data.ph = [sha(digits.startsWith('55') ? digits : '55' + digits)];
  if (p.ip) user_data.client_ip_address = p.ip;
  if (p.fbclid) user_data.fbc = `fb.1.${Date.now()}.${p.fbclid}`;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const body: Record<string, unknown> = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: `kiwify-${p.orderId}`,
        action_source: 'website',
        event_source_url: `${site}/obrigado`,
        user_data,
        custom_data: { currency: 'BRL', value: Math.round(p.value * 100) / 100, content_name: p.contentName, order_id: p.orderId },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) console.error('[kiwify] capi', r.status, await r.text());
    return r.ok;
  } catch (e) {
    console.error('[kiwify] capi', e);
    return false;
  }
}
