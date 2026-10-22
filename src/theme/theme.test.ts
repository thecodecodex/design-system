import { describe, expect, it } from "vitest"
import { isDarkTheme, normalizePreference, resolveTheme, themeForHour } from "./theme"

describe("themeForHour", () => {
  it.each([
    [0, "escuro"],
    [5, "escuro"],
    [6, "claro"],
    [11, "claro"],
    [12, "papel"],
    [16, "papel"],
    [17, "crepusculo"],
    [19, "crepusculo"],
    [20, "escuro"],
    [23, "escuro"],
  ])("%i h → %s", (hour, theme) => {
    expect(themeForHour(hour)).toBe(theme)
  })
})

describe("normalizePreference", () => {
  it("migrates the old light/dark values", () => {
    expect(normalizePreference("light")).toBe("claro")
    expect(normalizePreference("dark")).toBe("escuro")
  })

  it("defaults to auto for empty or unknown values", () => {
    expect(normalizePreference(null)).toBe("auto")
    expect(normalizePreference("purple")).toBe("auto")
  })

  it("keeps valid preferences", () => {
    expect(normalizePreference("papel")).toBe("papel")
    expect(normalizePreference("sistema")).toBe("sistema")
  })
})

describe("resolveTheme", () => {
  it("follows the clock in auto mode", () => {
    expect(resolveTheme("auto", 14, true)).toBe("papel")
  })

  it("follows the OS in sistema mode", () => {
    expect(resolveTheme("sistema", 14, true)).toBe("escuro")
    expect(resolveTheme("sistema", 2, false)).toBe("claro")
  })

  it("ignores clock and OS when a theme is fixed", () => {
    expect(resolveTheme("contraste", 9, false)).toBe("contraste")
  })
})

describe("isDarkTheme", () => {
  it("flags only the dark group", () => {
    expect(["claro", "papel"].map((t) => isDarkTheme(t as never))).toEqual([false, false])
    expect(["crepusculo", "escuro", "contraste"].map((t) => isDarkTheme(t as never))).toEqual([true, true, true])
  })
})
