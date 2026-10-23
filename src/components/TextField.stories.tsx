import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import TextField from "./TextField.js"

const meta = {
  title: "Formulário/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: { label: "Nome do projeto", value: "Switchyard", onValue: () => {}, placeholder: "Ex.: Acme" },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <TextField {...args} value={value} onValue={setValue} />
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const ComDica: Story = { args: { hint: "Aparece no cabeçalho do painel." } }
export const Invalido: Story = { args: { value: "", invalid: true, hint: "Campo obrigatório." } }
export const Multilinha: Story = { args: { label: "Descrição", multiline: true, value: "Hub local para times com vários repositórios." } }
