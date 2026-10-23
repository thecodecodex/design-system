import type { Meta, StoryObj } from "@storybook/react-vite"
import DataTable from "./DataTable.js"

const meta = {
  title: "Dados/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    headers: ["Item", "CLT", "PJ"],
    rows: [
      { key: "bruto", label: "Bruto", cells: ["R$ 10.000", "R$ 13.000"] },
      { key: "impostos", label: "Impostos", cells: ["R$ 2.400", "R$ 1.300"] },
      { key: "liquido", label: "Líquido", cells: ["R$ 7.600", "R$ 11.700"], highlight: true },
    ],
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
