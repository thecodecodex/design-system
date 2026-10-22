// Temas do design system: a classe .theme-<nome> vai no <html> (valores em src/styles/themes.css).
// O script anti-flash (inline-script.ts) é gerado a partir destas constantes.

export const THEMES = ["claro", "papel", "crepusculo", "escuro", "contraste"] as const
export type Theme = (typeof THEMES)[number]

export const THEME_PREFERENCES = ["auto", "sistema", ...THEMES] as const
export type ThemePreference = (typeof THEME_PREFERENCES)[number]

export const DEFAULT_PREFERENCE: ThemePreference = "auto"
export const STORAGE_KEY = "theme"

// Temas que recebem também a classe .dark (variante dark: do Tailwind, Shiki e Mermaid escuros)
export const DARK_THEMES: ReadonlySet<Theme> = new Set<Theme>(["crepusculo", "escuro", "contraste"])

// Modo Auto: cada tema vale a partir da hora indicada (horário local). Antes da primeira faixa (madrugada) vale o tema da noite.
const NIGHT_THEME: Theme = "escuro"

export const AUTO_SCHEDULE: ReadonlyArray<{ from: number, theme: Theme }> = [
  { from: 6, theme: "claro" },
  { from: 12, theme: "papel" },
  { from: 17, theme: "crepusculo" },
  { from: 20, theme: NIGHT_THEME },
]

export const AUTO_RECHECK_MS = 5 * 60 * 1000

export function themeForHour(hour: number): Theme {
  const current = [...AUTO_SCHEDULE].reverse().find((slot) => hour >= slot.from)
  return current?.theme ?? NIGHT_THEME
}

// Aceita valores antigos ("light"/"dark") e descarta lixo do localStorage
export function normalizePreference(raw: string | null | undefined): ThemePreference {
  if (raw === "light") return "claro"
  if (raw === "dark") return "escuro"
  return (THEME_PREFERENCES as readonly string[]).includes(raw ?? "") ? (raw as ThemePreference) : DEFAULT_PREFERENCE
}

export function resolveTheme(preference: ThemePreference, hour: number, systemDark: boolean): Theme {
  if (preference === "auto") return themeForHour(hour)
  if (preference === "sistema") return systemDark ? "escuro" : "claro"
  return preference
}

export function isDarkTheme(theme: Theme): boolean {
  return DARK_THEMES.has(theme)
}

// --- Navegador ---

export function readPreference(): ThemePreference {
  try {
    return normalizePreference(localStorage.getItem(STORAGE_KEY))
  } catch {
    return DEFAULT_PREFERENCE
  }
}

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  THEMES.forEach((name) => root.classList.toggle(`theme-${name}`, name === theme))
  root.classList.toggle("dark", isDarkTheme(theme))
  root.dataset.theme = theme
}

export function currentTheme(preference: ThemePreference = readPreference()): Theme {
  return resolveTheme(preference, new Date().getHours(), systemPrefersDark())
}

export function setPreference(preference: ThemePreference): Theme {
  try {
    localStorage.setItem(STORAGE_KEY, preference)
  } catch {
    // modo privado: o tema vale só para esta página
  }
  const theme = currentTheme(preference)
  applyTheme(theme)
  document.dispatchEvent(new CustomEvent("themechange", { detail: { preference, theme } }))
  return theme
}

// Mantém o tema certo enquanto a página fica aberta (virada de horário, mudança no SO, outra aba)
export function watchTheme(): void {
  const refresh = () => {
    const preference = readPreference()
    const theme = currentTheme(preference)
    applyTheme(theme)
    document.dispatchEvent(new CustomEvent("themechange", { detail: { preference, theme } }))
  }
  setInterval(() => {
    if (readPreference() === "auto") refresh()
  }, AUTO_RECHECK_MS)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (readPreference() === "sistema") refresh()
  })
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) refresh()
  })
}
