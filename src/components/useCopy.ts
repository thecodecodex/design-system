"use client"

import { useState } from "react"

// Copia para a área de transferência e mantém o estado "copiado" por alguns segundos
export function useCopy(timeout = 1500) {
  const [copied, setCopied] = useState<string | undefined>(undefined)
  const copy = async (value: string, id = value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(id)
      window.setTimeout(() => setCopied((current) => (current === id ? undefined : current)), timeout)
    } catch {
      // sem permissão de clipboard: o usuário ainda pode selecionar o texto
    }
  }
  return { copied, copy }
}
