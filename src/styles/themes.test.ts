import { describe, expect, it } from "vitest"
import { THEMES } from "../theme/theme.js"
import css from "./themes.css?raw"
import tokens from "./tokens.css?raw"

// Bloco de declarações de um tema (o claro também vale para :root)
function block(theme: string): string {
  const start = css.indexOf(`.theme-${theme} {`)
  return css.slice(start, css.indexOf("}", start))
}

describe("cores de status", () => {
  it.each(THEMES)("o tema %s define ok, warn, danger e info", (theme) => {
    for (const name of ["ok", "warn", "danger", "info"]) {
      expect(block(theme)).toMatch(new RegExp(`--${name}: #[0-9a-f]{6};`))
    }
  })

  it("gera utilidades para cada tom e seu fundo suave", () => {
    for (const name of ["ok", "warn", "danger", "info"]) {
      expect(tokens).toContain(`--color-${name}: var(--${name});`)
      expect(tokens).toContain(`--color-${name}-soft: var(--${name}-soft);`)
    }
  })
})
