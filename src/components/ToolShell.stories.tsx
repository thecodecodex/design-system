import type { Meta, StoryObj } from "@storybook/react-vite"
import NumberField from "./NumberField.js"
import Stat from "./Stat.js"
import ToolShell from "./ToolShell.js"

const meta = {
  title: "Layout/ToolShell",
  component: ToolShell,
  tags: ["autodocs"],
  args: {
    ready: true,
    paramsTitle: "Parâmetros",
    params: <NumberField label="Valor" value={1000} onValue={() => {}} prefix="R$" />,
    children: <Stat label="Resultado" value="R$ 1.106,50" emphasis tone="ok" />,
    how: <p className="text-sm">Juros compostos mensais sobre o valor inicial.</p>,
    sourceUrl: "https://github.com/thecodecodex/tools",
  },
} satisfies Meta<typeof ToolShell>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Carregando: Story = { args: { ready: false } }
