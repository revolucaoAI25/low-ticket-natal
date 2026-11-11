'use client';

import Image from 'next/image';
import { Check, Gift, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { checkoutUrl, track } from '@/lib/tracking';

const KEY = 'kpv:saida';
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/**
 * Pop-up de saída: oferece o Plano Completo (com os 3 bônus) pelo preço do Essencial.
 * Computador: quando o mouse sai pelo topo da janela. Celular: no botão/gesto de voltar.
 * Aparece uma vez por visita e não aparece para quem já clicou em comprar.
 */
export function ExitPopup({ href, preco, precoDe, bonus, capa }: { href: string; preco: number; precoDe: number; bonus: string[]; capa: string }) {
  const [open, setOpen] = useState(false);
  const armed = useRef(false);

  const jaViu = () => {
    try {
      return sessionStorage.getItem(KEY) === '1' || sessionStorage.getItem('kpv:checkout') === '1';
    } catch {
      return false;
    }
  };
  const mostrar = useCallback(() => {
    if (jaViu()) return false;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setOpen(true);
    track('ViewContent', { content_name: 'Pop-up de saída' });
    return true;
  }, []);

  useEffect(() => {
    if (jaViu()) return;
    const t0 = Date.now();
    // Computador: mouse saindo pelo topo (depois de alguns segundos na página).
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0 && Date.now() - t0 > 6000) mostrar();
    };
    document.addEventListener('mouseout', onOut);
    // Celular: arma o "voltar" depois que a pessoa rolou um pouco a página.
    const onPop = () => {
      if (!armed.current) return;
      armed.current = false;
      if (!mostrar()) history.back();
    };
    const arm = () => {
      if (armed.current || window.scrollY < 600 || jaViu()) return;
      armed.current = true;
      try {
        history.pushState({ kpvSaida: true }, '');
      } catch {
        /* ignore */
      }
      window.removeEventListener('scroll', arm);
    };
    window.addEventListener('scroll', arm, { passive: true });
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('scroll', arm);
      window.removeEventListener('popstate', onPop);
    };
  }, [mostrar]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  const comprar = () => {
    track('InitiateCheckout', { value: preco, currency: 'BRL', content_name: 'Plano Completo (pop-up de saída)' });
    try {
      sessionStorage.setItem('kpv:checkout', '1');
    } catch {
      /* ignore */
    }
    if (href) window.location.href = checkoutUrl(href);
    else {
      setOpen(false);
      document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 backdrop-blur-[2px] sm:items-center" onClick={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="saida-titulo"
        className="saida-pop relative max-h-[92dvh] w-full max-w-[440px] overflow-y-auto rounded-[28px] bg-papel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={() => setOpen(false)} aria-label="Fechar" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white">
          <X size={20} />
        </button>
        <div className="neve rounded-t-[28px] bg-vermelho px-6 pb-5 pt-6 text-center text-white">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-dourado">Espera! Antes de sair…</p>
          <h2 id="saida-titulo" className="mt-2 text-[24px] font-extrabold leading-tight">
            Leve o <span className="text-dourado">Plano Completo</span> pelo preço do Essencial
          </h2>
        </div>
        <div className="px-6 pb-6 pt-5">
          <div className="flex items-center gap-4">
            <div className="relative h-[120px] w-[90px] shrink-0 overflow-hidden rounded-lg shadow-card ring-1 ring-dourado/60">
              <Image src={capa} alt="Capa do material" fill sizes="90px" className="object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-cinza">
                De <span className="line-through">{brl(precoDe)}</span> por
              </p>
              <p className="text-[40px] font-extrabold leading-none text-verde">{brl(preco)}</p>
              <p className="mt-1 text-[12.5px] font-semibold text-cinza">os 40 kits + os 3 bônus</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-[14.5px] text-tinta">
            <li className="flex gap-2">
              <Check size={18} className="mt-0.5 shrink-0 text-verde" strokeWidth={3} /> 40 kits com moldes, lista de compras e passo a passo
            </li>
            {bonus.map((b) => (
              <li key={b} className="flex gap-2 font-bold text-verde">
                <Gift size={18} className="mt-0.5 shrink-0 text-vermelho" /> {b}
              </li>
            ))}
          </ul>
          <button type="button" onClick={comprar} className="btn-vermelho mt-6 !w-full !min-w-0">
            Quero o Completo por {brl(preco)}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="mt-3 w-full py-2 text-center text-[13px] font-semibold text-cinza underline">
            Não, obrigado. Vou perder os bônus.
          </button>
        </div>
      </div>
    </div>
  );
}
