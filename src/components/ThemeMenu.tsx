"use client"

import { useEffect, useRef, useState } from "react"
import { currentTheme, readPreference, setPreference, watchTheme, type Theme, type ThemePreference } from "../theme/theme.js"
import { themeMenuLabels, type ThemeMenuLabels } from "./labels.js"

// Amostra de cada tema: fundo e acento (valores de themes.css)
const SWATCH: Record<Theme, [string, string]> = {
  claro: ["#ffffff", "#0e7490"],
  papel: ["#f6f1e7", "#9a3412"],
  crepusculo: ["#262130", "#f2a65a"],
  escuro: ["#12151e", "#2dfdfd"],
  contraste: ["#000000", "#ffe500"],
}

const OPTIONS: ThemePreference[] = ["auto", "sistema", "claro", "papel", "crepusculo", "escuro", "contraste"]

// watchTheme registra timers e listeners globais: uma vez por aba, mesmo com o menu remontando a cada página
let watching = false

const ICON_PROPS = { "aria-hidden": true, width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const

function Swatch({ preference }: { preference: ThemePreference }) {
  if (preference === "auto" || preference === "sistema") {
    return (
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-[1.5px] border-border">
        {preference === "auto"
          ? <svg {...ICON_PROPS}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
          : <svg {...ICON_PROPS}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>}
      </span>
    )
  }
  const [ground, accent] = SWATCH[preference]
  return <span aria-hidden="true" className="h-[22px] w-[22px] shrink-0 rounded-md border-[1.5px] border-border" style={{ background: `linear-gradient(135deg, ${ground} 55%, ${accent} 55%)` }} />
}

// Botão "Tema" para cabeçalhos de apps React: Auto (por horário), Sistema e os 5 temas
export default function ThemeMenu({ labels }: { labels?: Partial<ThemeMenuLabels> }) {
  const text = { ...themeMenuLabels, ...labels, names: { ...themeMenuLabels.names, ...labels?.names } }
  const [open, setOpen] = useState(false)
  const [preference, setPref] = useState<ThemePreference>("auto")
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPref(readPreference())
    if (!watching) {
      watching = true
      watchTheme()
    }
    const onChange = (e: Event) => setPref((e as CustomEvent<{ preference: ThemePreference }>).detail.preference)
    document.addEventListener("themechange", onChange)
    return () => document.removeEventListener("themechange", onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const outside = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", outside)
    document.addEventListener("keydown", esc)
    return () => {
      document.removeEventListener("mousedown", outside)
      document.removeEventListener("keydown", esc)
    }
  }, [open])

  const hint = (p: ThemePreference) =>
    p === "auto" ? text.autoHint.replace("{tema}", text.names[currentTheme("auto")]) : p === "sistema" ? text.systemHint : null

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border-2 border-border bg-surface px-3.5 text-sm font-bold text-text-primary hover:border-contrast">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
        </svg>
        <span className="hidden sm:inline">{text.names[preference]}</span>
        <span className="sr-only sm:hidden">{text.title}: {text.names[preference]}</span>
        <svg {...ICON_PROPS} width={14} height={14} className="text-text-secondary"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div role="menu" aria-label={text.title} className="absolute right-0 z-40 mt-2 w-[280px] max-w-[calc(100vw-32px)] rounded-[14px] border-2 border-border bg-surface p-2 shadow-[4px_4px_0_var(--border)]">
          <div className="px-2.5 pb-1.5 pt-1 font-display text-xs font-extrabold uppercase tracking-[0.08em] text-text-secondary">{text.title}</div>
          {OPTIONS.map((p) => {
            const active = p === preference
            return (
              <button
                key={p}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setPreference(p)
                  setPref(p)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-left text-sm ${active ? "bg-inset" : "hover:bg-inset"}`}>
                <Swatch preference={p} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-semibold">{text.names[p]}</span>
                  {hint(p) && <span className="text-xs text-text-secondary">{hint(p)}</span>}
                </span>
                {active && <svg {...ICON_PROPS} width={16} height={16}><path d="M20 6 9 17l-5-5" /></svg>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
