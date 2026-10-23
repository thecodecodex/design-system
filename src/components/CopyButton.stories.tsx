import type { Meta, StoryObj } from "@storybook/react-vite"
import CopyButton from "./CopyButton.js"

const meta = {
  title: "Ações/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  args: { value: "npm i @thecodecodex/design-system" },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Ink: Story = { args: { variant: "ink", size: "md" } }
export const Desabilitado: Story = { args: { disabled: true } }
