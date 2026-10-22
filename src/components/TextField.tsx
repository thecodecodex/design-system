"use client"

import type { ReactNode } from "react"

interface Props {
  label: ReactNode
  value: string
  onValue: (value: string) => void
  placeholder?: string | undefined
  multiline?: boolean
  rows?: number
  type?: "text" | "datetime-local"
  invalid?: boolean
  hint?: ReactNode
  className?: string
}

const box = "rounded-[10px] border-2 bg-bg-primary px-3 font-mono text-base text-text-primary outline-none focus:outline-3 focus:outline-offset-1 focus:outline-contrast"

export default function TextField({ label, value, onValue, placeholder, multiline = false, rows = 4, type = "text", invalid = false, hint, className = "" }: Props) {
  const border = invalid ? "border-contrast" : "border-border"
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold ${className}`}>
      {label}
      {multiline ? (
        <textarea rows={rows} spellCheck={false} className={`${box} ${border} min-h-24 resize-y py-2.5 leading-relaxed`} value={value} placeholder={placeholder} onChange={(e) => onValue(e.currentTarget.value)} />
      ) : (
        <input type={type} step={type === "datetime-local" ? 1 : undefined} spellCheck={false} autoComplete="off" className={`${box} ${border} h-12`} value={value} placeholder={placeholder} onChange={(e) => onValue(e.currentTarget.value)} />
      )}
      {hint && <span className="text-[13px] font-normal text-text-secondary">{hint}</span>}
    </label>
  )
}
