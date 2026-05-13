# Plano: Política de Privacidade, Termos de Uso e Cookie Banner (LGPD)

## Contexto

O site do Instituto do Câncer Sempre Com Você precisa estar em conformidade com a LGPD antes de ativar o Google Analytics. O footer já tem links placeholder (`href="#"`) para "Política de Privacidade" e "Termos de Uso". O Google Analytics ainda **não** está implementado no código — ele só deve ser adicionado junto com o mecanismo de consentimento de cookies. A política deve cobrir: formulário de voluntariado (Google Forms), cookie funcional do popup de doação, GA (analytics) e processamento de pagamento via MercadoPago.

**CNPJ:** 35.710.626/0001-76  
**Encarregado (DPO):** `contato@institutosemprecomvoce.com.br`

---

## Escopo desta tarefa

1. Criar página `/politica-de-privacidade`
2. Criar página `/termos-de-uso`
3. Criar componente `CookieBanner` (bloqueia GA até consentimento explícito)
4. Integrar Google Analytics (GA4) condicionalmente ao consentimento
5. Atualizar links no footer

---

## Arquivos a criar

### `app/politica-de-privacidade/page.tsx`
Página estática (Server Component). Conteúdo em português, LGPD-compliant.

**Seções obrigatórias:**
1. **Identificação do Controlador** — Instituto do Câncer Sempre Com Você, CNPJ 35.710.626/0001-76, Rua Karl Kumlehn, 185 – Joinville/SC, `contato@institutosemprecomvoce.com.br`
2. **Encarregado de Proteção de Dados** — `contato@institutosemprecomvoce.com.br`
3. **Dados coletados e finalidades** (com base legal LGPD art. 7 para cada um):
   - Formulário de voluntariado (Google Forms): nome, e-mail, telefone, área de atuação → base legal: consentimento (Art. 7, I)
   - Cookie funcional `donation_popup_dismissed`: controla exibição do popup de doação, 7 dias, sem identificação pessoal → base legal: legítimo interesse (Art. 7, IX)
   - Google Analytics (GA4): IP anonimizado, comportamento de navegação → base legal: consentimento (Art. 7, I)
   - MercadoPago: dados de pagamento processados diretamente pelo MercadoPago (este site não armazena dados de cartão)
4. **Cookies e Ferramentas de Análise** — seção detalhada sobre GA4 conforme recomendação do Gemini: identificação da ferramenta, finalidade estatística, dados coletados (IP anonimizado, cookies de sessão), direito de recusa (link para extensão opt-out do Google), como bloquear via configurações do navegador
5. **Compartilhamento com terceiros** — Google LLC (Analytics + Forms), MercadoPago, WhatsApp (compartilhamento voluntário)
6. **Retenção de dados** — cookie funcional: 7 dias; preferência de consentimento: 365 dias; dados GA: conforme política Google (por padrão 14 meses no GA4)
7. **Direitos dos titulares** (LGPD art. 18) — confirmação, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, revogação do consentimento. Canal: `contato@institutosemprecomvoce.com.br`
8. **Segurança** — site estático, sem banco de dados próprio, sem armazenamento de dados pessoais nos servidores do instituto
9. **Alterações** — data da última atualização, notificação via site
10. **Lei aplicável** — LGPD (Lei 13.709/2018), foro Joinville/SC

### `app/termos-de-uso/page.tsx`
Página estática (Server Component). Conteúdo em português.

**Seções:**
1. Aceitação dos Termos
2. Sobre o Instituto (descrição, fins não lucrativos)
3. Uso permitido do site
4. Propriedade intelectual (textos, imagens, logo)
5. Links externos (Google Forms, MercadoPago, redes sociais) — o instituto não se responsabiliza pelo conteúdo dessas plataformas
6. Isenção de responsabilidade (site informativo, não substitui orientação médica)
7. Doações — voluntárias, sem retorno financeiro, destinadas ao instituto
8. Alterações nos termos
9. Lei aplicável — Brasil, foro Joinville/SC

### `components/CookieBanner.tsx`
Client Component. Aparece na primeira visita e sempre que o consentimento não estiver registrado.

**Comportamento:**
- Lê o cookie `analytics_consent` ao montar
- Se ausente → exibe o banner
- Se `"granted"` → carrega GA
- Se `"denied"` → não carrega GA
- Botões: **"Aceitar"** (seta `analytics_consent=granted; max-age=31536000`) e **"Recusar"** (seta `analytics_consent=denied; max-age=31536000`)
- Ao clicar em qualquer botão → fecha o banner e aciona o carregamento condicional do GA

**Estilo:** consistente com o brand (brand-navy, brand-pink), posição `fixed bottom`, mobile-first, menciona link para `/politica-de-privacidade`

---

## Arquivos a modificar

### `app/layout.tsx`
- Importar `CookieBanner`
- Adicionar `<CookieBanner />` ao layout (antes do `</body>`)
- O GA script (`@next/third-parties/google` ou `next/script`) só é renderizado quando `analytics_consent === "granted"` (gerenciado dentro do `CookieBanner` via estado ou evento customizado)

A abordagem mais simples: `CookieBanner` é um Client Component que gerencia o estado de consentimento e renderiza `<GoogleAnalytics>` de `@next/third-parties/google` quando `consent === "granted"`.

**GA Measurement ID:** usar placeholder `G-XXXXXXXXXX` — preencher com o ID real do GA4 antes de ativar.

### `components/Footer.tsx`
Atualizar os dois links placeholder:
```tsx
// Antes
<a href="#">Política de Privacidade</a>
<a href="#">Termos de Uso</a>

// Depois
<Link href="/politica-de-privacidade">Política de Privacidade</Link>
<Link href="/termos-de-uso">Termos de Uso</Link>
```

---

## Dependências

- Instalar `@next/third-parties` para integrar GA4 de forma idiomática no Next.js App Router

---

## Verificação

1. `pnpm dev` → acessar `http://localhost:3000`
2. Verificar que o banner de cookies aparece na primeira visita
3. Clicar "Recusar" → GA não deve carregar (verificar via DevTools > Network, sem requests para `google-analytics.com`)
4. Recarregar página → banner não deve aparecer novamente (cookie salvo)
5. Acessar `/politica-de-privacidade` → página renderiza corretamente com todas as seções
6. Acessar `/termos-de-uso` → página renderiza corretamente
7. Footer → links "Política de Privacidade" e "Termos de Uso" funcionam
8. Abrir nova aba (ou limpar cookies) → clicar "Aceitar" → GA deve carregar (verificar network request para GA)
9. `pnpm build` → sem erros de TypeScript ou lint

---

## Notas importantes antes de publicar

- CNPJ: 35.710.626/0001-76 ✓
- Preencher `G-XXXXXXXXXX` com o Measurement ID real do GA4
- Ativar anonimização de IP e desativar publicidade personalizada no painel do GA4
