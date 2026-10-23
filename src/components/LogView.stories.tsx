import type { Meta, StoryObj } from "@storybook/react-vite"
import LogView from "./LogView.js"

const lines = [
  "> next build",
  "Compilando...",
  "warn: pacote opcional ausente, usando fallback",
  "Rotas geradas: 14",
  "error: falha ao conectar em localhost:5432",
  "Build concluído em 12,4 s",
]

const meta = {
  title: "Dados/LogView",
  component: LogView,
  tags: ["autodocs"],
  args: {
    lines,
    toneOf: (line) => (line.startsWith("error") ? "danger" : line.startsWith("warn") ? "warn" : line.includes("concluído") ? "ok" : undefined),
    downloadName: "build.log",
    className: "min-h-[260px]",
  },
} satisfies Meta<typeof LogView>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Vazio: Story = { args: { lines: [], empty: "Nenhuma saída ainda." } }
