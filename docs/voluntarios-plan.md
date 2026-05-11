# Página Voluntários — Instituto Sempre Com Você

## Context

O Instituto precisa de uma página dedicada ao recrutamento de voluntários em `/voluntarios`. A página deve converter visitantes em voluntários, apresentando as áreas de atuação, homenageando quem já contribuiu e terminando com um CTA para inscrição.

---

## File to Create

**`app/voluntarios/page.tsx`** — único arquivo com todas as sections inline (são seções exclusivas desta página, não precisam de componentes separados).

---

## Sections

### 1 · Hero `<VoluntariosHero>`

Inspirado nos screenshots do Instituto Raízes:

- **Background:** `bg-brand-blue-light` (`#E7F6FC`) com blobs decorativos suaves — tom claro e acolhedor, diferente do navy escuro do DonateCTA
- **Desktop (lg+):** Grid 2 colunas — coluna esquerda: badge + headline + parágrafo + botão CTA; coluna direita: `<Image src="/cancer/voluntario.png" ...>` posicionada flush-bottom
- **Mobile:** Linha 1: headline (col esquerda) + foto (col direita) lado a lado — exatamente como na referência; Linha 2: parágrafo descritivo; Linha 3: botão CTA — segue o padrão da referência mobile
- Usar `Reveal` / `RevealGroup` com `blur` para entrada animada
- O PNG do voluntário tem fundo transparente → funciona bem sobre o fundo claro azul

**Copy headline:** *"Doe seu tempo. Transforme vidas."*

---

### 2 · Por que ser voluntário? `<WhyVolunteer>`

- Fundo branco, layout full-width centrado
- Subtítulo em destaque + 3–4 parágrafos inspiracionais (voluntariado é gratificante, impacta quem vive o câncer, cria comunidade e propósito)
- 3 ícones/stats rápidos (ex: áreas de atuação, famílias beneficiadas, anos de história) para ancorar a credibilidade

---

### 3 · "No que ajudar?" `<VoluntariosAreas>`

Cards seguindo exatamente o padrão de `components/Programs.tsx`:
- Grid: `md:grid-cols-2 xl:grid-cols-4`, gap 5
- Sem abas — todo conteúdo visível em cards com hover lift + sombra colorida
- `Reveal` com stagger de 100ms por card

| # | Área | Ícone | Accent |
|---|------|-------|--------|
| 1 | Assistência Social | 🤝 | blue |
| 2 | Apoio Familiar | 💛 | pink |
| 3 | Trabalhadores da Saúde | 🩺 | green |
| 4 | Transporte e Logística | 🚗 | orange |
| 5 | Marketing | 📢 | purple |
| 6 | Captação de Recursos | 💰 | blue |
| 7 | Administrativo e Financeiro | 📊 | green |

---

### 4 · "Gratidão" `<Gratidao>`

- **Fundo:** brand-pink-light (`#FEE9F4`) — seção calorosa
- **2 frases de gratidão** baseadas nas histórias reais:
  1. Voz de ex-paciente virado voluntário (inspirado em Rubens/Alceu/Eloi)
  2. Voz de familiar enlutado (inspirado em Samuel/Juvelino)
- **Galeria de fotos:** grid de 7 imagens (mix landscape/portrait) com `object-cover` e `rounded-2xl`

**Fotos da galeria** (em ordem de exibição):

```
/blog/casa-cheia-ex-pacientes-que-viraram-voluntarios/img-001.jpg     (529×705)
/blog/casa-cheia-ex-pacientes-que-viraram-voluntarios/img-002.jpg     (563×751)
/blog/casa-cheia-ex-pacientes-que-viraram-voluntarios/img-003.jpg     (1600×1200)
/blog/luto-que-vira-amor-samuel-e-juvelino-transformam-a-dor-em-voluntariado/img-001.jpg  (633×844)
/blog/luto-que-vira-amor-samuel-e-juvelino-transformam-a-dor-em-voluntariado/img-002.jpg  (680×907)
/blog/antes-pacientes-agora-voluntarios-alceu-e-eloi-inspiram-o-instituto/img-001.jpg   (900×1600)
/blog/cecilia-de-paciente-a-voluntaria-superamos-juntas/img-001.jpg   (900×1600)
```

---

### 5 · CTA `<VoluntariosCTA>`

- Fundo `bg-brand-navy` (padrão `DonateCTA`)
- Headline curto + parágrafo de incentivo final
- Botão primário rosa (ActionButton) → `href="#"` placeholder (Google Form URL ainda não definida — trocar quando disponível)

---

## Components to Reuse

| Import | Uso |
|--------|-----|
| `@/components/Reveal` | Animação de entrada por elemento |
| `@/components/RevealGroup` | Animação de entrada em grupo com stagger |
| `@/components/backgrounds/GradientBackground` | Background decorativo |
| `@/components/ActionButton` | Botão primário rosa |
| `next/image` | Todas as imagens |

**Tokens Tailwind existentes:** `bg-brand-navy`, `bg-brand-pink`, `bg-brand-pink-light`, `bg-brand-blue-light`, `text-brand-navy`, `font-display`, `grain`, etc.

---

## Screenshot Workflow

Após implementar (servidor já rodando em `https://localhost:3000`):
1. Chrome DevTools MCP → `localhost:3000/voluntarios`
2. Screenshot desktop (1280px) → comparar hero contra referência
3. Screenshot mobile (375px) → comparar hero mobile contra referência  
4. 2+ rodadas de comparação e ajuste

---

## Notes

- Google Form URL: usar `href="#"` como placeholder; o usuário trocará quando tiver o link
- A página usa o `layout.tsx` raiz (Navbar + Footer + DonationPopup já incluídos automaticamente)
- Metadata: title `"Seja Voluntário — Instituto Sempre Com Você"`, description sobre voluntariado
