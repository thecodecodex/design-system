import type { ReactNode } from "react"

// Selo de status: ok (válido), error (inválido) ou neutral
export default function Badge({ tone, children }: { tone: "ok" | "error" | "neutral", children: ReactNode }) {
  const styles = { ok: "bg-btn-primary text-on-accent", error: "bg-contrast text-on-accent", neutral: "border-2 border-border" }[tone]
  return <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[13px] font-bold ${styles}`}>{children}</span>
}
