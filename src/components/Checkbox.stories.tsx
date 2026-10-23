import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Checkbox from "./Checkbox.js"

const meta = {
  title: "Formulário/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Lembrar desta escolha", checked: true, onChecked: () => {} },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Checkbox {...args} checked={checked} onChecked={setChecked} />
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Marcado: Story = {}
export const Desmarcado: Story = { args: { checked: false } }
