import Link from 'next/link';
import { marca } from '@/config/oferta';

export function Legal({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <main className="wrap max-w-[760px] py-12">
      <Link href="/" className="text-[14px] font-bold text-verde underline">
        ← Voltar
      </Link>
      <h1 className="mt-6 text-[30px] font-extrabold text-verde">{titulo}</h1>
      <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-tinta [&_h2]:mt-8 [&_h2]:text-[18px] [&_h2]:font-extrabold [&_h2]:text-verde">{children}</div>
      <p className="mt-10 text-[14px] text-cinza">Dúvidas: {marca.suporte}</p>
    </main>
  );
}
