'use client';

import { ArrowRight } from 'lucide-react';
import { checkoutUrl, track } from '@/lib/tracking';

/**
 * Botão de compra. Com link de checkout: abre o checkout com as UTMs e dispara InitiateCheckout.
 * Sem link (ou `href` começando com #): rola até a seção.
 */
export function Cta({ href, children, variant = 'vermelho', value, plano, className = '', pulse = false }: {
  href: string;
  children: React.ReactNode;
  variant?: 'vermelho' | 'verde' | 'linha';
  value?: number;
  plano?: string;
  className?: string;
  pulse?: boolean;
}) {
  const cls = `${variant === 'verde' ? 'btn-verde' : variant === 'linha' ? 'btn-linha' : 'btn-vermelho'} ${pulse ? 'pulso' : ''} ${className}`;
  const isAnchor = !href || href.startsWith('#');
  return (
    <a
      href={isAnchor ? href || '#planos' : href}
      className={cls}
      onClick={(e) => {
        if (isAnchor) return;
        e.preventDefault();
        track('InitiateCheckout', { value, currency: 'BRL', content_name: plano });
        window.location.href = checkoutUrl(href);
      }}
    >
      {children} <ArrowRight size={20} strokeWidth={2.6} className="shrink-0" />
    </a>
  );
}
