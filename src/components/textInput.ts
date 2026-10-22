type TextElement = HTMLInputElement | HTMLTextAreaElement

// Dispara a cada tecla em React e em Preact: o React precisa de onChange (input controlado),
// e o Preact sem compat (ou com o jsx-runtime puro) só dispara onChange no blur, então registra também onInput.
// Os dois chamam o mesmo handler com o mesmo valor, o que é idempotente.
export function onTextInput<T extends TextElement>(handler: (value: string) => void) {
  const listener = (event: { currentTarget: T }) => handler(event.currentTarget.value)
  return { onChange: listener, onInput: listener }
}
