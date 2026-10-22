"use client"

import type { ReactNode } from "react"

interface Props {
  label: ReactNode
  checked: boolean
  onChecked: (checked: boolean) => void
}

// Linha inteira clicável, em recuo (bg-inset) para se destacar dos campos de texto
export default function Checkbox({ label, checked, onChecked }: Props) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[10px] bg-inset px-3 py-2 text-sm font-semibold has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-contrast">
      <input type="checkbox" className="size-5 flex-none accent-[var(--btn-primary)]" checked={checked} onChange={(e) => onChecked(e.currentTarget.checked)} />
      {label}
    </label>
  )
}
