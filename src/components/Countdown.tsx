'use client';

import { useEffect, useState } from 'react';

/** Dias até a data-limite das encomendas (padrão: 20/12). Calculado no navegador, sem número inventado. */
export function Countdown({ mes = 12, dia = 20 }: { mes?: number; dia?: number }) {
  const [dias, setDias] = useState<number | null>(null);
  useEffect(() => {
    const now = new Date();
    const alvo = new Date(now.getFullYear(), mes - 1, dia, 23, 59);
    setDias(Math.max(0, Math.ceil((alvo.getTime() - now.getTime()) / 86_400_000)));
  }, [mes, dia]);
  if (dias === null) return <span>poucos</span>;
  return <span>{dias}</span>;
}
