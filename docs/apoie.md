# Plano: Landing page /apoie

## Context
Página dedicada de arrecadação de doações. Alta conversão, widget de pagamento já visível no hero. Sem backend — Pix estático + links MercadoPago gerados no dashboard.

## Estrutura
1. Hero — headline + widget de pagamento (Pix / Cartão)
2. Stats — números animados de impacto
3. Para onde vai — 3 GlowCards explicando uso dos recursos
4. Depoimentos — 3 cards (padrão do Testimonials existente)
5. CTA final — reforço emocional com scroll ao topo

## Arquivos
- `app/apoie/page.tsx` — landing page completa (server component)
- `components/PixCopyButton.tsx` — client, clipboard copy
- `components/DonationWidget.tsx` — client, tabs Pix/Cartão

## Placeholders para substituir
| Arquivo | Variável | Substituir por |
|---|---|---|
| DonationWidget.tsx | `CHAVE_PIX` | Chave Pix ou código EMV real |
| DonationWidget.tsx | `MP_LINKS` | Links do dashboard MercadoPago |
| DonationWidget.tsx | QR code `src` | Imagem QR Pix real |
| page.tsx | `stats` | Números reais do instituto |
| page.tsx | `testimonials` | Depoimentos reais de pacientes |
