import type { Metadata } from 'next';
import { Legal } from '@/components/Legal';
import { marca } from '@/config/oferta';

export const metadata: Metadata = { title: `Termos de uso · ${marca.nome}` };

export default function Termos() {
  return (
    <Legal titulo="Termos de uso">
      <p>Ao comprar o {marca.produto}, você recebe acesso a um material digital para uso pessoal.</p>
      <h2>O que você pode fazer</h2>
      <p>Usar os modelos, moldes e instruções para montar presentes e vender os presentes que você montar.</p>
      <h2>O que não é permitido</h2>
      <p>Revender, compartilhar, distribuir ou publicar os arquivos do material, no todo ou em parte.</p>
      <h2>Resultados</h2>
      <p>Os exemplos de custo e preço são ilustrativos. Os resultados dependem da dedicação, da região e do mercado de cada pessoa, e não há garantia de ganhos.</p>
      <h2>Garantia</h2>
      <p>Você pode pedir o reembolso em até 7 dias após a compra, pela plataforma de pagamento ou pelo e-mail de suporte.</p>
    </Legal>
  );
}
