import globals from "globals"
import tseslint from "typescript-eslint"
import stylistic from "@stylistic/eslint-plugin"

export default [
  { ignores: ["node_modules/", "dist/", "storybook-static/", ".wrangler/"] },
  { files: ["**/*.{js,mjs,ts,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { plugins: { "@stylistic": stylistic } },
  {
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/semi": ["error", "never"],
    },
  },
  ...tseslint.configs.recommended,
]
