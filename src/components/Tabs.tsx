"use client"

import type { ReactNode } from "react"

// Lista de abas. "buttons": botões com contorno (visões de uma tela) · "underline": sublinhado de contraste (arquivos, seções)
export default function Tabs<T extends string>({ label, items, value, onValue, variant = "buttons", className = "" }: {
  label: string
  items: { id: T, label: ReactNode }[]
  value: T
  onValue: (id: NoInfer<T>) => void
  variant?: "buttons" | "underline"
  className?: string
}) {
  return (
    <div role="tablist" aria-label={label} className={`flex flex-wrap ${variant === "buttons" ? "gap-2" : "gap-1"} ${className}`}>
      {items.map((item) => {
        const active = item.id === value
        const style = variant === "buttons"
          ? `min-h-11 rounded-[10px] border-2 border-border px-4 text-sm ${active ? "bg-text-primary text-bg-primary" : "bg-surface text-text-primary hover:border-contrast"}`
          : `min-h-11 px-2.5 text-[13px] ${active ? "text-text-primary shadow-[inset_0_-3px_0_var(--contrast)]" : "text-text-secondary hover:text-text-primary"}`
        return (
          <button key={item.id} type="button" role="tab" aria-selected={active} onClick={() => onValue(item.id)} className={`inline-flex items-center font-bold ${style}`}>
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
