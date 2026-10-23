import type { ReactNode } from "react"

const TONE = {
  neutral: { box: "border-soft bg-surface", title: "" },
  ok: { box: "border-ok bg-ok-soft", title: "text-ok" },
  danger: { box: "border-danger bg-danger-soft", title: "text-danger" },
} as const

// Bloco recolhível (<details>): saída de comando, seção avançada, manutenção.
// heading: faixa em caixa alta (seção) · plain: título em negrito (resultado)
export default function Disclosure({ title, hint, tone = "neutral", open, heading = false, className = "", children }: {
  title: ReactNode
  // texto menor ao lado do título
  hint?: ReactNode
  tone?: keyof typeof TONE
  open?: boolean
  heading?: boolean
  className?: string
  children: ReactNode
}) {
  const style = TONE[tone]
  return (
    <details open={open} className={`rounded-[20px] border-[1.5px] px-5 sm:px-6 ${style.box} ${className}`}>
      <summary className={`flex min-h-[52px] cursor-pointer flex-wrap items-center gap-x-2 ${heading ? "font-display text-sm font-extrabold uppercase tracking-[0.08em]" : "text-sm font-bold"} ${style.title}`}>
        {title}
        {hint && <span className="font-body text-[13px] font-normal normal-case tracking-normal text-text-secondary">{hint}</span>}
      </summary>
      <div className="pb-5">{children}</div>
    </details>
  )
}
