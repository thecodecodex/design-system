"use client"

import type { ReactNode } from "react"
import { copyLabels, type CopyLabels } from "./labels"
import { useCopy } from "./useCopy"

interface Props {
  labels?: Partial<CopyLabels>
  rows: { label: ReactNode, value: string, copyable?: boolean }[]
}

// Tabela de rótulo → valor (resultados de conversões), com copiar por linha
export default function KeyValue({ labels, rows }: Props) {
  const text = { ...copyLabels, ...labels }
  const { copied, copy } = useCopy()
  return (
    <dl className="flex flex-col overflow-hidden rounded-[14px] border-2 border-border">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-wrap items-center gap-x-4 gap-y-1 border-border/20 px-4 py-2.5 [&:not(:first-child)]:border-t-[1.5px]">
          <dt className="w-40 flex-none text-sm font-semibold text-text-secondary">{row.label}</dt>
          <dd className="m-0 min-w-0 flex-1 break-all font-mono text-[15px]">{row.value}</dd>
          {row.copyable !== false && row.value && (
            <button type="button" className="text-sm font-bold text-btn-primary hover:text-contrast" onClick={() => copy(row.value, `${i}`)} aria-live="polite">
              {copied === `${i}` ? text.copied : text.copy}
            </button>
          )}
        </div>
      ))}
    </dl>
  )
}
