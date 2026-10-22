import { afterEach, describe, expect, it, vi } from "vitest"
import { themeInitScript } from "./inline-script.js"
import { themeForHour } from "./theme.js"

// Roda o script num DOM mínimo e confere que ele concorda com themeForHour
function run(hour: number, stored: string | null) {
  const classes = new Set<string>()
  const root = { classList: { add: (name: string) => classes.add(name) }, dataset: {} as Record<string, string> }
  vi.stubGlobal("document", { documentElement: root })
  vi.stubGlobal("localStorage", { getItem: () => stored })
  vi.stubGlobal("matchMedia", () => ({ matches: false }))
  vi.useFakeTimers().setSystemTime(new Date(2026, 0, 1, hour))
  new Function(themeInitScript)()
  return { theme: root.dataset.theme, dark: classes.has("dark") }
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe("themeInitScript", () => {
  it.each([0, 6, 12, 17, 20, 23])("auto at %i h matches themeForHour", (hour) => {
    expect(run(hour, null).theme).toBe(themeForHour(hour))
  })

  it("applies a stored theme and the dark class", () => {
    expect(run(10, "contraste")).toEqual({ theme: "contraste", dark: true })
    expect(run(22, "light")).toEqual({ theme: "claro", dark: false })
  })
})
