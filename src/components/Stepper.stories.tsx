import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Stepper from "./Stepper.js"

const meta = {
  title: "Formulário/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: { label: "Dependentes", value: 2, onValue: () => {}, min: 0, max: 10 },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <Stepper {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
