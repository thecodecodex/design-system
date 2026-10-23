"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { Icon } from "./icons.js"
import { logViewLabels, type LogViewLabels } from "./labels.js"
import { useCopy } from "./useCopy.js"

export type LogTone = "ok" | "warn" | "danger"

const LINE: Record<LogTone, string> = {
  ok: "text-ok",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
}

const toolButton = "inline-flex min-h-9 items-center gap-1.5 rounded-[8px] px-2.5 font-body text-[13px] font-bold text-text-primary hover:bg-inset disabled:opacity-50"

// Console de log: cabeçalho opcional, barra (filtros/metadados + copiar/baixar) e linhas em mono que rolam até o fim
export default function LogView({ lines, toneOf, header, toolbar, empty, downloadName, autoScroll = true, className = "min-h-[420px]", labels }: {
  lines: string[]
  // destaca a linha (erro, aviso, sucesso)
  toneOf?: (line: string) => LogTone | undefined
  header?: ReactNode
  // lado esquerdo da barra: filtros, contagem, origem
  toolbar?: ReactNode
  // texto quando não há linhas
  empty?: ReactNode
  // mostra "Baixar" e usa este nome de arquivo
  downloadName?: string
  autoScroll?: boolean
  // altura/flex do console
  className?: string
  labels?: Partial<LogViewLabels>
}) {
  const text = { ...logViewLabels, ...labels }
  const { copied, copy } = useCopy(2000)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoScroll && box.current) box.current.scrollTop = box.current.scrollHeight
  }, [lines, autoScroll])

  const download = () => {
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }))
    const a = document.createElement("a")
    a.href = url
    a.download = downloadName ?? "log.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`flex flex-col overflow-hidden rounded-[20px] border-[1.5px] border-soft bg-surface ${className}`}>
      {header && <div className="border-b-[1.5px] border-soft px-5 py-4">{header}</div>}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[1.5px] border-soft px-4 py-2 font-mono text-xs text-text-secondary">
        <div className="flex min-w-0 flex-wrap items-center gap-2">{toolbar}</div>
        <div className="flex items-center gap-1">
          <button type="button" className={toolButton} disabled={lines.length === 0} onClick={() => copy(lines.join("\n"), "log")} aria-live="polite">
            <Icon name={copied ? "check" : "copy"} size={13} />
            {copied ? text.copied : text.copy}
          </button>
          {downloadName && (
            <button type="button" className={toolButton} disabled={lines.length === 0} onClick={download} aria-label={text.download} title={text.download}>
              <Icon name="download" size={14} />
            </button>
          )}
        </div>
      </div>
      <div ref={box} className="min-h-0 flex-1 select-text overflow-y-auto bg-inset px-4 py-3 font-mono text-xs leading-relaxed">
        {lines.length === 0
          ? <p className="m-0 font-body text-sm text-text-secondary">{empty}</p>
          : lines.map((line, i) => {
            const tone = toneOf?.(line)
            return (
              <div key={i} className={`whitespace-pre-wrap rounded-sm px-1.5 ${tone ? LINE[tone] : ""}`}>
                {line || " "}
              </div>
            )
          })}
      </div>
    </div>
  )
}
