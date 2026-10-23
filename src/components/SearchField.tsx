"use client"

import { Icon } from "./icons.js"
import { onTextInput } from "./textInput.js"

// Busca com ícone: o rótulo é lido por leitores de tela e vira o placeholder quando não há outro
export default function SearchField({ label, value, onValue, placeholder, size = "md", className = "" }: {
  label: string
  value: string
  onValue: (value: string) => void
  placeholder?: string
  size?: "md" | "sm"
  className?: string
}) {
  return (
    <label className={`flex items-center gap-2 rounded-[10px] border-2 border-border bg-surface px-3 focus-within:border-contrast ${size === "md" ? "min-h-11" : "min-h-9"} ${className}`}>
      <span className="sr-only">{label}</span>
      <Icon name="search" size={size === "md" ? 16 : 14} className="text-text-secondary" />
      <input type="search" value={value} placeholder={placeholder ?? label} className={`min-w-0 flex-1 bg-transparent outline-none ${size === "md" ? "text-sm" : "text-[13px]"}`} {...onTextInput(onValue)} />
    </label>
  )
}
