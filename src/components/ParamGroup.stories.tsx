import type { Meta, StoryObj } from "@storybook/react-vite"
import NumberField from "./NumberField.js"
import ParamGroup from "./ParamGroup.js"

const meta = {
  title: "Formulário/ParamGroup",
  component: ParamGroup,
  tags: ["autodocs"],
  args: {
    title: "Parâmetros",
    children: <NumberField label="Valor inicial" value={1000} onValue={() => {}} prefix="R$" />,
  },
} satisfies Meta<typeof ParamGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
export const Recolhivel: Story = { args: { collapsible: true } }
