import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import SearchField from "./SearchField.js"

const meta = {
  title: "Formulário/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: { label: "Buscar", value: "", onValue: () => {}, placeholder: "Buscar repositório..." },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <SearchField {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof SearchField>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Pequeno: Story = { args: { size: "sm" } }
