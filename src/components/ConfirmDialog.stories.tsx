import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Button from "./Button.js"
import ConfirmDialog from "./ConfirmDialog.js"

const meta = {
  title: "Sobreposição/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    title: "Descartar alterações?",
    children: "As mudanças locais em 3 repositórios serão perdidas.",
    confirmLabel: "Descartar",
    onConfirm: () => {},
    onClose: () => {},
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <ConfirmDialog {...args} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} />
      </>
    )
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Perigoso: Story = { args: { danger: true } }
export const Ocupado: Story = { args: { busy: true } }
