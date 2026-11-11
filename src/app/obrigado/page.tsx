import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, Mail, Search } from 'lucide-react';
import { marca } from '@/config/oferta';

export const metadata: Metadata = { title: `Compra aprovada · ${marca.nome}`, robots: { index: false } };

/** Página de obrigado (configure na Kiwify como "página de obrigado personalizada"). */
export default function Obrigado() {
  return (
    <main className="hero flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="card w-full max-w-[480px] p-7 text-center">
        <Image src="/brand/logo-horizontal.png" alt={marca.nome} width={1056} height={192} className="mx-auto h-auto w-[200px]" priority />
        <CheckCircle2 size={64} className="mx-auto mt-6 text-verde" strokeWidth={2.2} />
        <h1 className="mt-4 text-[28px] font-extrabold leading-tight text-verde">Compra aprovada! 🎄</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-tinta">
          Os seus materiais foram enviados para o <b>e-mail que você usou na compra</b>. Se comprou algum extra, ele chega num e-mail separado.
        </p>
        <ul className="mt-6 space-y-3 text-left text-[14.5px] text-tinta">
          <li className="flex gap-3 rounded-2xl bg-creme p-3">
            <Mail size={20} className="mt-0.5 shrink-0 text-vermelho" /> Pagou com Pix ou cartão? O e-mail chega em poucos minutos.
          </li>
          <li className="flex gap-3 rounded-2xl bg-creme p-3">
            <Search size={20} className="mt-0.5 shrink-0 text-vermelho" /> Não achou? Procure no spam e na aba Promoções por “Kits de Natal”.
          </li>
        </ul>
        <p className="mt-6 text-[13.5px] text-cinza">Precisa de ajuda? Escreva para {marca.suporte}</p>
      </div>
    </main>
  );
}
