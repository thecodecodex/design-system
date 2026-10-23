import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import NumberField from "./NumberField.js"

const meta = {
  title: "Formulário/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  args: { label: "Salário bruto", value: 8500, onValue: () => {}, prefix: "R$", step: 100 },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <NumberField {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const ComSufixo: Story = { args: { label: "Taxa", value: 10.65, prefix: undefined, suffix: "% a.a.", step: 0.01 } }
export const Grande: Story = { args: { large: true, hint: "Valor mensal antes dos descontos." } }
