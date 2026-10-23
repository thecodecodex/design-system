import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Segmented from "./Segmented.js"

const meta = {
  title: "Formulário/Segmented",
  component: Segmented,
  tags: ["autodocs"],
  args: {
    label: "Ambiente",
    value: "dev",
    onValue: () => {},
    options: [
      { value: "dev", label: "dev" },
      { value: "hml", label: "hml" },
      { value: "prd", label: "prd", tone: "danger" },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <Segmented {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof Segmented<string>>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Pequeno: Story = { args: { size: "sm" } }
export const ComDescricao: Story = {
  args: {
    label: "Regime",
    value: "clt",
    options: [
      { value: "clt", label: "CLT", description: "Carteira assinada" },
      { value: "pj", label: "PJ", description: "Prestação de serviços" },
    ],
  },
}
export const Desabilitado: Story = { args: { disabled: true } }
