import Image from 'next/image';

/** Topo: capa do produto como um livro em 3D, com dois kits reais em leque atrás. */
export function HeroCollage({ capa, kits, className = '' }: { capa: string; kits: [string, string]; className?: string }) {
  const lado = 'absolute top-[10%] w-[38%] overflow-hidden rounded-[18px] border-[4px] border-white shadow-[0_18px_36px_-16px_rgba(30,43,37,.5)]';
  return (
    <div className={`relative mx-auto aspect-[1/1.02] w-full max-w-[500px] ${className}`}>
      <div className="absolute inset-[8%] rounded-full bg-dourado/30 blur-[60px]" aria-hidden />
      <div className={`${lado} left-0 -rotate-[9deg]`} style={{ aspectRatio: '2 / 3' }}>
        <Image src={kits[0]} alt="Kit de Natal montado" fill sizes="(max-width: 768px) 38vw, 190px" className="object-cover" />
      </div>
      <div className={`${lado} right-0 rotate-[9deg]`} style={{ aspectRatio: '2 / 3' }}>
        <Image src={kits[1]} alt="Kit de Natal montado" fill sizes="(max-width: 768px) 38vw, 190px" className="object-cover" />
      </div>
      {/* livro */}
      <div className="livro-cena absolute left-1/2 top-[1%] z-10 w-[58%] -translate-x-1/2">
        <div className="livro">
          <div className="livro-paginas" aria-hidden />
          <div className="livro-capa">
            <Image src={capa} alt="Capa do material 40 Kits de Natal para Montar e Vender" fill priority fetchPriority="high" sizes="(max-width: 640px) 54vw, 290px" className="object-cover" />
            <span className="livro-lombada" aria-hidden />
            <span className="livro-brilho" aria-hidden />
          </div>
        </div>
        <div className="livro-sombra" aria-hidden />
      </div>
    </div>
  );
}
