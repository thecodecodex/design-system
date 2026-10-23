import type { Meta, StoryObj } from "@storybook/react-vite"
import DataGrid from "./DataGrid.js"

const rows = Array.from({ length: 120 }, (_, i) => [i + 1, `pedido-${1000 + i}`, ["aberto", "pago", "cancelado"][i % 3], (i * 37.5) % 900, i % 4 === 0 ? null : "2026-10-23"])

const meta = {
  title: "Dados/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
  args: { columns: ["id", "codigo", "status", "valor", "pago_em"], rows, meta: "120 linhas em 18 ms", pageSize: 25 },
} satisfies Meta<typeof DataGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Truncado: Story = { args: { truncated: true, onClose: () => {} } }
export const Vazio: Story = { args: { rows: [] } }
