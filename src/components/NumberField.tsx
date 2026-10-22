"use client"

import { onTextInput } from "./textInput.js"
import type { ReactNode } from "react"

interface Props {
  label: ReactNode
  value: number
  onValue: (value: number) => void
  step?: number
  prefix?: string
  suffix?: string
  hint?: ReactNode
  // campo principal: input maior
  large?: boolean
  className?: string
}

export default function NumberField({ label, value, onValue, step = 1, prefix, suffix, hint, large = false, className = "" }: Props) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold ${className}`}>
      {label}
      <span
        className={`flex items-stretch overflow-hidden rounded-[10px] border-2 border-border bg-surface font-mono focus-within:outline-3 focus-within:outline-offset-1 focus-within:outline-contrast ${large ? "h-14 text-[22px] font-bold" : "h-12 text-base"}`}>
        {prefix && <span className="flex flex-none items-center border-r-[1.5px] border-soft bg-inset px-3 font-body text-sm font-semibold text-text-secondary">{prefix}</span>}
        <input type="number" inputMode="decimal" step={step} className="min-w-0 flex-1 bg-transparent px-3 text-text-primary outline-none" value={value} {...onTextInput((raw) => onValue(Number(raw) || 0))} />
        {suffix && <span className="flex flex-none items-center border-l-[1.5px] border-soft bg-inset px-3 font-body text-sm font-semibold text-text-secondary">{suffix}</span>}
      </span>
      {hint && <span className="text-[13px] font-normal text-text-secondary">{hint}</span>}
    </label>
  )
}
