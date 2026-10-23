# @thecodecodex/design-system

Design system do [thecodecodex.com](https://thecodecodex.com): tokens e 5 temas para **Tailwind CSS v4** e componentes de formulário em **React** (funcionam também em Preact via `preact/compat`).

## Instalação

```bash
pnpm add @thecodecodex/design-system
```

## CSS

No CSS principal do app, depois do Tailwind:

```css
@import "tailwindcss";
@import "@thecodecodex/design-system/styles.css";
/* para o Tailwind gerar as classes usadas pelos componentes (caminho relativo a este CSS) */
@source "../node_modules/@thecodecodex/design-system/dist";
```

`styles.css` = `tokens.css` + `themes.css` + `base.css` + `content.css`.

- `base.css`: barras de rolagem, foco visível e seleção. Serve a sites e apps.
- `content.css`: títulos com escala e margens de artigo e bordas em toda tabela (conteúdo editorial).

Apps e painéis costumam dispensar o `content.css`:

```css
@import "tailwindcss";
@import "@thecodecodex/design-system/tokens.css";
@import "@thecodecodex/design-system/themes.css";
@import "@thecodecodex/design-system/base.css";
```

Utilidades geradas: `bg-surface`, `bg-inset`, `bg-ground`, `text-text-primary`, `text-text-secondary`, `bg-btn-primary`, `text-on-accent`, `border-border`, `border-soft`, `text-contrast`, `bg-chart-1`, `bg-diff-add`, `bg-cat-*` etc.

### Status

`ok`, `warn`, `danger` e `info` (ligado/desligado, OK/atenção/erro), com valores próprios em cada tema e contraste ≥ 4.5:1 sobre a superfície: `text-ok`, `border-danger`, `bg-warn` (pontos e marcadores). Para avisos há o fundo suave `bg-ok-soft`, `bg-warn-soft`, `bg-danger-soft`, `bg-info-soft`. Use os tons como texto, contorno e ponto, nunca como único sinal: `StatusTag`, `StatusMark` e `StatusDot` mudam também a forma.

### Fontes

Os tokens usam `--font-roboto` (display), `--font-poppins` (corpo) e `--font-jetbrains-mono` (mono). Cada app carrega as fontes e define essas variáveis (ex.: `next/font` com `variable: "--font-roboto"`, ou Astro Fonts).

## Temas

`claro`, `papel`, `crepusculo`, `escuro`, `contraste`, mais as preferências `auto` (por horário) e `sistema`. A classe `.theme-<nome>` vai no `<html>`; temas escuros recebem também `.dark` (variante `dark:` do Tailwind).

Script anti-flash no `<head>`, antes do primeiro paint:

```tsx
// Next.js (app/layout.tsx)
import { themeInitScript } from "@thecodecodex/design-system/theme"

<html suppressHydrationWarning>
  <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
```

```astro
---
import { themeInitScript } from "@thecodecodex/design-system/theme"
---
<script is:inline set:html={themeInitScript} />
```

No cliente: `watchTheme()` mantém o tema certo (virada de horário, mudança no SO, outra aba); `setPreference("papel")` troca e salva. O evento `themechange` é disparado em `document`.

## Componentes

```tsx
import { Badge, NumberField, Segmented, ToolShell, ParamGroup } from "@thecodecodex/design-system"
```

Formulários e ferramentas: `Badge`, `Checkbox`, `DataTable`, `KeyValue`, `NumberField`, `OutputList`, `ParamGroup`, `Presets`, `RangeField`, `Segmented`, `Stepper`, `TextField`, `ToolShell`, as classes `panel`/`panelHeader` e os hooks `useCopy` e `useHydrated`.

Apps e painéis:

| Componente | Para quê |
|---|---|
| `AppShell` (+ `navLinkClass`) | casca de app: topo com marca e ações, menu lateral recolhível com grupos numerados, rodapé; `renderLink` recebe o `Link` do roteador |
| `PageHeader` | título da tela (Roboto 900, caixa alta), descrição e ações |
| `Panel` / `panelRows` | painel com faixa de título, contagem e ações; `panelRows` divide linhas de lista |
| `Button` / `buttonClass()` | variantes `ink` (principal), `outline`, `ghost` e `danger`, tamanhos `md` (44px) e `sm`; `buttonClass` serve para `<a>`/`<Link>` |
| `CopyButton` | "Copiar" → "Copiado!" |
| `Popover` / `MenuItem` | botão que abre painel ancorado (menu, seletor); fecha com Esc e clique fora |
| `Tabs` | abas `buttons` (visões da tela) ou `underline` (arquivos, seções) |
| `Segmented` | escolha única; opções aceitam `description` (cartões) e `tone: "danger"` (ex.: produção); `hideLabel`, `size`, `disabled` |
| `ChipToggles` | escolha múltipla em chips |
| `SearchField` | busca com ícone e rótulo acessível |
| `StatusTag`, `StatusMark`, `StatusDot` | selo, marcador de forma e ponto ligado/desligado nos tons de status |
| `Notice` | aviso com fundo suave, borda e ícone do tom |
| `Toast` | aviso flutuante (quem usa decide quando some) |
| `Stat` | número-resumo com rótulo, dica, tom e destaque |
| `Meter` | barra 0–100 com marca de meta |
| `Disclosure` | bloco recolhível (saída de comando, manutenção), neutro ou em tom ok/danger |
| `Dialog` | modal nativo (`<dialog>` + `showModal`): foco preso, Esc fecha, título, rodapé de botões |
| `ConfirmDialog` | confirmação com Cancelar e a ação (vermelha quando destrutiva) |
| `LogView` | console de log: cabeçalho, barra com filtros, copiar/baixar, linhas destacadas por tom, rola até o fim |
| `DataGrid` | resultado de consulta: filtro, paginação, CSV, JSON, NULL e booleanos destacados |
| `Markdown` | markdown enxuto renderizado como elementos React (sem HTML cru) |
| `ThemeMenu` | botão "Tema" com Auto, Sistema e os 5 temas (chama `watchTheme` uma vez por aba) |

```tsx
<PageHeader title="Dev Launcher" actions={<Button variant="ink">Subir todos</Button>} />
<Panel title="Repositórios" count={2} bodyClass="px-6">
  <div className={panelRows}>…</div>
</Panel>
<Dialog open={aberto} onClose={fechar} title="Excluir?" footer={<Button variant="danger">Excluir</Button>}>…</Dialog>
```

Textos fixos vêm em pt-BR; passe `labels` para traduzir (ex.: `<OutputList labels={{ copy: "Copy", copied: "Copied!" }} … />`).

### Preact

Com `preact({ compat: true })` (Astro) ou o alias `react → preact/compat` no bundler, os componentes funcionam sem mudanças.

No Astro, empacote o pacote também no SSR/prerender, senão o Node carrega o React real (instalado como peer) e os hooks quebram:

```js
// astro.config.mjs
const bundled = { resolve: { noExternal: ["@thecodecodex/design-system"] } }
export default defineConfig({
  integrations: [preact({ compat: true })],
  vite: { environments: { ssr: bundled, prerender: bundled } },
})
```

## Desenvolvimento

```bash
pnpm install
pnpm check   # tsc + eslint + vitest
pnpm build   # gera dist/
```

Publicação: atualize `version` no `package.json`, faça a tag `vX.Y.Z` e envie; o workflow `publish.yml` publica no npm com provenance.
