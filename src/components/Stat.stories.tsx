import type { Meta, StoryObj } from "@storybook/react-vite"
import Stat from "./Stat.js"

const meta = {
  title: "Dados/Stat",
  component: Stat,
  tags: ["autodocs"],
  args: { label: "PRs abertos", value: 12, hint: "3 aguardando revisão" },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Destaque: Story = { args: { emphasis: true, tone: "ok", label: "Builds verdes", value: "98%" } }
export const Mono: Story = { args: { mono: true, label: "Commit", value: "3b03b3d" } }

export const Grade: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Stat label="Deploys" value={42} tone="ok" />
      <Stat label="Falhas" value={3} tone="danger" />
      <Stat label="Em fila" value={5} tone="warn" />
    </div>
  ),
}
