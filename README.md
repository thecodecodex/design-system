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

`styles.css` = `tokens.css` + `themes.css` + `base.css`. Para não aplicar os estilos base (títulos, foco, tabelas, barras de rolagem), importe só `tokens.css` e `themes.css`.

Utilidades geradas: `bg-surface`, `bg-inset`, `bg-ground`, `text-text-primary`, `text-text-secondary`, `bg-btn-primary`, `text-on-accent`, `border-border`, `border-soft`, `text-contrast`, `bg-chart-1`, `bg-diff-add`, `bg-cat-*` etc.

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

`Badge`, `Checkbox`, `DataTable`, `KeyValue`, `NumberField`, `OutputList`, `ParamGroup`, `Presets`, `RangeField`, `Segmented`, `Stepper`, `TextField`, `ToolShell`, as classes `panel`/`panelHeader` e os hooks `useCopy` e `useHydrated`.

Textos fixos vêm em pt-BR; passe `labels` para traduzir (ex.: `<OutputList labels={{ copy: "Copy", copied: "Copied!" }} … />`).

### Preact

Com `preact({ compat: true })` (Astro) ou o alias `react → preact/compat` no bundler, os componentes funcionam sem mudanças.

## Desenvolvimento

```bash
pnpm install
pnpm check   # tsc + eslint + vitest
pnpm build   # gera dist/
```

Publicação: atualize `version` no `package.json`, faça a tag `vX.Y.Z` e envie; o workflow `publish.yml` publica no npm com provenance.
