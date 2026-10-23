import type { Meta, StoryObj } from "@storybook/react-vite"
import StatusTag, { StatusDot, StatusMark, type StatusTone } from "./StatusTag.js"

const TONES: StatusTone[] = ["ok", "warn", "danger", "info", "neutral"]

const meta = {
  title: "Status/StatusTag",
  component: StatusTag,
  tags: ["autodocs"],
  args: { tone: "ok", children: "Rodando" },
  argTypes: { tone: { control: "inline-radio", options: TONES } },
} satisfies Meta<typeof StatusTag>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const Tons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {TONES.map((tone) => <StatusTag key={tone} tone={tone}>{tone}</StatusTag>)}
    </div>
  ),
}

export const MarcasEPontos: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {TONES.map((tone) => <StatusMark key={tone} tone={tone} />)}
      <StatusDot on />
      <StatusDot on={false} />
    </div>
  ),
}
