export default function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[40vh] items-center justify-center">
      <span
        className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-brand-orange"
        aria-hidden="true"
      />
      <span className="sr-only">Carregando…</span>
    </div>
  )
}
