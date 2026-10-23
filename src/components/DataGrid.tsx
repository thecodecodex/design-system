"use client"

import { useMemo, useState, type ReactNode } from "react"
import { Icon } from "./icons.js"
import { dataGridLabels, type DataGridLabels } from "./labels.js"
import SearchField from "./SearchField.js"
import { useCopy } from "./useCopy.js"

type Cell = string | number | boolean | null | undefined | object

interface Props {
  columns: string[]
  rows: Cell[][]
  // selos/metadados ao lado do título (perfil, duração...)
  meta?: ReactNode
  truncated?: boolean
  onClose?: () => void
  // nome do CSV baixado (sem extensão)
  fileName?: string
  pageSize?: number
  labels?: Partial<DataGridLabels>
}

const toolButton = "inline-flex min-h-9 items-center gap-1.5 rounded-[10px] border-2 border-border bg-surface px-3 text-[13px] font-bold text-text-primary hover:border-contrast"
const pageButton = "flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-border bg-surface text-text-primary hover:border-contrast disabled:pointer-events-none disabled:opacity-40"

function texto(cell: Cell): string {
  if (cell === null || cell === undefined) return ""
  return typeof cell === "object" ? JSON.stringify(cell) : String(cell)
}

function csvCell(cell: Cell): string {
  const s = texto(cell)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, "\"\"")}"` : s
}

// Grade de resultado de consulta: filtro em memória, paginação, CSV e JSON, NULL e booleanos destacados
export default function DataGrid({ columns, rows, meta, truncated = false, onClose, fileName = "resultado", pageSize = 50, labels }: Props) {
  const text = { ...dataGridLabels, ...labels }
  const [filter, setFilter] = useState("")
  const [page, setPage] = useState(1)
  const { copied, copy } = useCopy(2000)

  const filtered = useMemo(() => {
    const term = filter.trim().toLowerCase()
    return term ? rows.filter((row) => row.some((cell) => texto(cell).toLowerCase().includes(term))) : rows
  }, [rows, filter])
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  const exportCsv = () => {
    const body = [columns.map(csvCell).join(","), ...rows.map((row) => row.map(csvCell).join(","))].join("\n")
    const url = URL.createObjectURL(new Blob([body], { type: "text/csv;charset=utf-8" }))
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }
  const json = () => JSON.stringify(rows.map((row) => Object.fromEntries(columns.map((col, i) => [col, row[i] ?? null]))), null, 2)

  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border-[1.5px] border-soft bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-soft bg-inset px-4 py-3 text-[13px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-xs font-extrabold uppercase tracking-[0.08em]">{text.title}</span>
          {meta}
          <span className="font-semibold text-ok">{rows.length === 1 ? text.oneRow : text.rows.replace("{n}", String(rows.length))}</span>
          {truncated && <span className="rounded-md border-[1.5px] border-warn px-2 py-0.5 text-xs font-bold uppercase tracking-[0.06em] text-warn">{text.truncated}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {rows.length > 5 && (
            <SearchField
              size="sm"
              label={text.filter}
              value={filter}
              onValue={(v) => {
                setFilter(v)
                setPage(1)
              }} />
          )}
          <button type="button" className={toolButton} onClick={exportCsv}>
            <Icon name="download" size={13} />
            {text.csv}
          </button>
          <button type="button" className={toolButton} onClick={() => copy(json(), "json")} aria-live="polite">
            <Icon name={copied ? "check" : "copy"} size={13} />
            {copied ? text.copied : text.json}
          </button>
          {onClose && (
            <button type="button" onClick={onClose} aria-label={text.close} className="flex h-9 w-9 items-center justify-center rounded-[10px] text-text-secondary hover:bg-surface hover:text-text-primary">
              <Icon name="close" />
            </button>
          )}
        </div>
      </div>

      <div className="max-h-[460px] overflow-auto font-mono text-xs">
        {columns.length === 0 ? (
          <p className="m-0 p-8 text-center font-body text-sm text-text-secondary">{text.noColumns}</p>
        ) : visible.length === 0 ? (
          <p className="m-0 p-8 text-center font-body text-sm text-text-secondary">{text.empty}</p>
        ) : (
          <table className="plain w-full border-collapse text-left">
            <thead className="sticky top-0 z-10 border-b-[1.5px] border-soft bg-surface text-text-secondary">
              <tr>
                <th className="w-12 border-r border-soft px-3 py-2.5 text-center">#</th>
                {columns.map((col) => (
                  <th key={col} className="whitespace-nowrap border-r border-soft px-3.5 py-2.5 font-bold text-btn-primary">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((row, r) => (
                <tr key={r} className="border-t border-soft even:bg-inset/50 hover:bg-inset">
                  <td className="select-none border-r border-soft px-3 py-1.5 text-center text-text-secondary">{(page - 1) * pageSize + r + 1}</td>
                  {columns.map((_, c) => {
                    const cell = row[c]
                    if (cell === null || cell === undefined) {
                      return <td key={c} className="border-r border-soft px-3.5 py-1.5 italic text-text-secondary">&lt;NULL&gt;</td>
                    }
                    if (typeof cell === "boolean") {
                      return (
                        <td key={c} className="border-r border-soft px-3.5 py-1.5 font-bold">
                          <span className={`rounded-md border-[1.5px] border-current px-1.5 py-0.5 ${cell ? "text-ok" : "text-danger"}`}>{cell ? "TRUE" : "FALSE"}</span>
                        </td>
                      )
                    }
                    return <td key={c} title={texto(cell)} className="max-w-xs truncate whitespace-pre border-r border-soft px-3.5 py-1.5">{texto(cell)}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between border-t-[1.5px] border-soft bg-inset px-4 py-2 text-[13px] text-text-secondary">
          <span>{text.page.replace("{page}", String(page)).replace("{pages}", String(pages))}</span>
          <div className="flex items-center gap-1">
            <button type="button" className={pageButton} disabled={page === 1} onClick={() => setPage(page - 1)} aria-label={text.previous}><Icon name="chevronLeft" /></button>
            <button type="button" className={pageButton} disabled={page === pages} onClick={() => setPage(page + 1)} aria-label={text.next}><Icon name="chevronRight" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
