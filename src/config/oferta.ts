/**
 * Todo o conteúdo da página fica aqui: textos, preços, links de checkout e imagens.
 * Para trocar uma foto, coloque o arquivo em /public/fotos e preencha o campo `img` (ex.: '/fotos/kit-01.webp').
 * Campo `img` vazio = aparece um espaço reservado com a descrição da foto que vai ali.
 */

export const marca = {
  nome: 'Kits pra Vender',
  produto: '30 Kits de Natal para Montar e Vender',
  suporte: 'suporte@kitspravender.com.br',
};

/** Links do checkout (Kiwify). Também podem vir das variáveis da Vercel. */
export const checkout = {
  essencial: process.env.NEXT_PUBLIC_CHECKOUT_ESSENCIAL ?? '',
  completo: process.env.NEXT_PUBLIC_CHECKOUT_COMPLETO ?? '',
};

export const precos = {
  essencial: 19.9,
  completo: 29.9,
};

export const imagens = {
  /** Capa/mockup do produto no topo da página. */
  heroMockup: '',
  /** Foto do Kit 01 na ficha de exemplo. */
  fichaExemplo: '',
  /** Páginas do material para o carrossel "Por dentro". */
  porDentro: [
    { img: '', legenda: 'A ficha do kit, com foto e lista de materiais' },
    { img: '', legenda: 'O passo a passo de montagem, com fotos' },
    { img: '', legenda: 'Os moldes: tags, cartões e cintas para imprimir' },
    { img: '', legenda: 'Custo dos materiais e sugestão de preço' },
  ],
  /** Prints de depoimentos reais (WhatsApp/Instagram). */
  depoimentos: [
    { img: '', legenda: 'Print de depoimento 1' },
    { img: '', legenda: 'Print de depoimento 2' },
    { img: '', legenda: 'Print de depoimento 3' },
  ],
};

/* ---------------- os 30 kits ---------------- */

export interface Kit {
  n: number;
  nome: string;
  desc: string;
  cat: CategoriaId;
  img?: string;
}

export type CategoriaId = 'economicas' | 'canecas' | 'beleza' | 'doces' | 'personalizados' | 'criativos';

export const categorias: { id: CategoriaId; nome: string; desc: string }[] = [
  { id: 'economicas', nome: 'Lembrancinhas econômicas', desc: 'Pra quem quer começar gastando pouco' },
  { id: 'canecas', nome: 'Canecas e bebidas', desc: 'Os queridinhos do amigo-secreto' },
  { id: 'beleza', nome: 'Beleza e autocuidado', desc: 'Kits de spa e cuidados' },
  { id: 'doces', nome: 'Doces e chocolates', desc: 'Tudo com produtos prontos, sem receita' },
  { id: 'personalizados', nome: 'Presentes personalizados', desc: 'Pra professores, escritório e leitura' },
  { id: 'criativos', nome: 'Kits criativos', desc: 'Ideias diferentes que chamam atenção' },
];

export const kits: Kit[] = [
  { n: 1, cat: 'economicas', nome: 'Mini Spa Natalino', desc: 'Sabonete e mini hidratante em saquinho com fundo impresso e laço.' },
  { n: 2, cat: 'economicas', nome: 'Chocolate com Carinho', desc: 'Chocolate e bombons presos a um cartão natalino.' },
  { n: 3, cat: 'economicas', nome: 'Natal Cheiroso', desc: 'Sabonete e sachê perfumado em caixinha decorada.' },
  { n: 4, cat: 'economicas', nome: 'Lembrancinha para Professores', desc: 'Caneta, bloquinho e chocolate com mensagem de agradecimento.' },
  { n: 5, cat: 'economicas', nome: 'Kit Aconchego', desc: 'Par de meias e chocolate com cinta natalina.' },
  { n: 6, cat: 'canecas', nome: 'Caneca de Chocolate Quente', desc: 'Caneca, chocolate quente em sachê e bombons, embalada com laço.' },
  { n: 7, cat: 'canecas', nome: 'Caneca Natal Doce', desc: 'Caneca cheia de chocolates e doces, com tag natalina.' },
  { n: 8, cat: 'canecas', nome: 'Café da Manhã Especial', desc: 'Caneca, café e biscoitos em caixa kraft decorada.' },
  { n: 9, cat: 'canecas', nome: 'Kit Chá e Carinho', desc: 'Xícara com sachês de chá e um mimo, em caixa personalizada.' },
  { n: 10, cat: 'canecas', nome: 'Copo Surpresa', desc: 'Copo com tampa cheio de doces, com laço e etiqueta.' },
  { n: 11, cat: 'beleza', nome: 'Spa de Natal', desc: 'Hidratante, sabonete e esponja em caixa com papel de seda.' },
  { n: 12, cat: 'beleza', nome: 'Mãos de Princesa', desc: 'Creme para mãos, lixa e esmalte com cartão natalino.' },
  { n: 13, cat: 'beleza', nome: 'Banho Relaxante', desc: 'Sabonete, esponja e vela aromática em caixa decorativa.' },
  { n: 14, cat: 'beleza', nome: 'Natal Perfumado', desc: 'Mini perfume e hidratante em caixinha com divisórias.' },
  { n: 15, cat: 'beleza', nome: 'Pequenos Cuidados', desc: 'Protetor labial, creme para mãos e chocolate.' },
  { n: 16, cat: 'doces', nome: 'Cinema de Natal', desc: 'Pipoca de micro-ondas, chocolate e balas em caixa temática.' },
  { n: 17, cat: 'doces', nome: 'Natal Chocolatudo', desc: 'Bombons e barras em caixa com divisórias.' },
  { n: 18, cat: 'doces', nome: 'Panetone Encantado', desc: 'Mini panetone e chocolates em embalagem com visor.' },
  { n: 19, cat: 'doces', nome: 'Café com Doçura', desc: 'Sachês de café, biscoitos e chocolates em caixa kraft.' },
  { n: 20, cat: 'doces', nome: 'Doce Amigo-Secreto', desc: 'Chocolates variados e cartão em sacolinha personalizada.' },
  { n: 21, cat: 'personalizados', nome: 'Kit Escritório Natalino', desc: 'Bloquinho, caneta e marcador em embalagem envelope.' },
  { n: 22, cat: 'personalizados', nome: 'Kit Professora Especial', desc: 'Papelaria e doces com cartão de agradecimento.' },
  { n: 23, cat: 'personalizados', nome: 'Kit Relaxamento', desc: 'Chá, máscara para dormir e chocolate em caixa decorada.' },
  { n: 24, cat: 'personalizados', nome: 'Kit Leitura Aconchegante', desc: 'Marcador de página, chá e chocolates.' },
  { n: 25, cat: 'personalizados', nome: 'Kit Lembrança de Natal', desc: 'Mimo pronto com cartões para diferentes destinatários.' },
  { n: 26, cat: 'criativos', nome: 'Kit Natal Pet', desc: 'Brinquedo, petisco e acessório em caixa temática pet.' },
  { n: 27, cat: 'criativos', nome: 'Jardim de Natal', desc: 'Mini suculenta em vasinho com embalagem kraft e cartão.' },
  { n: 28, cat: 'criativos', nome: 'Criatividade Infantil', desc: 'Giz de cera, livrinho de atividades e adesivos.' },
  { n: 29, cat: 'criativos', nome: 'Mesa Posta Natalina', desc: 'Guardanapos, argolas e enfeites em caixa decorativa.' },
  { n: 30, cat: 'criativos', nome: 'Luz de Natal', desc: 'Vela LED, enfeite e cartão em embalagem personalizada.' },
];

/** Ficha de exemplo mostrada no topo (valores ilustrativos). */
export const fichaExemplo = {
  kit: 'Kit 06',
  nome: 'Caneca de Chocolate Quente',
  materiais: ['1 caneca de 300 ml', '3 bombons embalados', '1 sachê de chocolate quente', '1 saquinho transparente', '1 fita de cetim', '1 tag natalina (molde incluso)'],
  custo: 'R$ 18',
  venda: 'R$ 39,90',
  tempo: '10 min',
};

/* ---------------- bônus ---------------- */

export const bonus = [
  {
    n: 1,
    nome: 'WhatsApp Vendedor: 30 Mensagens Prontas',
    desc: 'Mensagens para divulgar os kits, responder sobre preço, fechar encomendas e combinar a entrega. É só copiar e colar.',
    img: '',
  },
  {
    n: 2,
    nome: 'Primeira Encomenda: Guia de 7 Passos',
    desc: 'Do primeiro modelo escolhido à primeira encomenda entregue, sem precisar montar estoque antes.',
    img: '',
  },
  {
    n: 3,
    nome: 'Calendário de Vendas Natalinas',
    desc: 'Quando divulgar, quando fechar os pedidos e quando montar, para dar tempo de entregar tudo antes do Natal.',
    img: '',
  },
];

/* ---------------- planos ---------------- */

export const planoEssencial = [
  '30 modelos de kits natalinos',
  'Moldes e artes para imprimir',
  'Lista de materiais de cada kit',
  'Passo a passo com fotos',
  'Fotos de referência dos kits prontos',
  'Exemplos de custo e preço de venda',
];

export const planoCompletoExtras = bonus.map((b) => `Bônus ${b.n}: ${b.nome}`);

/* ---------------- FAQ ---------------- */

export const faq: { q: string; a: string }[] = [
  {
    q: 'Preciso saber fazer artesanato?',
    a: 'Não. Os kits usam produtos que você compra prontos (canecas, chocolates, sabonetes...). Você só monta, embala e finaliza com os moldes que já vêm prontos para imprimir.',
  },
  {
    q: 'O material é físico ou digital?',
    a: 'É 100% digital. Você recebe o acesso no e-mail logo após o pagamento e pode abrir no celular, no computador ou imprimir.',
  },
  {
    q: 'Preciso montar os 30 kits?',
    a: 'Não. Escolha 3 ou 4 modelos que você mais gostar e que caibam no seu orçamento, monte as primeiras amostras e comece a divulgar. Dá para trabalhar por encomenda, sem estoque.',
  },
  {
    q: 'Quanto preciso gastar para começar?',
    a: 'Depende dos modelos que você escolher. Tem lembrancinhas com um ou dois produtos e caixas mais completas. Cada kit traz a lista de materiais e um exemplo de custo para você planejar.',
  },
  {
    q: 'Onde eu compro os materiais?',
    a: 'Em lugares comuns: supermercado, papelaria, loja de variedades, armarinho e loja de embalagens. Cada kit traz a lista do que comprar e as quantidades.',
  },
  {
    q: 'Preciso de impressora especial?',
    a: 'Não. Os moldes saem em impressora comum, em papel A4. Se preferir, é só levar o arquivo numa papelaria.',
  },
  {
    q: 'Qual a diferença entre os planos?',
    a: 'O Essencial traz os 30 kits completos (modelos, moldes, listas, passo a passo e exemplos de preço). O Completo traz tudo isso e mais os 3 bônus para começar a vender: mensagens prontas para o WhatsApp, o guia da primeira encomenda e o calendário de vendas.',
  },
  {
    q: 'Posso vender os kits que eu montar?',
    a: 'Pode. O material foi feito para isso: você monta os presentes e vende para quem quiser. Só não é permitido revender ou compartilhar os arquivos do material.',
  },
  {
    q: 'Tem garantia?',
    a: 'Sim. Você tem 7 dias para conhecer o material. Se não gostar, é só pedir o reembolso dentro desse prazo e o valor volta inteiro.',
  },
];
