import Image from 'next/image';
import { categorias, kits, kitsDestaque } from '@/config/oferta';
import { Foto } from './Foto';

/** Vitrine: 6 kits com foto + chamada "e mais X kits" com miniaturas. */
export function KitsGrid() {
  const destaque = kitsDestaque.map((n) => kits.find((k) => k.n === n)!).filter(Boolean);
  const outros = kits.filter((k) => !kitsDestaque.includes(k.n));
  const mini = [11, 17, 8, 40, 29, 4].map((n) => kits.find((k) => k.n === n)!).filter(Boolean);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {destaque.map((k) => (
          <article key={k.n} className="card overflow-hidden">
            <Foto src={k.img} alt={`Foto: ${k.nome} montado`} ratio="4 / 5" sizes="(max-width: 768px) 50vw, 340px" />
            <div className="p-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-vermelho">{categorias.find((c) => c.id === k.cat)?.nome}</p>
              <h3 className="mt-0.5 text-[15px] font-extrabold leading-tight text-verde">{k.nome}</h3>
              <p className="mt-1 text-[12.5px] leading-snug text-cinza">{k.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="card mx-auto mt-5 flex max-w-[760px] flex-col items-center gap-4 p-5 text-center md:flex-row md:text-left">
        <div className="flex shrink-0 -space-x-4">
          {mini.map((k, i) => (
            <div key={k.n} className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-papel shadow-card" style={{ zIndex: 10 - i }}>
              <Image src={k.img!} alt="" fill sizes="56px" className="object-cover" />
            </div>
          ))}
        </div>
        <div>
          <p className="text-[18px] font-extrabold leading-tight text-verde">
            E mais <span className="text-vermelho">{outros.length} kits</span> no material
          </p>
          <p className="mt-1 text-[14px] leading-snug text-cinza">
            Das lembrancinhas de cerca de R$ 20 às caixas que passam de R$ 100: tem kit para todo bolso e toda ocasião.
          </p>
        </div>
      </div>
    </div>
  );
}
