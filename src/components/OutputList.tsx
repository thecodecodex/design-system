"use client"

import { outputListLabels, type OutputListLabels } from "./labels.js"
import { useCopy } from "./useCopy.js"

interface Props {
  labels?: Partial<OutputListLabels>
  values: string[]
  label?: string
}

const button = "inline-flex h-10 flex-none items-center rounded-[10px] border-2 border-border bg-bg-primary px-3 text-sm font-bold hover:border-contrast"

// Lista de valores gerados, cada um com "copiar", e um "copiar todos" (um por linha)
export default function OutputList({ labels, values, label }: Props) {
  const text = { ...outputListLabels, ...labels }
  const { copied, copy } = useCopy()
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 text-base tracking-[0.04em] sm:text-lg">{label ?? text.result}</h2>
        {values.length > 1 && (
          <button type="button" className={button} onClick={() => copy(values.join("\n"), "__all")} aria-live="polite">
            {copied === "__all" ? text.copied : text.copyAll}
          </button>
        )}
      </div>
      <ul className="flex flex-col gap-2" data-test="tool-output">
        {values.map((value, i) => (
          <li key={`${i}-${value}`} className="flex items-center gap-3 rounded-[14px] border-2 border-border bg-bg-primary py-2 pl-4 pr-2">
            <code className="min-w-0 flex-1 break-all font-mono text-[15px] sm:text-base" data-test="tool-value">
              {value}
            </code>
            <button type="button" className={button} onClick={() => copy(value, `${i}`)} aria-live="polite">
              {copied === `${i}` ? text.copied : text.copy}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
