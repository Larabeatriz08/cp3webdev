const base =
  'w-full rounded-lg border bg-surface/60 px-3 py-2 text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange'

export function inputClasses(hasError: boolean) {
  return `${base} ${hasError ? 'border-danger' : 'border-line'}`
}

// Atributos de acessibilidade e estilo comuns a todos os campos.
export function fieldProps(id: string, error?: string) {
  return {
    id,
    className: inputClasses(Boolean(error)),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  }
}
