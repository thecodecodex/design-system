// Importação de arquivos como texto (Vite/Vitest), usada nos testes dos CSS
declare module "*?raw" {
  const content: string
  export default content
}
