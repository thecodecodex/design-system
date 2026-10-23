import type { Meta, StoryObj } from "@storybook/react-vite"
import KeyValue from "./KeyValue.js"

const meta = {
  title: "Dados/KeyValue",
  component: KeyValue,
  tags: ["autodocs"],
  args: {
    rows: [
      { label: "Branch", value: "main" },
      { label: "Commit", value: "3b03b3d", copyable: true },
      { label: "Autor", value: "Fulano" },
    ],
  },
} satisfies Meta<typeof KeyValue>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
