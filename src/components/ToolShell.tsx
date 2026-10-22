"use client"

import type { ReactNode } from "react"
import { toolShellLabels, type ToolShellLabels } from "./labels"
import { useCopy } from "./useCopy"
import { panel, panelHeader } from "./panel"

interface Props {
  labels?: Partial<ToolShellLabels>
  ready: boolean
  // painel de parâmetros (esquerda no desktop)
  params?: ReactNode
  paramsTitle?: string
  children: ReactNode
  how?: ReactNode
  // link para o código da ferramenta ("Ver o código")
  sourceUrl?: string
  notice?: ReactNode
}

// Layout comum das ferramentas: parâmetros + resultado, "Como funciona?" e aviso de privacidade
export default function ToolShell({ labels, ready, params, paramsTitle, children, how, sourceUrl, notice }: Props) {
  const text = { ...toolShellLabels, ...labels }
  const { copied, copy } = useCopy(2000)
  return (
    <div className="flex flex-col gap-6" data-tool={ready ? "ready" : "loading"}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end">
        <span className="text-[13px] text-text-secondary">{text.shareHint}</span>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-text-primary px-4 text-sm font-bold text-bg-primary hover:bg-bg-tertiary-hover"
          onClick={() => copy(window.location.href, "link")}
          aria-live="polite"
          data-test="copy-link">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
          </svg>
          {copied === "link" ? text.linkCopied : text.copyLink}
        </button>
      </div>
      {notice && <p className="m-0 rounded-[14px] border-2 border-dashed border-soft bg-surface px-4 py-3 text-sm leading-relaxed text-text-secondary">{notice}</p>}
      <div className="flex flex-wrap items-start gap-6">
        {params && (
          <form className={`${panel} flex min-w-0 flex-[1_1_320px] flex-col md:max-w-[440px]`} onSubmit={(e) => e.preventDefault()}>
            <span className={panelHeader}>{paramsTitle ?? text.params}</span>
            <div className="flex flex-col [counter-reset:param]">{params}</div>
          </form>
        )}
        <section className={`${panel} flex min-w-0 flex-[999_1_480px] flex-col gap-5 p-5 sm:p-6`}>{children}</section>
      </div>
      {(how || sourceUrl) && (
        <details id="how" className={`${panel} scroll-mt-24 px-5`}>
          <summary className="flex min-h-[52px] cursor-pointer items-center font-bold">{text.how}</summary>
          {how && <div className="mb-3 mt-1 max-w-4xl text-sm leading-relaxed text-text-secondary">{how}</div>}
          {sourceUrl && (
            <a href={sourceUrl} className="mb-4 inline-block font-mono text-sm font-bold text-btn-primary hover:text-contrast">
              {text.howCode}
            </a>
          )}
        </details>
      )}
      <p className="m-0 flex items-center gap-2 text-[13px] text-text-secondary">
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        {text.private}
      </p>
    </div>
  )
}
