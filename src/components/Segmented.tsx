"use client"

import type { ReactNode } from "react"

interface Option<T> {
  value: T
  label: ReactNode
  // segunda linha (opções-cartão)
  description?: ReactNode
  // "danger" pinta a opção de vermelho (ex.: ambiente de produção)
  tone?: "danger"
}

interface Props<T extends string | number> {
  label: ReactNode
  value: T
  options: Option<T>[]
  onValue: (value: NoInfer<T>) => void
  // esconde a legenda (continua para leitores de tela)
  hideLabel?: boolean
  size?: "md" | "sm"
  disabled?: boolean
}

// Grupo de opções exclusivas (radio) com cara de botões
export default function Segmented<T extends string | number>({ label, value, options, onValue, hideLabel = false, size = "md", disabled = false }: Props<T>) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-1.5" disabled={disabled}>
      <legend className={hideLabel ? "sr-only" : "mb-1.5 text-sm font-semibold"}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value
          const danger = option.tone === "danger"
          const colors = active
            ? danger ? "border-danger bg-danger text-bg-primary" : "border-border bg-text-primary text-bg-primary"
            : danger ? "border-danger bg-bg-primary text-danger hover:bg-danger-soft" : "border-border bg-bg-primary hover:border-contrast"
          return (
            <label
              key={String(option.value)}
              className={`inline-flex cursor-pointer flex-col justify-center rounded-[10px] border-2 font-bold has-[:disabled]:cursor-default has-[:disabled]:opacity-60 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-contrast ${size === "md" ? "min-h-11 px-3.5 text-sm" : "min-h-9 px-3 text-[13px]"} ${option.description ? "items-start py-2 text-left" : "items-center"} ${colors}`}>
              <input type="radio" className="sr-only" checked={active} onChange={() => onValue(option.value)} />
              {option.label}
              {option.description && <span className={`text-xs font-normal ${active ? "opacity-80" : "text-text-secondary"}`}>{option.description}</span>}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
