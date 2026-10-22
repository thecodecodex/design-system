import type { ReactNode } from "react"

interface Props {
  // sem título: só o espaçamento do bloco (ferramentas com um grupo só)
  title?: string
  children: ReactNode
  // recolhível (<details>): sempre começa aberto, a pessoa recolhe o que não usa
  collapsible?: boolean
}

// Número do bloco: contador CSS zerado no painel de parâmetros (ToolShell), então blocos condicionais não deixam buracos
const badge = "inline-flex size-5 flex-none items-center justify-center rounded-md bg-text-primary font-mono text-[11px] font-bold not-italic text-bg-primary before:content-[counter(param)]"
const heading = "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-text-secondary"
const block = "border-soft [counter-increment:param] [&:not(:first-child)]:border-t-[1.5px]"
const body = "flex flex-col gap-4"

// Bloco numerado do painel de parâmetros
export default function ParamGroup({ title, children, collapsible = false }: Props) {
  if (collapsible && title) {
    return (
      <details open className={`group ${block}`}>
        <summary className={`${heading} min-h-[52px] cursor-pointer list-none px-5 sm:px-6 [&::-webkit-details-marker]:hidden`}>
          <span aria-hidden="true" className={badge} />
          <span>{title}</span>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="ml-auto transition-transform group-open:rotate-180">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <div className={`${body} px-5 pb-5 sm:px-6 sm:pb-6`}>{children}</div>
      </details>
    )
  }
  return (
    <div role={title ? "group" : undefined} aria-label={title} className={`${block} ${body} p-5 sm:p-6`}>
      {title && (
        <span className={heading}>
          <span aria-hidden="true" className={badge} />
          {title}
        </span>
      )}
      {children}
    </div>
  )
}
