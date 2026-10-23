"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { dialogLabels, type DialogLabels } from "./labels.js"

interface Props {
  open: boolean
  onClose: () => void
  title: ReactNode
  // ícone ou selo antes do título
  icon?: ReactNode
  children: ReactNode
  // barra de botões do rodapé
  footer?: ReactNode
  // largura máxima (classe Tailwind)
  width?: string
  // impede fechar com Esc/clique fora (ex.: durante uma operação)
  locked?: boolean
  labels?: Partial<DialogLabels>
}

// Diálogo modal nativo (<dialog> + showModal): foco preso, Esc fecha, fundo escurecido
export default function Dialog({ open, onClose, title, icon, children, footer, width = "max-w-lg", locked = false, labels }: Props) {
  const text = { ...dialogLabels, ...labels }
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault()
        if (!locked) onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !locked) onClose()
      }}
      className={`m-auto w-[calc(100%-2rem)] ${width} max-h-[calc(100dvh-2rem)] overflow-hidden rounded-[20px] border-2 border-border bg-surface p-0 text-text-primary shadow-[6px_6px_0_var(--border)] backdrop:bg-black/60 backdrop:backdrop-blur-xs`}>
      {open && (
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <div className="flex items-center justify-between gap-3 border-b-[1.5px] border-soft bg-inset px-5 py-3.5">
            <h2 className="m-0 flex min-w-0 items-center gap-2.5 font-display text-sm font-extrabold uppercase tracking-[0.08em]">
              {icon}
              <span className="truncate">{title}</span>
            </h2>
            <button
              type="button"
              onClick={onClose}
              disabled={locked}
              aria-label={text.close}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-text-secondary hover:bg-surface hover:text-text-primary disabled:opacity-40">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
          {footer && <div className="flex flex-wrap items-center justify-end gap-2 border-t-[1.5px] border-soft bg-inset px-5 py-3">{footer}</div>}
        </div>
      )}
    </dialog>
  )
}
