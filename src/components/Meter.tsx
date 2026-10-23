import type { StatusTone } from "./StatusTag.js"

const FILL: Record<StatusTone, string> = { ok: "bg-ok", warn: "bg-warn", danger: "bg-danger", info: "bg-info", neutral: "bg-text-secondary" }

// Barra de progresso 0–100 com marca de meta opcional (ex.: cobertura de testes)
export default function Meter({ value, target, tone = "neutral", label }: {
  value: number
  target?: number
  tone?: StatusTone
  // descrição para leitores de tela
  label: string
}) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <span className="relative block h-2.5 rounded-full bg-inset" role="img" aria-label={label}>
      <span className={`absolute inset-y-0 left-0 rounded-full ${FILL[tone]}`} style={{ width: `${pct}%` }} />
      {target !== undefined && <span className="absolute -bottom-1 -top-1 w-0.5 bg-text-primary" style={{ left: `${target}%` }} />}
    </span>
  )
}
