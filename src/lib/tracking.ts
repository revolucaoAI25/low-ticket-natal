'use client';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const KEY = 'kpv:utms';
const TRACK = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'src', 'sck', 'xcod', 'fbclid'];

/** Guarda as UTMs da primeira página (o link do checkout é montado só no clique). */
export function captureUtms() {
  try {
    const q = new URLSearchParams(location.search);
    const found: Record<string, string> = {};
    TRACK.forEach((k) => {
      const v = q.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length) localStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* modo privado */
  }
}

/** Link do checkout com as UTMs (da URL atual ou guardadas). */
export function checkoutUrl(base: string): string {
  if (!base) return '';
  try {
    const url = new URL(base);
    let saved: Record<string, string> = {};
    try {
      saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch {
      /* ignore */
    }
    const cur = new URLSearchParams(location.search);
    TRACK.forEach((k) => {
      const v = cur.get(k) || saved[k];
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return base;
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  try {
    window.fbq?.('track', event, params);
  } catch {
    /* ignore */
  }
}
