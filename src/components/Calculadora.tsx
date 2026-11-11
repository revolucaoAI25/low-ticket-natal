'use client';

import { useState } from 'react';

/** Simulação de faturamento com os valores de referência do material (custo e faixa de preço de cada kit). */
const KITS = [
  { nome: 'Chocolate com Carinho', custo: 11.8, min: 19, max: 26 },
  { nome: 'Caneca de Chocolate Quente', custo: 29, min: 45, max: 62 },
  { nome: 'Spa de Natal', custo: 48.7, min: 79, max: 105 },
];
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export function Calculadora() {
  const [k, setK] = useState(1);
  const [qtd, setQtd] = useState(20);
  const kit = KITS[k];
  const fatMin = kit.min * qtd;
  const fatMax = kit.max * qtd;
  const lucMin = (kit.min - kit.custo) * qtd;
  const lucMax = (kit.max - kit.custo) * qtd;
  return (
    <div className="card mx-auto max-w-[720px] overflow-hidden">
      <div className="p-5 md:p-7">
        <p className="text-[13px] font-extrabold uppercase tracking-wider text-cinza">1. Escolha um kit</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {KITS.map((x, i) => (
            <button
              key={x.nome}
              type="button"
              onClick={() => setK(i)}
              className={`rounded-2xl border-2 px-2 py-3 text-[13px] font-extrabold leading-tight transition ${i === k ? 'border-verde bg-verde text-white' : 'border-linha bg-papel text-verde'}`}
            >
              {x.nome}
              <span className={`mt-1 block text-[11.5px] font-bold ${i === k ? 'text-dourado' : 'text-cinza'}`}>
                {brl(x.min)} a {brl(x.max)}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-between">
          <p className="text-[13px] font-extrabold uppercase tracking-wider text-cinza">2. Quantos você vende?</p>
          <p className="text-[26px] font-extrabold leading-none text-verde">
            {qtd} <span className="text-[14px]">kits</span>
          </p>
        </div>
        <input
          type="range"
          min={5}
          max={60}
          step={5}
          value={qtd}
          onChange={(e) => setQtd(Number(e.target.value))}
          aria-label="Quantidade de kits vendidos"
          className="mt-3 h-2 w-full cursor-pointer accent-vermelho"
        />
        <div className="mt-1 flex justify-between text-[11px] font-bold text-cinza">
          <span>5</span>
          <span>60</span>
        </div>
      </div>
      <div className="grid grid-cols-2 bg-verde text-center text-white">
        <div className="border-r border-white/15 p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-white/70">Você vende</p>
          <p className="mt-1 text-[19px] font-extrabold leading-tight md:text-[24px]">
            {brl(fatMin)} <span className="text-[13px] text-white/70">a</span> {brl(fatMax)}
          </p>
        </div>
        <div className="p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-dourado">Sobra no bolso</p>
          <p className="mt-1 text-[19px] font-extrabold leading-tight text-dourado md:text-[24px]">
            {brl(lucMin)} <span className="text-[13px] text-dourado/70">a</span> {brl(lucMax)}
          </p>
        </div>
      </div>
      <p className="bg-creme px-5 py-3 text-center text-[11.5px] leading-snug text-cinza">
        Simulação com o custo e a faixa de preço que o material indica para cada kit. Não é promessa de ganho: o resultado depende dos seus preços, custos e vendas.
      </p>
    </div>
  );
}
