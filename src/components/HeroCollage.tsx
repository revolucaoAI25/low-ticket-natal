import Image from 'next/image';

/** Topo: capa do produto na frente e dois kits reais em leque atrás. */
export function HeroCollage({ capa, kits, className = '' }: { capa: string; kits: [string, string]; className?: string }) {
  const lado = 'absolute top-[9%] w-[40%] overflow-hidden rounded-[18px] border-[4px] border-white/90 shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]';
  return (
    <div className={`relative mx-auto aspect-[1/1.02] w-full max-w-[500px] ${className}`}>
      <div className="absolute inset-[6%] rounded-full bg-dourado/30 blur-[60px]" aria-hidden />
      <div className={`${lado} left-0 -rotate-[9deg]`} style={{ aspectRatio: '2 / 3' }}>
        <Image src={kits[0]} alt="Kit de Natal montado" fill sizes="(max-width: 768px) 40vw, 200px" className="object-cover" />
      </div>
      <div className={`${lado} right-0 rotate-[9deg]`} style={{ aspectRatio: '2 / 3' }}>
        <Image src={kits[1]} alt="Kit de Natal montado" fill sizes="(max-width: 768px) 40vw, 200px" className="object-cover" />
      </div>
      <div className="absolute left-1/2 top-0 z-10 w-[62%] -translate-x-1/2 overflow-hidden rounded-[14px] shadow-[0_28px_60px_-18px_rgba(0,0,0,.75)] ring-2 ring-dourado/70" style={{ aspectRatio: '3 / 4' }}>
        <Image src={capa} alt="Capa do material 40 Kits de Natal para Montar e Vender" fill priority sizes="(max-width: 768px) 62vw, 310px" className="object-cover" />
      </div>
    </div>
  );
}
