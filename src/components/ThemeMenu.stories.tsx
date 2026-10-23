import type { Meta, StoryObj } from "@storybook/react-vite"
import ThemeMenu from "./ThemeMenu.js"

const meta = {
  title: "Navegação/ThemeMenu",
  component: ThemeMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered", docs: { description: { component: "Seletor de tema dos sites. No Storybook, prefira a barra \"Tema\" no topo." } } },
} satisfies Meta<typeof ThemeMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
