import { describe, expect, it } from "vitest"
import { buttonClass } from "./Button.js"

describe("buttonClass", () => {
  it("usa contorno médio por padrão, com alvo de toque de 44px", () => {
    const c = buttonClass()
    expect(c).toContain("border-border")
    expect(c).toContain("min-h-11")
  })

  it("tinta inverte as cores do tema e aceita classes extras", () => {
    const c = buttonClass("ink", "sm", "w-full")
    expect(c).toContain("bg-text-primary text-bg-primary")
    expect(c).toContain("min-h-9")
    expect(c.endsWith("w-full")).toBe(true)
  })
})
