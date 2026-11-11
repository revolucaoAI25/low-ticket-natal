import Image from 'next/image';

/** Composição do topo: três kits reais em leque + selo "40 kits". */
export function HeroCollage({ fotos, className = '' }: { fotos: string[]; className?: string }) {
  const [centro, esq, dir] = fotos;
  const card = 'absolute overflow-hidden rounded-[22px] border-[5px] border-white bg-white shadow-[0_18px_40px_-18px_rgba(7,42,32,.55)]';
  return (
    <div className={`relative mx-auto aspect-[5/4] w-full max-w-[520px] ${className}`}>
      {/* brilho dourado atrás */}
      <div className="absolute inset-x-[12%] inset-y-[8%] rounded-full bg-dourado/25 blur-3xl" aria-hidden />
      <div className={`${card} left-[3%] top-[14%] w-[34%] -rotate-[8deg]`} style={{ aspectRatio: '2 / 3' }}>
        <Image src={esq} alt="Kit Cone de Docinhos Natalinos montado" fill sizes="(max-width: 768px) 34vw, 180px" className="object-cover" priority />
      </div>
      <div className={`${card} right-[3%] top-[14%] w-[34%] rotate-[8deg]`} style={{ aspectRatio: '2 / 3' }}>
        <Image src={dir} alt="Kit Natal Pet montado" fill sizes="(max-width: 768px) 34vw, 180px" className="object-cover" priority />
      </div>
      <div className={`${card} left-1/2 top-0 z-10 w-[44%] -translate-x-1/2`} style={{ aspectRatio: '2 / 3' }}>
        <Image src={centro} alt="Kit Ritual do Café Especial montado" fill sizes="(max-width: 768px) 44vw, 230px" className="object-cover" priority />
      </div>
      <div className="absolute bottom-[2%] left-[4%] z-20 flex h-[24%] w-[24%] min-w-[78px] max-w-[118px] -rotate-6 flex-col items-center justify-center rounded-full border-[3px] border-dourado bg-vermelho text-white shadow-cta">
        <span className="text-[clamp(22px,7vw,38px)] font-extrabold leading-none">40</span>
        <span className="text-[clamp(9px,2.6vw,13px)] font-extrabold uppercase tracking-wider">kits</span>
      </div>
      <div className="absolute bottom-[4%] right-[3%] z-20 rotate-3 rounded-full bg-verde px-3 py-1.5 text-[clamp(10px,2.8vw,13px)] font-extrabold uppercase tracking-wide text-dourado shadow-cta-verde">
        + moldes para imprimir
      </div>
    </div>
  );
}
