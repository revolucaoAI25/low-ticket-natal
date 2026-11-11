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

const PRINCIPAL: Arquivo = { nome: '40 Kits de Natal para Montar e Vender (PDF)', url: '' };
const BONUS: Arquivo[] = [
  { nome: 'Bônus 1: WhatsApp Vendedor, 30 Mensagens Prontas', url: '' },
  { nome: 'Bônus 2: Primeira Encomenda, Guia de 7 Passos', url: '' },
  { nome: 'Bônus 3: Calendário de Vendas Natalinas', url: '' },
  { nome: 'Material complementar dos bônus', url: '' },
];

export const produtos: Produto[] = [
  // A ordem importa: "completo" é testado antes de "essencial".
  { id: 'completo', titulo: 'Plano Completo', palavras: ['completo'], tipo: 'principal', arquivos: [PRINCIPAL, ...BONUS] },
  { id: 'essencial', titulo: 'Plano Essencial', palavras: ['essencial', '40 kits', 'kits de natal'], tipo: 'principal', arquivos: [PRINCIPAL] },
  { id: 'catalogo', titulo: 'Catálogo Natalino Pronto para Vender', palavras: ['catalogo'], tipo: 'bump', arquivos: [{ nome: 'Catálogo Natalino Pronto para Vender', url: '' }] },
  { id: 'planilha', titulo: 'Planilha Inteligente de Lucro e Encomendas', palavras: ['planilha'], tipo: 'bump', arquivos: [{ nome: 'Planilha Inteligente de Lucro e Encomendas', url: '' }] },
  { id: 'artesanatos', titulo: '40 Artesanatos Natalinos para Fazer e Vender', palavras: ['artesanato'], tipo: 'bump', arquivos: [{ nome: '40 Artesanatos Natalinos para Fazer e Vender (PDF)', url: '' }] },
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
