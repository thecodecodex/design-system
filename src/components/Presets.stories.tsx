import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Presets from "./Presets.js"

const meta = {
  title: "Formulário/Presets",
  component: Presets,
  tags: ["autodocs"],
  args: {
    label: "Atalhos",
    value: 12,
    onValue: () => {},
    options: [
      { value: 6, label: "6 meses" },
      { value: 12, label: "1 ano" },
      { value: 60, label: "5 anos" },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <Presets {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof Presets<number>>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
