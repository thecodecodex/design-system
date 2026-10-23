import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import RangeField from "./RangeField.js"

const meta = {
  title: "Formulário/RangeField",
  component: RangeField,
  tags: ["autodocs"],
  args: { label: "Prazo", value: 24, onValue: () => {}, min: 1, max: 120, unit: "meses" },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <RangeField {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof RangeField>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
