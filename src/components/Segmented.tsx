"use client"

import type { ReactNode } from "react"

interface Props<T extends string | number> {
  label: ReactNode
  value: T
  options: { value: T, label: ReactNode }[]
  onValue: (value: T) => void
}

// Grupo de opções exclusivas (radio) com cara de botões
export default function Segmented<T extends string | number>({ label, value, options, onValue }: Props<T>) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-sm font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value
          return (
            <label
              key={String(option.value)}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-[10px] border-2 border-border px-3.5 text-sm font-bold has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-contrast ${active ? "bg-text-primary text-bg-primary" : "bg-bg-primary hover:border-contrast"}`}>
              <input type="radio" className="sr-only" checked={active} onChange={() => onValue(option.value)} />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
