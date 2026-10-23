"use client"

import { useState, type ReactNode } from "react"
import { Icon } from "./icons.js"
import { appShellLabels, type AppShellLabels } from "./labels.js"

export interface NavItem {
  href: string
  label: string
  icon?: ReactNode
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface LinkProps {
  href: string
  className: string
  title?: string
  "aria-current"?: "page"
  children: ReactNode
}

// <a> por padrão; apps com roteador passam o próprio Link (ex.: next/link)
const anchor = (props: LinkProps) => <a {...props} />

// Classes de um link do menu lateral: use em itens extras (navTop) para casar com o resto
export function navLinkClass(active: boolean, collapsed = false): string {
  return `flex min-h-10 items-center gap-2.5 rounded-[10px] px-3 text-sm font-semibold transition-colors ${
    active ? "bg-text-primary text-bg-primary hover:text-bg-primary" : "text-text-primary hover:bg-inset hover:text-text-primary"
  } ${collapsed ? "justify-center px-0" : ""}`
}

// Casca de app: topo (marca + ações), menu lateral recolhível com grupos numerados, conteúdo e rodapé
export default function AppShell({ brand, headerActions, nav, navTop, currentPath, renderLink = anchor, footer, numbered = true, defaultCollapsed = false, labels, children }: {
  brand: ReactNode
  headerActions?: ReactNode
  nav: NavGroup[]
  // itens acima dos grupos (início, atalho em destaque); recebe se o menu está recolhido
  navTop?: (collapsed: boolean) => ReactNode
  currentPath: string
  renderLink?: (props: LinkProps) => ReactNode
  footer?: ReactNode
  // "01 / grupo" em mono antes de cada grupo
  numbered?: boolean
  defaultCollapsed?: boolean
  labels?: Partial<AppShellLabels>
  children: ReactNode
}) {
  const text = { ...appShellLabels, ...labels }
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div className="flex h-screen w-full flex-col bg-ground text-text-primary">
      <header className="flex w-full shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-2 border-border bg-surface px-4 py-2.5 md:px-6">
        <div className="min-w-0">{brand}</div>
        {headerActions && <div className="flex flex-wrap items-center gap-2">{headerActions}</div>}
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`flex h-full shrink-0 flex-col border-r-[1.5px] border-soft bg-surface transition-[width] duration-300 ${collapsed ? "w-[68px]" : "w-64"}`}>
          <nav aria-label={text.nav} className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
            {navTop && <div className="space-y-2">{navTop(collapsed)}</div>}
            {nav.map((group, g) => (
              <div key={group.title} className="space-y-0.5">
                {collapsed
                  ? <div className="my-2 h-[1.5px] bg-soft" />
                  : (
                    <div className="px-3 pb-1.5 font-mono text-[13px] font-semibold lowercase text-btn-primary">
                      {numbered && `${String(g + 1).padStart(2, "0")} / `}
                      {group.title}
                    </div>
                  )}
                {group.items.map((item) => {
                  const active = currentPath === item.href
                  return (
                    <div key={item.href}>
                      {renderLink({
                        href: item.href,
                        title: collapsed ? item.label : undefined,
                        "aria-current": active ? "page" : undefined,
                        className: navLinkClass(active, collapsed),
                        children: (
                          <>
                            {item.icon}
                            {!collapsed && <span className="truncate">{item.label}</span>}
                          </>
                        ),
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </nav>
          <div className="border-t-[1.5px] border-soft p-3">
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? text.expand : text.collapse}
              className="flex min-h-10 w-full items-center gap-2 rounded-[10px] px-3 text-[13px] font-semibold text-text-secondary transition-colors hover:bg-inset hover:text-text-primary">
              <Icon name={collapsed ? "arrowRight" : "arrowLeft"} size={14} className={collapsed ? "mx-auto" : ""} />
              {!collapsed && <span>{text.collapse}</span>}
            </button>
          </div>
        </aside>

        <main className="w-full flex-1 overflow-y-auto bg-ground px-4 py-6 md:px-10 md:py-9">
          <div className="flex min-h-full w-full flex-col">{children}</div>
        </main>
      </div>

      {footer && (
        <footer className="flex w-full shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t-[1.5px] border-soft bg-surface px-4 py-2 font-mono text-xs text-text-secondary md:px-6">
          {footer}
        </footer>
      )}
    </div>
  )
}
