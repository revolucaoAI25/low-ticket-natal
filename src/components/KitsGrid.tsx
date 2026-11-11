import { Plus } from 'lucide-react';
import { categorias, kits, kitsDestaque } from '@/config/oferta';
import { Foto } from './Foto';

/** Vitrine: 6 kits com foto (um por categoria) + a lista completa dos 40, que abre no toque. */
export function KitsGrid() {
  const destaque = kitsDestaque.map((n) => kits.find((k) => k.n === n)!).filter(Boolean);
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

      <details className="card group mx-auto mt-5 max-w-[760px]">
        <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-[16px] font-extrabold text-verde">
          Ver a lista dos 40 kits
          <Plus size={20} className="gira shrink-0 text-vermelho transition-transform" />
        </summary>
        <div className="grid gap-5 px-5 pb-6 md:grid-cols-2">
          {categorias.map((c) => (
            <div key={c.id}>
              <p className="text-[12px] font-extrabold uppercase tracking-wider text-vermelho">{c.nome}</p>
              <ul className="mt-2 space-y-1 text-[14.5px] text-tinta">
                {kits
                  .filter((k) => k.cat === c.id)
                  .map((k) => (
                    <li key={k.n}>
                      <span className="font-bold text-verde">{String(k.n).padStart(2, '0')}.</span> {k.nome}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
