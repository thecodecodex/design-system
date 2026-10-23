import type { Meta, StoryObj } from "@storybook/react-vite"
import Button from "./Button.js"
import Popover, { MenuItem } from "./Popover.js"

const meta = {
  title: "Sobreposição/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: {
    trigger: "Ações",
    triggerLabel: "Ações do repositório",
    panelLabel: "Ações do repositório",
    align: "left",
    children: (close) => (
      <div className="flex flex-col gap-3 p-4">
        <p className="text-sm text-text-secondary">Atualizar todos os repositórios a partir da origem.</p>
        <Button variant="ink" size="sm" onClick={close}>Atualizar</Button>
      </div>
    ),
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Dialogo: Story = {}
export const Menu: Story = {
  args: {
    role: "menu",
    width: "w-[220px]",
    children: (close) => (
      <>
        <MenuItem onSelect={close}>Abrir no editor</MenuItem>
        <MenuItem onSelect={close}>Copiar caminho</MenuItem>
        <MenuItem onSelect={close} danger>Remover</MenuItem>
      </>
    ),
  },
}
