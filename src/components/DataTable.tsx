import type { ReactNode } from "react"

export interface DataTableRow {
  key: string
  label: ReactNode
  cells: ReactNode[]
  highlight?: boolean
}

interface Props {
  headers: ReactNode[]
  rows: DataTableRow[]
}

const cellClass = "border-0 px-4 py-3"

// `plain` desliga o estilo de tabela dos artigos (.post table) definido em global.css
export default function DataTable({ headers, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-border">
      <table className="plain w-full border-collapse whitespace-nowrap text-left text-sm">
        <thead className="bg-text-primary text-bg-primary">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className={`${cellClass} border-0 font-semibold`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono">
          {rows.map((row) => (
            <tr key={row.key} className={`border-b border-border/15 last:border-b-0 ${row.highlight ? "bg-cat-note text-cat-fg" : "hover:bg-bg-secondary"}`}>
              <td className={`${cellClass} font-body font-semibold`}>{row.label}</td>
              {row.cells.map((cell, i) => (
                <td key={i} className={`${cellClass} ${row.highlight ? "font-bold" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
