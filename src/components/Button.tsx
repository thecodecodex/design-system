import type { ButtonHTMLAttributes } from "react"

// ink: ação principal (tinta do tema) · outline: secundária · ghost: terciária · danger: destrutiva
export type ButtonVariant = "ink" | "outline" | "ghost" | "danger"
export type ButtonSize = "md" | "sm"

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-bold whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none"

const VARIANTS: Record<ButtonVariant, string> = {
  ink: "border-2 border-text-primary bg-text-primary text-bg-primary hover:bg-bg-tertiary-hover hover:border-bg-tertiary-hover",
  outline: "border-2 border-border bg-surface text-text-primary hover:border-contrast",
  ghost: "border-2 border-transparent text-text-primary hover:bg-inset",
  danger: "border-2 border-danger bg-surface text-danger hover:bg-danger hover:text-bg-primary",
}

// alvo de toque ≥ 44px no md
const SIZES: Record<ButtonSize, string> = {
  md: "min-h-11 px-4 text-sm",
  sm: "min-h-9 px-3 text-[13px]",
}

// Classes do botão: use também em <a>/<Link> com cara de botão
export function buttonClass(variant: ButtonVariant = "outline", size: ButtonSize = "md", extra = ""): string {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`.trim()
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant, size?: ButtonSize }

export default function Button({ variant = "outline", size = "md", className = "", type = "button", ...props }: Props) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />
}
