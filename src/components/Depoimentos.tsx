import Image from 'next/image';

/** Depoimentos passando sozinhos em loop (CSS puro, leve e sem travar a rolagem). */
export function Depoimentos({ itens }: { itens: { img: string; w: number; h: number }[] }) {
  const lista = [...itens, ...itens];
  return (
    <div className="carrossel mt-8" aria-label="Prints de depoimentos de clientes">
      <div className="carrossel-trilho">
        {lista.map((d, i) => (
          <Image
            key={i}
            src={d.img}
            alt={i < itens.length ? `Depoimento ${i + 1}` : ''}
            aria-hidden={i >= itens.length}
            width={d.w}
            height={d.h}
            sizes="(max-width: 768px) 240px, 280px"
            className="h-[420px] w-auto shrink-0 rounded-2xl shadow-card md:h-[480px]"
          />
        ))}
      </div>
    </div>
  );
}
