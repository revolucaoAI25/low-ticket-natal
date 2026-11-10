'use client';

import { useState } from 'react';
import { categorias, kits, type CategoriaId } from '@/config/oferta';
import { Foto } from './Foto';

/** Vitrine dos 30 kits, com filtro por categoria. */
export function KitsGrid() {
  const [cat, setCat] = useState<CategoriaId | 'todos'>('todos');
  const [all, setAll] = useState(false);
  const list = cat === 'todos' ? kits : kits.filter((k) => k.cat === cat);
  const visible = cat === 'todos' && !all ? list.slice(0, 8) : list;
  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
        {[{ id: 'todos' as const, nome: 'Todos os 30' }, ...categorias].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-bold transition ${cat === c.id ? 'border-verde bg-verde text-white' : 'border-linha bg-papel text-verde'}`}
          >
            {c.nome}
          </button>
        ))}
      </div>
      {cat !== 'todos' && <p className="mt-3 text-[14px] font-semibold text-cinza">{categorias.find((c) => c.id === cat)?.desc}</p>}
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {visible.map((k) => (
          <article key={k.n} className="card overflow-hidden">
            <Foto src={k.img} alt={`Foto do kit ${k.nome} montado`} ratio="1 / 1" sizes="(max-width: 768px) 50vw, 260px" />
            <div className="p-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-vermelho">Kit {String(k.n).padStart(2, '0')}</p>
              <h3 className="mt-0.5 text-[15px] font-extrabold leading-tight text-verde">{k.nome}</h3>
              <p className="mt-1 text-[12.5px] leading-snug text-cinza">{k.desc}</p>
            </div>
          </article>
        ))}
      </div>
      {cat === 'todos' && !all && (
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setAll(true)} className="btn-linha">
            Ver os 30 kits
          </button>
        </div>
      )}
    </div>
  );
}
