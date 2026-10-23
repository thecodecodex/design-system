import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import ChipToggles from "./ChipToggles.js"

const meta = {
  title: "Formulário/ChipToggles",
  component: ChipToggles,
  tags: ["autodocs"],
  args: {
    label: "Repositórios",
    values: ["web", "api"],
    onValues: () => {},
    options: [
      { value: "web", label: "web" },
      { value: "api", label: "api" },
      { value: "mobile", label: "mobile" },
      { value: "iac", label: "iac" },
    ],
  },
  render: function Render(args) {
    const [values, setValues] = useState(args.values)
    return <ChipToggles {...args} values={values} onValues={setValues} />
  },
} satisfies Meta<typeof ChipToggles<string>>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
