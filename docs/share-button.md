# Botão "Compartilhe" — Plano de Implementação

## Contexto

A opção "Compartilhe" em `components/DonateCTA.tsx` tinha o botão apontando para `href="#"` sem funcionalidade. O objetivo foi implementar o compartilhamento da URL do site com suporte a todos os ambientes.

## Comportamento por plataforma

| Ambiente | Comportamento |
|---|---|
| Mobile (iOS/Android) | `navigator.share()` → share sheet nativa do SO |
| Chrome/Edge desktop (Windows, Linux, Mac) | `navigator.share()` → diálogo nativo do SO |
| Safari desktop (Mac) | `navigator.share()` → share sheet nativa do macOS |
| Firefox (qualquer SO) | `navigator.share` não existe → modal de fallback |

## Fluxo

```
clique
  └─ navigator.share disponível?
       ├── Sim → navigator.share({ title, text, url }) → share sheet nativa
       │         (AbortError = usuário cancelou → ignorado silenciosamente)
       └── Não → abre modal de fallback
                    ├── WhatsApp
                    ├── Facebook
                    └── Copiar link (feedback visual "Copiado!" por 2s)
```

## Arquivos

- **`components/ShareButton.tsx`** — client component com a lógica de share + modal de fallback
- **`components/DonateCTA.tsx`** — usa `<ShareButton>` no card "Compartilhe"; campo `share: boolean` adicionado ao array `helpOptions` para distinguir dos outros cards não-primários

## Modal de fallback

- Fecha com ESC, clique fora, ou botão ×
- Links abrem em nova aba (`target="_blank" rel="noopener noreferrer"`)
- WhatsApp: `https://wa.me/?text=<texto + url>`
- Facebook: `https://www.facebook.com/sharer/sharer.php?u=<url>`
- Copiar link: `navigator.clipboard.writeText(SITE_URL)`

## Constantes

- `SITE_URL` importado de `lib/constants.ts`
- Texto: `"Conheça o Instituto Sempre Com Você, uma ONG que transforma vidas de pessoas com câncer e suas famílias."`
