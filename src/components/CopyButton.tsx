"use client"

import { buttonClass, type ButtonSize, type ButtonVariant } from "./Button.js"
import { Icon } from "./icons.js"
import { copyLabels, type CopyLabels } from "./labels.js"
import { useCopy } from "./useCopy.js"

// Botão "Copiar" que vira "Copiado!" por alguns segundos
export default function CopyButton({ value, variant = "outline", size = "sm", labels, className = "", disabled = false }: {
  value: string
  variant?: ButtonVariant
  size?: ButtonSize
  labels?: Partial<CopyLabels>
  className?: string
  disabled?: boolean
}) {
  const text = { ...copyLabels, ...labels }
  const { copied, copy } = useCopy(2000)
  return (
    <button type="button" className={buttonClass(variant, size, className)} disabled={disabled} onClick={() => copy(value, "v")} aria-live="polite">
      <Icon name={copied ? "check" : "copy"} size={14} />
      {copied ? text.copied : text.copy}
    </button>
  )
}
