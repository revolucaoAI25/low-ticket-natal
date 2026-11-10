# 30 Kits de Natal para Montar e Vender · LP

Página de vendas (Next.js 15 + Tailwind) da marca **Kits pra Vender**.

## Onde mexer

| O quê | Onde |
|---|---|
| Textos, kits, bônus, FAQ, preços | `src/config/oferta.ts` |
| Fotos (mockup, kits, páginas, bônus, depoimentos) | coloque em `public/fotos/` e preencha o campo `img` em `src/config/oferta.ts` |
| Links de checkout, Pixel, Utmify | variáveis da Vercel (veja `.env.example`) |
| Cores e fonte | `tailwind.config.ts` e `src/app/fonts.ts` |
| Logo e ícone | `public/brand/` e `src/app/icon.png` |

Enquanto uma foto não é preenchida, a página mostra um espaço reservado com a descrição do que vai ali.

## Estrutura da página

1. Faixa de topo · 2. Abertura (promessa + mockup + CTA) · 3. Ficha de exemplo de um kit · 4. Como funciona (Escolha → Compre → Monte → Venda) · 5. "Você não precisa de nada disso" (objeções) · 6. Vitrine dos 30 kits com filtro por categoria · 7. O que você recebe + páginas por dentro · 8. Para quem é · 9. Bônus · 10. Depoimentos · 11. Planos (Completo em destaque) · 12. Garantia · 13. O Natal tem data (contagem até 20/12) · 14. FAQ · 15. Chamada final · barra de compra fixa no celular.

## Rodar

```bash
npm install
npm run dev
```

## Publicar na Vercel

Importe o repositório, cadastre as variáveis do `.env.example` e faça o deploy.
O Pixel fica no `<head>` (PageView dispara logo no carregamento) e os botões de compra levam as UTMs para o checkout e disparam `InitiateCheckout`.
