import type { Meta, StoryObj } from "@storybook/react-vite"
import Button from "./Button.js"
import PageHeader from "./PageHeader.js"

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  args: {
    eyebrow: "Painel Git",
    title: "Repositórios",
    description: "Status de todos os repositórios do projeto.",
    actions: <Button variant="ink">Atualizar todos</Button>,
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const SoTitulo: Story = { args: { eyebrow: undefined, description: undefined, actions: undefined } }
