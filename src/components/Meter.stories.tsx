import type { Meta, StoryObj } from "@storybook/react-vite"
import Meter from "./Meter.js"

const meta = {
  title: "Status/Meter",
  component: Meter,
  tags: ["autodocs"],
  args: { label: "Cobertura de testes", value: 72, target: 80 },
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
} satisfies Meta<typeof Meter>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Ok: Story = { args: { value: 91, tone: "ok" } }
export const Perigo: Story = { args: { value: 34, tone: "danger" } }
