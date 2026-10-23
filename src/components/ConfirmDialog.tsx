"use client"

import type { ReactNode } from "react"
import Button from "./Button.js"
import Dialog from "./Dialog.js"
import { confirmDialogLabels, type ConfirmDialogLabels } from "./labels.js"

// Confirmação de ação: texto, Cancelar e o botão da ação (vermelho quando destrutiva)
export default function ConfirmDialog({ open, title, children, confirmLabel, onConfirm, onClose, danger = false, busy = false, icon, labels }: {
  open: boolean
  title: ReactNode
  children: ReactNode
  confirmLabel: ReactNode
  onConfirm: () => void
  onClose: () => void
  danger?: boolean
  // ação em andamento: desabilita o botão e impede fechar
  busy?: boolean
  icon?: ReactNode
  labels?: Partial<ConfirmDialogLabels>
}) {
  const text = { ...confirmDialogLabels, ...labels }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      locked={busy}
      width="max-w-md"
      icon={icon}
      title={title}
      footer={
        <>
          <Button size="sm" onClick={onClose} disabled={busy}>{text.cancel}</Button>
          <Button size="sm" variant={danger ? "danger" : "ink"} onClick={onConfirm} disabled={busy}>{confirmLabel}</Button>
        </>
      }>
      <div className="text-sm leading-relaxed text-text-secondary">{children}</div>
    </Dialog>
  )
}
