import type { ReactNode } from "react"

export type StatusTone = "ok" | "warn" | "danger" | "info" | "neutral"

const COLOR: Record<StatusTone, string> = {
  ok: "text-ok",
  warn: "text-warn",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-text-secondary",
}

// Marcador de forma por tom (círculo, triângulo, quadrado, anel): o status não depende só da cor.
// Herda a cor do texto (bg-current).
export function StatusMark({ tone, className = "" }: { tone: StatusTone, className?: string }) {
  if (tone === "warn") {
    return <span aria-hidden="true" className={`inline-block h-0 w-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-current ${className}`} />
  }
  if (tone === "danger") return <span aria-hidden="true" className={`inline-block h-[7px] w-[7px] rounded-[2px] bg-current ${className}`} />
  if (tone === "neutral") return <span aria-hidden="true" className={`inline-block h-[7px] w-[7px] rounded-full border-[1.5px] border-current ${className}`} />
  return <span aria-hidden="true" className={`inline-block h-[7px] w-[7px] rounded-full bg-current ${className}`} />
}

// Ponto de ligado/desligado: cheio quando ligado, vazado quando desligado
export function StatusDot({ on, className = "" }: { on: boolean, className?: string }) {
  return <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${on ? "bg-ok" : "border-2 border-danger"} ${className}`} />
}

// Selo de status: contorno na cor do tom, caixa alta, marcador de forma
export default function StatusTag({ tone, children, className = "" }: { tone: StatusTone, children: ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border-[1.5px] border-current px-2 py-0.5 text-xs font-bold uppercase tracking-[0.06em] ${COLOR[tone]} ${className}`}>
      <StatusMark tone={tone} />
      {children}
    </span>
  )
}
