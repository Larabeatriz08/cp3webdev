import type { ReactNode } from 'react'

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}

export default function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      <div className="mt-1 flex min-h-5 justify-between gap-2 text-sm">
        <p id={`${id}-error`} aria-live="polite" className="text-danger">
          {error}
        </p>
        {hint && <p className="shrink-0 text-muted">{hint}</p>}
      </div>
    </div>
  )
}
