import type { ReactNode } from "react"
import { panel, panelHeader } from "./panel.js"

interface Props {
  // faixa de título (caixa alta, Roboto); sem título o painel é só a superfície
  title?: ReactNode
  // contagem ao lado do título, em mono
  count?: number
  // botões/links à direita da faixa
  actions?: ReactNode
  // classes do corpo (padrão: p-5 sm:p-6)
  bodyClass?: string
  className?: string
  id?: string
  children?: ReactNode
}

// Painel com faixa de título opcional: superfície com borda suave sobre o fundo da página
export default function Panel({ title, count, actions, bodyClass = "p-5 sm:p-6", className = "", id, children }: Props) {
  const titleId = id ? `${id}-title` : undefined
  return (
    <section id={id} aria-labelledby={title ? titleId : undefined} className={`${panel} min-w-0 ${className}`}>
      {title && (
        <div className={`${panelHeader} flex-wrap justify-between`}>
          <h2 id={titleId} className="m-0 text-sm font-extrabold">
            {title}
            {count !== undefined && <span className="ml-2 font-mono font-semibold normal-case tracking-normal text-text-secondary">{count}</span>}
          </h2>
          {actions && <div className="flex flex-wrap items-center gap-2 font-body font-bold normal-case tracking-normal">{actions}</div>}
        </div>
      )}
      {children !== undefined && <div className={bodyClass}>{children}</div>}
    </section>
  )
}

// Linhas de uma lista dentro de um painel: divisória suave entre itens
export const panelRows = "flex flex-col [&>*+*]:border-t-[1.5px] [&>*+*]:border-soft"
