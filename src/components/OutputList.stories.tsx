import type { Meta, StoryObj } from "@storybook/react-vite"
import OutputList from "./OutputList.js"

const meta = {
  title: "Dados/OutputList",
  component: OutputList,
  tags: ["autodocs"],
  args: {
    label: "UUIDs gerados",
    values: ["0b9c5c0e-3c8e-4d43-9d0e-1c1d3b0f5a11", "7f3e2a91-6b1d-4c55-8a2f-9e0d4c7b1e22", "c4a8d6f2-1e3b-4a77-b9c0-2d5e8f1a3b33"],
  },
} satisfies Meta<typeof OutputList>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
