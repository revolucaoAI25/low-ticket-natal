'use client';

import { useEffect, useState } from 'react';

/** Barra de compra fixa no celular: aparece depois do topo e some quando os planos estão na tela. */
export function StickyBar({ preco }: { preco: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('topo');
    const planos = document.getElementById('planos');
    let pastHero = false;
    let onPlans = false;
    const upd = () => setShow(pastHero && !onPlans);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === planos) onPlans = e.isIntersecting;
      });
      upd();
    });
    if (hero) io.observe(hero);
    if (planos) io.observe(planos);
    return () => io.disconnect();
  }, []);
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-papel/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex items-center gap-3">
        <div className="leading-tight">
          <p className="text-[11px] font-bold uppercase tracking-wide text-cinza">40 kits a partir de</p>
          <p className="text-[22px] font-extrabold text-verde">{preco}</p>
        </div>
        <a href="#planos" tabIndex={show ? 0 : -1} className="ml-auto flex min-h-[50px] items-center rounded-xl bg-vermelho px-5 text-[14px] font-extrabold uppercase text-white shadow-cta">
          Quero meus kits
        </a>
      </div>
    </div>
  );
}
