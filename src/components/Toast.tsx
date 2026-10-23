import type { ReactNode } from "react"

// Aviso flutuante no canto inferior direito; quem usa controla quando some
export default function Toast({ tone = "ok", children }: { tone?: "ok" | "danger" | "info", children: ReactNode }) {
  const color = { ok: "border-ok text-ok", danger: "border-danger text-danger", info: "border-info text-info" }[tone]
  return (
    <div role="status" className={`fixed bottom-12 right-5 z-50 flex max-w-[calc(100vw-40px)] items-center gap-2 rounded-[14px] border-2 bg-surface px-4 py-3 text-sm font-semibold shadow-[4px_4px_0_var(--border)] ${color}`}>
      {children}
    </div>
  )
}
