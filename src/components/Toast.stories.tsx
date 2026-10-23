import type { Meta, StoryObj } from "@storybook/react-vite"
import Toast from "./Toast.js"

const meta = {
  title: "Status/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: { tone: "ok", children: "Copiado para a área de transferência" },
  argTypes: { tone: { control: "inline-radio", options: ["ok", "danger", "info"] } },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Ok: Story = {}
export const Erro: Story = { args: { tone: "danger", children: "Falha ao salvar" } }
export const Info: Story = { args: { tone: "info", children: "Sincronizando..." } }
