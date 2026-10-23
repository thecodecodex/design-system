"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

// Botão que abre um painel ancorado (menu, seletor): fecha com Esc, clique fora ou pela função `close`
export default function Popover({ trigger, triggerLabel, triggerClass, role = "dialog", panelLabel, align = "right", width = "w-[320px]", children }: {
  // conteúdo do botão
  trigger: ReactNode
  // nome acessível quando o botão só tem ícone
  triggerLabel?: string
  triggerClass?: string
  role?: "dialog" | "menu"
  panelLabel: string
  align?: "left" | "right"
  width?: string
  children: (close: () => void) => ReactNode
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup={role}
        aria-expanded={open}
        aria-label={triggerLabel}
        className={triggerClass ?? "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-[10px] border-2 border-border bg-surface px-3.5 text-sm font-bold text-text-primary hover:border-contrast"}>
        {trigger}
      </button>
      {open && (
        <div
          role={role}
          aria-label={panelLabel}
          className={`absolute z-40 mt-2 ${width} max-w-[calc(100vw-32px)] rounded-[14px] border-2 border-border bg-surface p-2 text-text-primary shadow-[4px_4px_0_var(--border)] ${align === "right" ? "right-0" : "left-0"}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}

// Item de menu dentro do Popover (role="menu")
export function MenuItem({ onSelect, danger = false, children }: { onSelect: () => void, danger?: boolean, children: ReactNode }) {
  return (
    <button type="button" role="menuitem" onClick={onSelect} className={`flex min-h-10 w-full items-center gap-2 rounded-[8px] px-3 text-left text-sm font-semibold hover:bg-inset ${danger ? "text-danger" : "text-text-primary"}`}>
      {children}
    </button>
  )
}
