"use client"

import type { ReactNode } from "react"

interface Props<T> {
  label?: ReactNode
  value: T
  options: { value: T, label: string }[]
  onValue: (value: T) => void
}

// Valores de exemplo em pílulas, logo abaixo do campo que eles preenchem
export default function Presets<T>({ label, value, options, onValue }: Props<T>) {
  return (
    <div className="-mt-1 flex flex-wrap items-center gap-1.5">
      {label && <span className="mr-0.5 text-[13px] font-semibold text-text-secondary">{label}</span>}
      {options.map((option) => (
        <button
          key={String(option.value)}
          type="button"
          aria-pressed={option.value === value}
          className="h-8 min-w-10 rounded-full border-[1.5px] border-soft bg-surface px-2.5 font-mono text-xs font-semibold hover:border-contrast aria-pressed:border-text-primary aria-pressed:bg-text-primary aria-pressed:text-bg-primary"
          onClick={() => onValue(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  )
}
