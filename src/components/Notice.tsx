import type { ReactNode } from "react"

export type NoticeTone = "ok" | "warn" | "danger" | "info"

const STYLE: Record<NoticeTone, { box: string, icon: string }> = {
  ok: { box: "bg-ok-soft border-ok", icon: "text-ok" },
  warn: { box: "bg-warn-soft border-warn", icon: "text-warn" },
  danger: { box: "bg-danger-soft border-danger", icon: "text-danger" },
  info: { box: "bg-info-soft border-info", icon: "text-info" },
}

// Ícones (stroke, 24×24) por tom: check, triângulo, octógono, "i"
const ICON: Record<NoticeTone, ReactNode> = {
  ok: <><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  warn: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4M12 17h.01" /></>,
  danger: <><path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86z" /><path d="M12 8v4M12 16h.01" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></>,
}

// Faixa de aviso/resultado: fundo suave do tom, borda e ícone; o texto fica na cor do tema
export default function Notice({ tone = "info", title, children, role, className = "" }: {
  tone?: NoticeTone
  title?: ReactNode
  children?: ReactNode
  role?: "status" | "alert"
  className?: string
}) {
  const { box, icon } = STYLE[tone]
  return (
    <div role={role} className={`flex items-start gap-3 rounded-[14px] border-[1.5px] px-4 py-3 text-sm leading-relaxed text-text-primary ${box} ${className}`}>
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 shrink-0 ${icon}`}>
        {ICON[tone]}
      </svg>
      <div className="min-w-0 flex-1 space-y-1">
        {title && <div className="font-bold">{title}</div>}
        {children}
      </div>
    </div>
  )
}
