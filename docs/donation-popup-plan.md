# Plano: Popup de Doação com Cookie

## Contexto

O site do Instituto do Câncer Sempre Com Você precisa de um popup que aparece automaticamente após 60 segundos de navegação para incentivar doações. O popup exibe o `DonationWidget` já existente. Ao fechar, um cookie de 1 semana impede que o popup abra novamente até expirar.

---

## Arquivos a criar / modificar

| Arquivo                        | Ação                                                      |
| ------------------------------ | --------------------------------------------------------- |
| `components/DonationPopup.tsx` | **Criar** — componente client-side do popup               |
| `app/layout.tsx`               | **Modificar** — importar e renderizar `<DonationPopup />` |

---

## Implementação

### 1. `components/DonationPopup.tsx` (novo)

**`"use client"`** — component interativo que usa `useEffect`, `useState`, `createPortal`.

**Lógica:**

- Na montagem (`useEffect`), verificar se o cookie `donation_popup_dismissed` existe via `document.cookie`.
- Se o cookie existir → não fazer nada.
- Se não existir → agendar `setTimeout(delay)` (default `60_000 ms`) para mostrar o popup.
- Ao fechar: gravar cookie `donation_popup_dismissed=1; max-age=604800; path=/; SameSite=Lax` (604800 s = 7 dias) e fechar o popup com animação de saída.
- Tecla **Escape** também fecha.

**Renderização:**

- Usa `createPortal(…, document.body)` — mesmo padrão do `DonationWidget` e `MobileNav`.
- Backdrop semitransparente com blur (igual ao QR code modal já existente).
- Card centralizado contendo:
  - Pequeno cabeçalho ("Ajude alguém hoje ♥")
  - O componente `<DonationWidget />` importado diretamente
  - Botão ✕ no canto superior direito
- Animação: fade-in + slide-up na entrada (`opacity` + `transform: translateY`), invertida na saída — animando apenas `transform` e `opacity` (seguindo as regras do webdesign.md).

**Props:**

```ts
interface DonationPopupProps {
  delay?: number; // ms, default 60_000
}
```

### 2. `app/layout.tsx` (modificar)

Adicionar `<DonationPopup />` dentro do `<body>`, após o `<div id="viewport">`. Como `layout.tsx` é Server Component, basta importar o componente (ele declara `"use client"` internamente).

```tsx
import { DonationPopup } from "@/components/DonationPopup";

// dentro do <body>:
<div id="viewport">…</div>
<DonationPopup delay={60_000} />
```

---

## Gerenciamento de cookie

Sem biblioteca externa — usar a API nativa `document.cookie`:

```ts
// Leitura
const dismissed = document.cookie
  .split("; ")
  .some((c) => c.startsWith("donation_popup_dismissed="));

// Escrita (7 dias)
document.cookie =
  "donation_popup_dismissed=1; max-age=604800; path=/; SameSite=Lax";
```

---

## Verificação

1. Abrir `https://localhost:3000` (servidor já em execução)
2. Aguardar 60 s → popup deve aparecer
3. Fechar popup → inspecionar cookies no DevTools; `donation_popup_dismissed` deve existir com ~7 dias de expiração
4. Recarregar a página → popup NÃO deve aparecer
5. Deletar o cookie manualmente → recarregar e aguardar 60 s → popup deve aparecer novamente
6. Testar tecla Escape para fechar
7. Testar em mobile (viewport estreito)
