import type { Meta, StoryObj } from "@storybook/react-vite"
import Badge from "./Badge.js"

const meta = {
  title: "Status/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { tone: "ok", children: "Válido" },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Ok: Story = {}
export const Erro: Story = { args: { tone: "error", children: "Inválido" } }
export const Neutro: Story = { args: { tone: "neutral", children: "Rascunho" } }
