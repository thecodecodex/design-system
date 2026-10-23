import type { Meta, StoryObj } from "@storybook/react-vite"
import Button from "./Button.js"
import Panel, { panelRows } from "./SectionPanel.js"
import StatusTag from "./StatusTag.js"

const meta = {
  title: "Layout/Panel",
  component: Panel,
  tags: ["autodocs"],
  args: { title: "Serviços", count: 3, actions: <Button size="sm">Subir todos</Button> },
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

export const ComLinhas: Story = {
  args: {
    bodyClass: "",
    children: (
      <div className={panelRows}>
        {[["web", "ok", "rodando"], ["api", "warn", "subindo"], ["mobile", "neutral", "parado"]].map(([name, tone, label]) => (
          <div key={name} className="flex items-center justify-between px-5 py-3 text-sm">
            <span>{name}</span>
            <StatusTag tone={tone as "ok"}>{label}</StatusTag>
          </div>
        ))}
      </div>
    ),
  },
}

export const Simples: Story = { args: { count: undefined, actions: undefined, children: <p className="text-sm">Conteúdo do painel.</p> } }
