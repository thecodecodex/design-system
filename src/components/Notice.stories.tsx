import type { Meta, StoryObj } from "@storybook/react-vite"
import Notice from "./Notice.js"

const meta = {
  title: "Status/Notice",
  component: Notice,
  tags: ["autodocs"],
  args: { tone: "info", title: "Atualização disponível", children: "Rode syd update para instalar a versão nova." },
  argTypes: { tone: { control: "inline-radio", options: ["ok", "warn", "danger", "info"] } },
} satisfies Meta<typeof Notice>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}
export const Ok: Story = { args: { tone: "ok", title: "Tudo certo", children: "Ambiente configurado." } }
export const Atencao: Story = { args: { tone: "warn", title: "Atenção", children: "O token expira em 3 dias." } }
export const Erro: Story = { args: { tone: "danger", title: "Falha", children: "Não foi possível conectar ao banco.", role: "alert" } }
