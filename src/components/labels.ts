// Textos fixos dos componentes. Padrão em pt-BR; sites multilíngues passam `labels` traduzidos.
export interface CopyLabels {
  copy: string
  copied: string
}

export interface OutputListLabels extends CopyLabels {
  copyAll: string
  result: string
}

export interface ToolShellLabels {
  shareHint: string
  copyLink: string
  linkCopied: string
  params: string
  how: string
  howCode: string
  private: string
}

export const copyLabels: CopyLabels = { copy: "Copiar", copied: "Copiado!" }

export const outputListLabels: OutputListLabels = { ...copyLabels, copyAll: "Copiar todos", result: "Resultado" }

export const toolShellLabels: ToolShellLabels = {
  shareHint: "O link guarda o que está na tela.",
  copyLink: "Copiar link com valores",
  linkCopied: "Link copiado!",
  params: "Parâmetros",
  how: "Como é calculado?",
  howCode: "Ver o código ↗",
  private: "Processado no seu navegador; nada é enviado.",
}
