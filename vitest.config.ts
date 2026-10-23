import { defineConfig } from "vitest/config"

// Testes ficam ao lado do código (src/**/*.test.ts)
// css: sem ele o Vitest entrega CSS vazio, inclusive no import com ?raw
export default defineConfig({
  test: { include: ["src/**/*.test.ts"], css: true },
})
