"use client"

import { onTextInput } from "./textInput.js"
import type { ReactNode } from "react"
import { useId } from "react"

interface Props {
  label: ReactNode
  value: number
  onValue: (value: number) => void
  min?: number
  max?: number
  hint?: ReactNode
}

// Inteiro pequeno (dependentes, quantidade): − valor +, com o campo ainda editável
export default function Stepper({ label, value, onValue, min = 0, max = Number.MAX_SAFE_INTEGER, hint }: Props) {
  const id = useId()
  const set = (next: number) => onValue(Math.min(max, Math.max(min, Math.round(next) || min)))
  const button = "flex w-11 flex-none items-center justify-center bg-inset text-lg font-bold hover:text-contrast disabled:cursor-not-allowed disabled:opacity-40"
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="flex min-w-0 flex-col gap-0.5 text-sm font-semibold">
        {label}
        {hint && <span className="text-[13px] font-normal leading-snug text-text-secondary">{hint}</span>}
      </label>
      <span className="flex h-11 flex-none overflow-hidden rounded-[10px] border-2 border-border focus-within:outline-3 focus-within:outline-offset-1 focus-within:outline-contrast">
        <button type="button" className={button} disabled={value <= min} onClick={() => set(value - 1)} aria-label={typeof label === "string" ? `− ${label}` : "−"} aria-controls={id}>
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max === Number.MAX_SAFE_INTEGER ? undefined : max}
          step={1}
          value={value}
          {...onTextInput((raw) => set(Number(raw)))}
          className="w-14 border-x-[1.5px] border-soft bg-surface text-center font-mono text-base font-bold text-text-primary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="button" className={button} disabled={value >= max} onClick={() => set(value + 1)} aria-label={typeof label === "string" ? `+ ${label}` : "+"} aria-controls={id}>
          +
        </button>
      </span>
    </div>
  )
}
