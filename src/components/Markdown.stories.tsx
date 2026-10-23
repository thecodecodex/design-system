import type { Meta, StoryObj } from "@storybook/react-vite"
import Markdown from "./Markdown.js"

const meta = {
  title: "Conteúdo/Markdown",
  component: Markdown,
  tags: ["autodocs"],
  args: {
    source: "# Título\n\nTexto com **negrito**, `código` e um [link](https://thecodecodex.com).\n\n- item um\n- item dois\n\n```bash\nsyd diag\n```",
  },
} satisfies Meta<typeof Markdown>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}
