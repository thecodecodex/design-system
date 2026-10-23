import type { ReactNode } from "react"
import type { StatusTone } from "./StatusTag.js"

const VALUE: Record<StatusTone, string> = { ok: "text-ok", warn: "text-warn", danger: "text-danger", info: "text-info", neutral: "" }
const BORDER: Record<StatusTone, string> = { ok: "border-ok", warn: "border-warn", danger: "border-danger", info: "border-info", neutral: "border-border" }

// Número-resumo: rótulo, valor grande (Roboto 900) e dica. emphasis destaca a borda no tom
export default function Stat({ label, value, hint, tone = "neutral", emphasis = false, mono = false, aside, className = "" }: {
  label: ReactNode
  value: ReactNode
  hint?: ReactNode
  tone?: StatusTone
  emphasis?: boolean
  // valor em mono menor (contagens "3/5") em vez do número de destaque
  mono?: boolean
  // conteúdo à direita (ex.: selo de status)
  aside?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center justify-between gap-3 rounded-[20px] bg-surface p-5 ${emphasis ? `border-2 ${BORDER[tone]}` : "border-[1.5px] border-soft"} ${className}`}>
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[13px] text-text-secondary">{label}</span>
        <span className={`${mono ? "font-mono text-xl font-semibold" : "font-display text-[34px] font-black leading-none"} ${VALUE[tone]}`}>{value}</span>
        {hint && <span className="text-xs text-text-secondary">{hint}</span>}
      </div>
      {aside}
    </div>
  )
}
