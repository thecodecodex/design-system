"use client"

import { onTextInput } from "./textInput.js"
import type { ReactNode } from "react"

interface Props {
  label: ReactNode
  value: number
  onValue: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
  hint?: ReactNode
}

// Slider para ajuste rápido + número para valor exato (o slider sozinho é impreciso, principalmente no celular)
export default function RangeField({ label, value, onValue, min, max, step = 1, unit, hint }: Props) {
  const set = (raw: string) => {
    const number = Number(raw)
    if (Number.isFinite(number)) onValue(number)
  }
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        {label}
        <span className="flex items-center gap-3">
          <input type="range" min={min} max={max} step={step} value={value} className="h-11 min-w-0 flex-1 accent-[var(--btn-primary)]" {...onTextInput(set)} />
          <span className="flex h-12 w-28 flex-none items-center gap-1.5 rounded-[10px] border-2 border-border bg-bg-primary px-3 font-mono focus-within:outline-3 focus-within:outline-offset-1 focus-within:outline-contrast">
            <input type="number" inputMode="decimal" min={min} max={max} step={step} value={value} aria-label={typeof label === "string" ? label : undefined} className="min-w-0 flex-1 bg-transparent text-base text-text-primary outline-none" {...onTextInput(set)} />
            {unit && <span className="text-sm font-bold text-text-secondary">{unit}</span>}
          </span>
        </span>
      </label>
      {hint && <span className="text-[13px] font-normal leading-snug text-text-secondary">{hint}</span>}
    </div>
  )
}
