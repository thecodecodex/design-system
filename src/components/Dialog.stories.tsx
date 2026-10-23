import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import Button from "./Button.js"
import Dialog from "./Dialog.js"

const meta = {
  title: "Sobreposição/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: { open: true, onClose: () => {}, title: "Nova conexão", children: <p className="text-sm">Preencha os dados de acesso ao banco.</p> },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={args.footer ?? <Button variant="ink" onClick={() => setOpen(false)}>Salvar</Button>}
        />
      </>
    )
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Largo: Story = { args: { width: "max-w-3xl" } }
export const Travado: Story = { args: { locked: true, title: "Instalando..." } }
