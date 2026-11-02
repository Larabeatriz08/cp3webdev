export function safeUrl(value: string | null | undefined): string | null {
  if (!value) return null

  const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`

  try {
    const url = new URL(normalized)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}
