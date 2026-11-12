/**
 * O que cada compra recebe por e-mail.
 *
 * Cada produto da Kiwify é reconhecido pelo NOME (palavras-chave, sem acento e sem maiúsculas)
 * ou pelo ID do produto na Kiwify. Os arquivos podem ser links do próprio site ("/arquivos/...")
 * ou links externos (Google Drive, Canva, Google Planilhas).
 */

export interface Arquivo {
  nome: string;
  url: string;
}

export interface Produto {
  id: string;
  /** Nome que aparece no e-mail. */
  titulo: string;
  /** Palavras que o nome do produto na Kiwify contém. */
  palavras: string[];
  /** IDs de produto da Kiwify (opcional; tem prioridade sobre as palavras). */
  kiwifyIds?: string[];
  tipo: 'principal' | 'bump';
  arquivos: Arquivo[];
}

// Plano Essencial: só o PDF dos 40 kits (cópia fora da pasta dos bônus).
const PDF_PRINCIPAL: Arquivo = { nome: 'Abrir os 40 Kits de Natal (PDF)', url: 'https://drive.google.com/file/d/1BL6OvhFR3ODe80JAlcbRrb1EW2X7BVKI/view?usp=sharing' };
// Plano Completo: a pasta do Drive com o PDF, os 3 bônus e as mensagens para copiar e colar.
const PASTA_COMPLETA: Arquivo = { nome: 'Abrir a pasta com os 40 kits e os 3 bônus', url: 'https://drive.google.com/drive/folders/1D-HQlAMIiOZjPDFaEo4yzIujPTRKkq1y?usp=sharing' };

export const produtos: Produto[] = [
  // A ordem importa: "completo" é testado antes de "essencial".
  { id: 'completo', titulo: 'Plano Completo', palavras: ['completo'], tipo: 'principal', arquivos: [PASTA_COMPLETA] },
  { id: 'essencial', titulo: 'Plano Essencial', palavras: ['essencial', '40 kits', 'kits de natal'], tipo: 'principal', arquivos: [PDF_PRINCIPAL] },
  {
    id: 'catalogo',
    titulo: 'Catálogo Natalino Pronto para Vender',
    palavras: ['catalogo'],
    tipo: 'bump',
    arquivos: [{ nome: 'Baixar o Catálogo Natalino (PowerPoint editável)', url: '/arquivos/0d4c56dd23a12bc5/Catalogo-Natalino-40-Kits-Editavel.pptx' }],
  },
  {
    id: 'planilha',
    titulo: 'Calculadora de Lucro e Encomendas',
    palavras: ['planilha', 'calculadora'],
    tipo: 'bump',
    arquivos: [{ nome: 'Abrir a Calculadora de Lucro', url: 'https://claude.ai/artifact/6TwtJVR4vEL1orHsUar2e1#calcular' }],
  },
  {
    id: 'artesanatos',
    titulo: '30 Artesanatos Natalinos para Fazer e Vender',
    palavras: ['artesanato'],
    tipo: 'bump',
    arquivos: [{ nome: 'Abrir os 30 Artesanatos Natalinos (PDF)', url: 'https://drive.google.com/file/d/1b3Yah1HTWUYpH5cmImcqfmskQDJkZB8s/view?usp=sharing' }],
  },
];

export const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Produto pelo ID da Kiwify ou pelo nome. */
export function produtoDoPedido(nome: string, kiwifyId: string): Produto | undefined {
  const porId = produtos.find((p) => kiwifyId && p.kiwifyIds?.includes(kiwifyId));
  if (porId) return porId;
  const n = normalizar(nome);
  const bump = produtos.find((p) => p.tipo === 'bump' && p.palavras.some((w) => n.includes(w)));
  if (bump) return bump;
  return produtos.find((p) => p.tipo === 'principal' && p.palavras.some((w) => n.includes(w)));
}

/** Order bumps citados dentro do próprio pedido (quando a Kiwify manda tudo junto). */
export function bumpsNoPedido(textoDoPedido: string, exceto?: string): Produto[] {
  const t = normalizar(textoDoPedido);
  return produtos.filter((p) => p.tipo === 'bump' && p.id !== exceto && p.palavras.some((w) => t.includes(w)));
}
