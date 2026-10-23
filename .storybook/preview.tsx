import type { Decorator, Preview } from "@storybook/react-vite"
import { useEffect } from "react"
import { DARK_THEMES, THEMES, type Theme } from "../src/theme/theme.js"
import "./preview.css"

// Aplica o tema escolhido na barra como nos sites: .theme-<nome> (e .dark nos escuros) no <html>
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as Theme
  useEffect(() => {
    const html = document.documentElement
    html.classList.remove(...THEMES.map((t) => `theme-${t}`), "dark")
    html.classList.add(`theme-${theme}`)
    if (DARK_THEMES.has(theme)) html.classList.add("dark")
  }, [theme])
  return <Story />
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Tema",
      toolbar: { title: "Tema", icon: "paintbrush", items: [...THEMES], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "claro" },
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    backgrounds: { disable: true },
  },
}

export default preview
