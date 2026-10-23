import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import Button from "./Button.js"

const meta = {
  title: "Ações/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Salvar", onClick: fn() },
  argTypes: { variant: { control: "inline-radio", options: ["ink", "outline", "ghost", "danger"] }, size: { control: "inline-radio", options: ["md", "sm"] } },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Ink: Story = { args: { variant: "ink" } }
export const Outline: Story = { args: { variant: "outline" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Danger: Story = { args: { variant: "danger", children: "Excluir" } }
export const Pequeno: Story = { args: { size: "sm" } }
export const Desabilitado: Story = { args: { disabled: true } }

export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="ink">Ink</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Danger</Button>
    </div>
  ),
}
