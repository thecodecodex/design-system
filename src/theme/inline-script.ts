import { AUTO_SCHEDULE, DARK_THEMES, STORAGE_KEY, THEMES } from "./theme.js"

// Script para o <head>, antes do primeiro paint (sem flash): versão mínima de resolveTheme + applyTheme.
// Gerado a partir das constantes de theme.ts, então horários e nomes nunca ficam dessincronizados.
export const themeInitScript = `(() => {
  const themes = ${JSON.stringify(THEMES)}
  const schedule = ${JSON.stringify([...AUTO_SCHEDULE].reverse())}
  let pref = null
  try { pref = localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) } catch { /* modo privado */ }
  if (pref === "light") pref = "claro"
  if (pref === "dark") pref = "escuro"
  if (!["auto", "sistema", ...themes].includes(pref)) pref = "auto"
  const h = new Date().getHours()
  const auto = (schedule.find((slot) => h >= slot.from) || schedule[0]).theme
  const theme = pref === "auto" ? auto : pref === "sistema" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro") : pref
  const root = document.documentElement
  root.classList.add("theme-" + theme)
  if (${JSON.stringify([...DARK_THEMES])}.includes(theme)) root.classList.add("dark")
  root.dataset.theme = theme
})()`
