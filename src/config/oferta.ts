/**
 * Todo o conteúdo da página fica aqui: textos, preços, links de checkout e imagens.
 * Para trocar uma foto, coloque o arquivo em /public/fotos e preencha o campo `img` (ex.: '/fotos/kit-01.webp').
 * Campo `img` vazio = aparece um espaço reservado com a descrição da foto que vai ali.
 */

export const marca = {
  nome: 'Kits pra Vender',
  produto: '40 Kits de Natal para Montar e Vender',
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

/**
 * Seção de depoimentos. Ligue só com prints de clientes reais:
 * depoimento inventado é propaganda enganosa (CDC/CONAR) e motivo de bloqueio de anúncio na Meta.
 */
export const mostrarDepoimentos = true;

export const imagens = {
  /** Capa/mockup do produto no topo da página. */
  /** Capa do material (topo da página). */
  capa: '/fotos/capa.webp',
  /** Dois kits que aparecem atrás da capa. */
  heroKits: ['/fotos/kit-31.webp', '/fotos/kit-36.webp'] as [string, string],
  /** Foto do kit da ficha de exemplo. */
  fichaExemplo: '/fotos/kit-06.webp',
  /** Páginas do material para o carrossel "Por dentro". */
  porDentro: [
    { img: '', legenda: 'A ficha do kit, com foto e lista de materiais' },
    { img: '', legenda: 'O passo a passo de montagem, com fotos' },
    { img: '', legenda: 'Os moldes: tags, cartões e cintas para imprimir' },
    { img: '', legenda: 'Custo dos materiais e sugestão de preço' },
  ],
  /** Prints de depoimentos (WhatsApp). */
  depoimentos: [1, 2, 3, 4, 5, 6].map((i) => ({ img: `/fotos/depoimentos/d${i}.webp`, legenda: `Depoimento ${i}` })),
};

/* ---------------- os 40 kits ---------------- */

export interface Kit {
  n: number;
  nome: string;
  desc: string;
  cat: CategoriaId;
  img?: string;
}

export type CategoriaId = 'economicas' | 'canecas' | 'beleza' | 'doces' | 'personalizados' | 'criativos';

export const categorias: { id: CategoriaId; nome: string; desc: string }[] = [
  { id: 'economicas', nome: 'Lembrancinhas', desc: 'Pra quem quer começar gastando pouco' },
  { id: 'canecas', nome: 'Canecas e bebidas', desc: 'Os queridinhos do amigo-secreto' },
  { id: 'beleza', nome: 'Beleza e autocuidado', desc: 'Kits de spa e cuidados' },
  { id: 'doces', nome: 'Doces e chocolates', desc: 'Tudo com produtos prontos, sem receita' },
  { id: 'personalizados', nome: 'Presentes personalizados', desc: 'Pra professores, escritório e leitura' },
  { id: 'criativos', nome: 'Kits criativos', desc: 'Ideias diferentes que chamam atenção' },
];

export const kits: Kit[] = [
  { n: 1, cat: 'economicas', nome: 'Mini Spa Natalino', desc: 'Sabonete e hidratante num saquinho transparente, com cartela de Natal impressa e laço.', img: '/fotos/kit-01.webp' },
  { n: 2, cat: 'economicas', nome: 'Chocolate com Carinho', desc: 'Um presente pequeno com chocolate de verdade, cartão bonito e custo controlado.', img: '/fotos/kit-02.webp' },
  { n: 3, cat: 'economicas', nome: 'Natal Cheiroso', desc: 'Uma dupla perfumada em embalagem compacta, sem nenhuma receita ou fabricação artesanal.', img: '/fotos/kit-03.webp' },
  { n: 4, cat: 'economicas', nome: 'Carinho de Professora', desc: 'Um agradecimento simples e funcional, com papelaria e um doce em destaque.', img: '/fotos/kit-04.webp' },
  { n: 5, cat: 'economicas', nome: 'Kit Aconchego', desc: 'Meias macias e um chocolate em um pacote pequeno que remete a conforto.', img: '/fotos/kit-05.webp' },
  { n: 6, cat: 'canecas', nome: 'Caneca de Chocolate Quente', desc: 'Caneca, sachê de chocolate quente e bombons, embalada com laço.', img: '/fotos/kit-06.webp' },
  { n: 7, cat: 'canecas', nome: 'Caneca Natal Doce', desc: 'O clássico presente de caneca cheia de chocolates, com montagem vistosa e poucos elementos.', img: '/fotos/kit-07.webp' },
  { n: 8, cat: 'canecas', nome: 'Café da Manhã Especial', desc: 'Uma caixa com clima de manhã aconchegante, feita somente com bebidas e biscoitos embalados.', img: '/fotos/kit-08.webp' },
  { n: 9, cat: 'canecas', nome: 'Chá e Carinho', desc: 'Um presente calmo, com chá, acompanhamento e composição leve.', img: '/fotos/kit-09.webp' },
  { n: 10, cat: 'canecas', nome: 'Copo Surpresa', desc: 'Copo com tampa cheio de chocolates, fechado com laço e tag.', img: '/fotos/kit-10.webp' },
  { n: 11, cat: 'beleza', nome: 'Spa de Natal', desc: 'Uma caixa de autocuidado maior, com aspecto de presente completo.', img: '/fotos/kit-11.webp' },
  { n: 12, cat: 'beleza', nome: 'Mãos de Princesa', desc: 'Um trio compacto para as mãos com aparência de presente de boutique.', img: '/fotos/kit-12.webp' },
  { n: 13, cat: 'beleza', nome: 'Banho Relaxante', desc: 'Sabonete, esponja e vela industrializada para criar um conjunto de presente acolhedor.', img: '/fotos/kit-13.webp' },
  { n: 14, cat: 'beleza', nome: 'Natal Perfumado', desc: 'Fragrância e hidratante mini em um conjunto elegante e pequeno.', img: '/fotos/kit-14.webp' },
  { n: 15, cat: 'beleza', nome: 'Pequenos Cuidados', desc: 'Um presente compacto com itens de bolso, sem caixa volumosa.', img: '/fotos/kit-15.webp' },
  { n: 16, cat: 'doces', nome: 'Cinema de Natal', desc: 'Um combo pronto para uma sessão de cinema em casa, com diversão e guloseimas.', img: '/fotos/kit-16.webp' },
  { n: 17, cat: 'doces', nome: 'Natal Chocolatudo', desc: 'Uma caixa assortida de chocolates com apresentação de confeitaria, sem fazer doces em casa.', img: '/fotos/kit-17.webp' },
  { n: 18, cat: 'doces', nome: 'Panetone Encantado', desc: 'O mini panetone de supermercado recebe um acabamento bonito com cinta, tag e laço.', img: '/fotos/kit-18.webp' },
  { n: 19, cat: 'doces', nome: 'Café com Doçura', desc: 'Uma lembrança leve, sem caneca, que combina café, biscoito e chocolate.', img: '/fotos/kit-19.webp' },
  { n: 20, cat: 'doces', nome: 'Doce Amigo-Secreto', desc: 'Um pacote de doces com mensagem afetiva e embalagem realmente simples.', img: '/fotos/kit-20.webp' },
  { n: 21, cat: 'personalizados', nome: 'Escritório Natalino', desc: 'Bloquinho, caneta e marcador para quem trabalha ou estuda.', img: '/fotos/kit-21.webp' },
  { n: 22, cat: 'personalizados', nome: 'Professora Especial', desc: 'Um agrado de papelaria mais completo, com doce e mensagem personalizada.', img: '/fotos/kit-22.webp' },
  { n: 23, cat: 'personalizados', nome: 'Kit Relaxamento', desc: 'Uma combinação de descanso: máscara para dormir, chá e chocolate.', img: '/fotos/kit-23.webp' },
  { n: 24, cat: 'personalizados', nome: 'Leitura Aconchegante', desc: 'Chá, chocolates e um marcador de página impresso em uma embalagem plana.', img: '/fotos/kit-24.webp' },
  { n: 25, cat: 'personalizados', nome: 'Lembrança de Natal', desc: 'Enfeite pronto para árvore e um mimo de autocuidado com cartão personalizável.', img: '/fotos/kit-25.webp' },
  { n: 26, cat: 'criativos', nome: 'Natal Pet', desc: 'Caixa festiva para o pet, com brinquedo, petisco e acessório.', img: '/fotos/kit-26.webp' },
  { n: 27, cat: 'criativos', nome: 'Jardim de Natal', desc: 'Suculenta em vasinho com papel kraft, fita e cartão de Natal.', img: '/fotos/kit-27.webp' },
  { n: 28, cat: 'criativos', nome: 'Criatividade Infantil', desc: 'Uma lembrança para desenhar e brincar, com itens prontos e um mini material impresso.', img: '/fotos/kit-28.webp' },
  { n: 29, cat: 'criativos', nome: 'Mesa Posta Natalina', desc: 'Uma lembrança temática para decorar a mesa do Natal com itens prontos.', img: '/fotos/kit-29.webp' },
  { n: 30, cat: 'criativos', nome: 'Luz de Natal', desc: 'Um pequeno presente com vela LED e enfeite, leve e com charme de mesa.', img: '/fotos/kit-30.webp' },
  { n: 31, cat: 'economicas', nome: 'Cone de Docinhos Natalinos', desc: 'Mix de docinhos num cone natalino impresso: pequeno, cheio e lindo.', img: '/fotos/kit-31.webp' },
  { n: 32, cat: 'economicas', nome: 'Pirâmide Surpresa', desc: 'Caixinha em pirâmide feita com o molde, com poucos itens bem escolhidos.', img: '/fotos/kit-32.webp' },
  { n: 33, cat: 'economicas', nome: 'Almofadinha de Chocolate', desc: 'Uma caixa almofada compacta com mix pequeno, mas mais interessante do que um único doce.', img: '/fotos/kit-33.webp' },
  { n: 34, cat: 'economicas', nome: 'Cubinho da Sorte', desc: 'Cubinho fofo e bem recheado, usando doces compactos que aproveitam melhor o volume interno.', img: '/fotos/kit-34.webp' },
  { n: 35, cat: 'economicas', nome: 'Mini Sacolinha Criativa', desc: 'Uma mini sacolinha pequena, mas com composição mais interessante: item comestível + item…', img: '/fotos/kit-35.webp' },
  { n: 36, cat: 'canecas', nome: 'Ritual do Café Especial', desc: 'Caixa de café completa, com caneca, café e biscoitos de marcas conhecidas.', img: '/fotos/kit-36.webp' },
  { n: 37, cat: 'doces', nome: 'Tábua de Petiscos de Natal', desc: 'Um kit gourmet mais elaborado, com composição elegante e cara de presente premium.', img: '/fotos/kit-37.webp' },
  { n: 38, cat: 'beleza', nome: 'Ritual de Banho Premium', desc: 'Caixa de banho completa, com toalha, hidratante e sabonete, finalizada com laço.', img: '/fotos/kit-38.webp' },
  { n: 39, cat: 'personalizados', nome: 'Escritório Elegante', desc: 'Um kit de papelaria mais sofisticado e útil, com sensação de presente executivo.', img: '/fotos/kit-39.webp' },
  { n: 40, cat: 'criativos', nome: 'Noite de Jogos em Família', desc: 'Kit com proposta divertida e maior quantidade de componentes, pensado para parecer completo…', img: '/fotos/kit-40.webp' },
];

/** Kits que aparecem com foto na vitrine (um de cada categoria). Os outros aparecem só na lista de nomes. */
export const kitsDestaque = [31, 32, 36, 38, 26, 1];

/** Ficha de exemplo mostrada no topo (valores ilustrativos). */
export const fichaExemplo = {
  kit: 'Projeto 06',
  nome: 'Caneca de Chocolate Quente',
  materiais: ['1 caneca de cerâmica de 250 a 350 ml', '1 sachê de chocolate quente ou cappuccino', '2 bombons embalados', '1 saco de celofane 25 × 35 cm', 'Papel de seda, fita e tag (molde M02)'],
  custo: 'R$ 29',
  venda: 'R$ 45 a 62',
  tempo: '12 a 18 min',
};

/* ---------------- bônus ---------------- */

export const bonus = [
  {
    n: 1,
    img: '/fotos/bonus-1.webp',
    nome: 'WhatsApp Vendedor: 30 Mensagens Prontas',
    desc: 'Mensagens para divulgar os kits, responder sobre preço, fechar encomendas e combinar a entrega. É só copiar e colar.',
  },
  {
    n: 2,
    img: '/fotos/bonus-2.webp',
    nome: 'Primeira Encomenda: Guia de 7 Passos',
    desc: 'Do primeiro modelo escolhido à primeira encomenda entregue, sem precisar montar estoque antes.',
  },
  {
    n: 3,
    img: '/fotos/bonus-3.webp',
    nome: 'Calendário de Vendas Natalinas',
    desc: 'Quando divulgar, quando fechar os pedidos e quando montar, para dar tempo de entregar tudo antes do Natal.',
  },
];

/* ---------------- planos ---------------- */

export const planoEssencial = [
  '40 modelos de kits natalinos',
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
    q: 'Preciso montar os 40 kits?',
    a: 'Não. Escolha 2 ou 3 modelos que você mais gostar e que caibam no seu orçamento, monte as primeiras amostras e comece a divulgar. Dá para trabalhar por encomenda, sem estoque.',
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
    a: 'O Essencial traz os 40 kits completos (modelos, moldes, listas, passo a passo e exemplos de preço). O Completo traz tudo isso e mais os 3 bônus para começar a vender: mensagens prontas para o WhatsApp, o guia da primeira encomenda e o calendário de vendas.',
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
