import type { Metadata } from 'next';
import { Legal } from '@/components/Legal';
import { marca } from '@/config/oferta';

export const metadata: Metadata = { title: `Política de privacidade · ${marca.nome}` };

export default function Privacidade() {
  return (
    <Legal titulo="Política de privacidade">
      <p>Os dados da compra (nome, e-mail, telefone e pagamento) são coletados pela plataforma de pagamento e usados para entregar o material e prestar suporte.</p>
      <h2>Cookies e medição</h2>
      <p>Esta página usa ferramentas de medição de anúncios (como o Pixel da Meta e a Utmify) para entender de onde vêm as visitas e melhorar as campanhas.</p>
      <h2>Seus direitos</h2>
      <p>Você pode pedir informações, correção ou exclusão dos seus dados pelo e-mail de suporte, conforme a LGPD.</p>
    </Legal>
  );
}
