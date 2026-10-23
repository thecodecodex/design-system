import type { ReactNode } from "react"

// Título da tela (Roboto 900, caixa alta) + descrição + ações à direita
export default function PageHeader({ title, description, actions, eyebrow }: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  // rótulo mono acima do título (ex.: "02 / desenvolvimento")
  eyebrow?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="flex min-w-0 flex-col gap-2.5">
        {eyebrow && <span className="font-mono text-[13px] font-semibold text-btn-primary">{eyebrow}</span>}
        <h1 className="m-0 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black uppercase leading-none">{title}</h1>
        {description && <p className="m-0 max-w-3xl text-[15px] leading-relaxed text-text-secondary">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
