import type { Meta, StoryObj } from "@storybook/react-vite"
import AppShell from "./AppShell.js"
import PageHeader from "./PageHeader.js"

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    brand: <strong>Switchyard</strong>,
    currentPath: "/git",
    nav: [
      { title: "Projeto", items: [{ href: "/", label: "Início" }, { href: "/git", label: "Git" }, { href: "/boards", label: "Boards" }] },
      { title: "Ferramentas", items: [{ href: "/tests", label: "Testes E2E" }, { href: "/logs", label: "Logs" }] },
    ],
    renderLink: ({ children, ...props }) => <a {...props} href="#" onClick={(e) => e.preventDefault()}>{children}</a>,
    children: <PageHeader title="Git" description="Status dos repositórios." />,
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Recolhido: Story = { args: { defaultCollapsed: true } }
