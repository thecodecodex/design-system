"use client"

import type { ReactNode } from "react"

// Escolha múltipla em chips (checkbox com cara de pílula)
export default function ChipToggles<T extends string>({ label, options, values, onValues, hideLabel = false }: {
  label: ReactNode
  options: { value: T, label: ReactNode }[]
  values: T[]
  onValues: (values: NoInfer<T>[]) => void
  hideLabel?: boolean
}) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-1.5">
      <legend className={hideLabel ? "sr-only" : "mb-1.5 text-sm font-semibold"}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = values.includes(option.value)
          return (
            <label
              key={option.value}
              className={`inline-flex min-h-10 cursor-pointer items-center rounded-full border-2 border-border px-3.5 text-[13px] font-bold has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-contrast ${on ? "bg-text-primary text-bg-primary" : "bg-surface hover:border-contrast"}`}>
              <input
                type="checkbox"
                className="sr-only"
                checked={on}
                onChange={() => onValues(on ? values.filter((v) => v !== option.value) : [...values, option.value])} />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
