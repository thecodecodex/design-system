import type { Meta, StoryObj } from "@storybook/react-vite"
import Disclosure from "./Disclosure.js"

const meta = {
  title: "Layout/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  args: { title: "Como funciona", hint: "2 min", children: <p className="text-sm">O cálculo usa as alíquotas vigentes.</p> },
  argTypes: { tone: { control: "inline-radio", options: ["neutral", "ok", "danger"] } },
} satisfies Meta<typeof Disclosure>

export default meta
type Story = StoryObj<typeof meta>

export const Fechado: Story = {}
export const Aberto: Story = { args: { open: true } }
export const Ok: Story = { args: { tone: "ok", open: true, title: "Verificações passaram" } }
export const Perigo: Story = { args: { tone: "danger", open: true, title: "2 falhas" } }
