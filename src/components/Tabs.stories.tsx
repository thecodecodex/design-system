import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Tabs from "./Tabs.js"

const meta = {
  title: "Navegação/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    label: "Seções",
    value: "status",
    onValue: () => {},
    items: [
      { id: "status", label: "Status" },
      { id: "branches", label: "Branches" },
      { id: "prs", label: "PRs" },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <Tabs {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof Tabs<string>>

export default meta
type Story = StoryObj<typeof meta>

export const Botoes: Story = {}
export const Sublinhado: Story = { args: { variant: "underline" } }
