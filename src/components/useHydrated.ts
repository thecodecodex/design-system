"use client"

import { useEffect, useState } from "react"

// false no HTML estático e true após a hidratação: valores aleatórios e leitura da URL só acontecem no cliente
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}

// Lê um parâmetro da URL uma única vez, após hidratar
export function readParam(name: string): string | null {
  return typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get(name)
}

// Atualiza (ou remove) parâmetros da URL sem recarregar, para links compartilháveis
export function writeParams(values: Record<string, string | undefined>) {
  const url = new URL(window.location.href)
  Object.entries(values).forEach(([key, value]) => (value ? url.searchParams.set(key, value) : url.searchParams.delete(key)))
  window.history.replaceState(null, "", url)
}
