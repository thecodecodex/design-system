import type { ElementType, ReactNode } from "react"

// Markdown enxuto (títulos, parágrafos, listas, citações, código, tabelas, `código`, **negrito**, *itálico*, [links](url)).
// Monta elementos React, nunca HTML cru: o conteúdo não executa nada. Frontmatter (---) é ignorado.

function inline(source: string, key: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*|_[^_\s][^_]*_)|(\[[^\]]+\]\([^)\s]+\))/g
  let last = 0
  let i = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(source))) {
    if (m.index > last) parts.push(source.slice(last, m.index))
    const t = m[0]
    const k = `${key}-${i++}`
    if (m[1]) parts.push(<code key={k} className="rounded bg-inset px-1.5 py-px font-mono text-[0.92em]">{t.slice(1, -1)}</code>)
    else if (m[2]) parts.push(<strong key={k}>{t.slice(2, -2)}</strong>)
    else if (m[3]) parts.push(<em key={k}>{t.slice(1, -1)}</em>)
    else {
      const [, label = "", url = ""] = t.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/) ?? []
      parts.push(/^(https?:|\/|#|\.)/.test(url)
        ? <a key={k} href={url} target={url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-semibold text-btn-primary underline underline-offset-2 hover:text-contrast">{label}</a>
        : <span key={k}>{label}</span>)
    }
    last = m.index + t.length
  }
  if (last < source.length) parts.push(source.slice(last))
  return parts
}

const HEADING = [
  "m-0 mt-2 font-display text-[22px] font-black uppercase leading-tight",
  "m-0 mt-3 font-display text-lg font-extrabold leading-tight",
  "m-0 mt-2 font-display text-[15px] font-bold",
]

export default function Markdown({ source, className = "" }: { source: string, className?: string }) {
  let body = source.replace(/\r\n/g, "\n")
  if (body.startsWith("---\n")) {
    const end = body.indexOf("\n---", 4)
    if (end !== -1) body = body.slice(end + 4)
  }
  const lines = body.split("\n")
  const at = (n: number) => lines[n] ?? ""
  const blocks: ReactNode[] = []
  let i = 0
  let n = 0

  while (i < lines.length) {
    const line = at(i)
    const k = `b${n++}`
    if (!line.trim()) {
      i++
      continue
    }

    if (line.trim().startsWith("```")) {
      const code: string[] = []
      i++
      while (i < lines.length && !at(i).trim().startsWith("```")) code.push(at(i++))
      i++
      blocks.push(<pre key={k} className="m-0 overflow-x-auto rounded-[10px] bg-inset p-3.5 font-mono text-xs leading-relaxed">{code.join("\n")}</pre>)
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/)
    if (heading) {
      const level = (heading[1] ?? "#").length
      const Tag = `h${Math.min(level + 1, 6)}` as ElementType
      blocks.push(<Tag key={k} className={HEADING[Math.min(level, 3) - 1]}>{inline(heading[2] ?? "", k)}</Tag>)
      i++
      continue
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(<hr key={k} className="border-soft" />)
      i++
      continue
    }

    if (line.trim().startsWith("|") && /^\s*\|?\s*:?-{3,}/.test(at(i + 1))) {
      const cells = (l: string) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim())
      const head = cells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && at(i).trim().startsWith("|")) rows.push(cells(at(i++)))
      blocks.push(
        <div key={k} className="overflow-x-auto rounded-[14px] border-[1.5px] border-soft">
          <table className="plain w-full border-collapse text-[13px]">
            <thead><tr className="bg-inset text-left">{head.map((c, j) => <th key={j} className="px-3 py-2 font-bold">{inline(c, `${k}h${j}`)}</th>)}</tr></thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-t-[1.5px] border-soft">{row.map((c, j) => <td key={j} className="px-3 py-2 align-top">{inline(c, `${k}${r}${j}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    if (line.startsWith(">")) {
      const quote: string[] = []
      while (i < lines.length && at(i).startsWith(">")) quote.push(at(i++).replace(/^>\s?/, ""))
      blocks.push(<blockquote key={k} className="m-0 border-l-[3px] border-contrast pl-3.5 text-text-secondary">{inline(quote.join(" "), k)}</blockquote>)
      continue
    }

    const item = /^(\s*)([-*]|\d+\.)\s+/
    if (item.test(line)) {
      const ordered = /^\s*\d+\./.test(line)
      const items: string[] = []
      while (i < lines.length && (item.test(at(i)) || (/^\s{2,}\S/.test(at(i)) && items.length))) {
        if (item.test(at(i))) items.push(at(i).replace(item, ""))
        else items[items.length - 1] += ` ${at(i).trim()}`
        i++
      }
      const List = ordered ? "ol" : "ul"
      blocks.push(
        <List key={k} className={`m-0 flex flex-col gap-1 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((t, j) => <li key={j}>{inline(t.replace(/^\[( |x)\]\s*/, (_, x: string) => (x === "x" ? "☑ " : "☐ ")), `${k}${j}`)}</li>)}
        </List>,
      )
      continue
    }

    const para: string[] = []
    while (i < lines.length && at(i).trim() && !/^(#{1,4}\s|```|>|\s*([-*]|\d+\.)\s|\|)/.test(at(i))) para.push(at(i++).trim())
    if (para.length === 0) para.push(at(i++).trim())
    blocks.push(<p key={k} className="m-0">{inline(para.join(" "), k)}</p>)
  }

  return <div className={`flex flex-col gap-3 text-sm leading-relaxed text-text-primary ${className}`}>{blocks}</div>
}
