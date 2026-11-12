# 40 Kits de Natal para Montar e Vender · LP

Página de vendas (Next.js 15 + Tailwind) da marca **Kits pra Vender**.

## Onde mexer

| O quê | Onde |
|---|---|
| Textos, kits, bônus, FAQ, preços | `src/config/oferta.ts` |
| Fotos (mockup, kits, páginas, bônus, depoimentos) | coloque em `public/fotos/` e preencha o campo `img` em `src/config/oferta.ts` |
| Links de checkout (Essencial, Completo e o do pop-up de saída), Pixel, Utmify | variáveis da Vercel (veja `.env.example`) |
| Depoimentos (ligar/desligar) | `mostrarDepoimentos` em `src/config/oferta.ts`; imagens em `public/fotos/depoimentos/` |
| Kits da vitrine | `kitsDestaque` em `src/config/oferta.ts` |
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

## Pop-up de saída

Aparece uma vez por visita (computador: mouse saindo pelo topo; celular: botão de voltar depois de rolar a página) e oferece o Plano Completo por R$ 19,90.
Crie na Kiwify um checkout do Plano Completo por R$ 19,90 e cole o link em `NEXT_PUBLIC_CHECKOUT_SAIDA`. Sem esse link, o botão do pop-up leva até os planos.

## Pixel, Utmify e entrega automática

**Rastreamento (igual ao ID Pet)**
- Pixel pela Utmify (`NEXT_PUBLIC_UTMIFY_PIXEL_ID`): ela dispara PageView, InitiateCheckout e Purchase no Pixel da Meta, com API de Conversões e deduplicação. Com ele preenchido, o código não carrega o Pixel da Meta por conta própria (evita contar em dobro).
- Na Utmify, Regra de Initiate Checkout: "Contém texto" com `Quero o Plano Completo`, `Quero o Essencial` e `Quero o Completo`, e detecção automática desligada. Purchase: apenas vendas aprovadas, valor da venda, Produto = só os produtos do Natal.
- `NEXT_PUBLIC_META_PIXEL_ID` fica como alternativa, se um dia não usar o Pixel da Utmify.
- Script de UTMs da Utmify: as UTMs vão junto no link do checkout.
- A **compra** chega na Meta pela Utmify (integração Kiwify → Utmify). Não coloque Pixel na Kiwify, senão a compra conta duas vezes.

**Entrega (`/api/webhooks/kiwify`)**
- Na Kiwify, cada produto (40 Kits de Natal, Catálogo, Calculadora, Artesanatos) recebe um webhook para `https://SEU-DOMINIO/api/webhooks/kiwify`, com os eventos Compra aprovada, Reembolso e Chargeback. Coloque os tokens em `KIWIFY_WEBHOOK_TOKEN`, separados por vírgula.
- O nome do produto na Kiwify define o que é enviado: precisa conter "40 Kits", "Catálogo", "Calculadora" (ou "Planilha") ou "Artesanato". Os checkouts Essencial, Completo e o do pop-up são ofertas do mesmo produto, e todos recebem a pasta com os bônus. Também dá para usar o ID do produto em `kiwifyIds`, no arquivo `src/config/entrega.ts`.
- Qualquer plano: um e-mail com a pasta (material + 3 bônus). Cada order bump vai num e-mail separado.
- Os links dos arquivos ficam em `src/config/entrega.ts`.
- Os pedidos de order bump também são enviados para a Utmify pela API (`UTMIFY_API_TOKEN`).
- Página de obrigado: `/obrigado`. Configure como página de agradecimento na Kiwify.
- Os logs aparecem na Vercel com o prefixo `[kiwify]`.
