export type ButtonVariant = 'primary' | 'secondary'

const base =
  'inline-block rounded-lg px-5 py-2 font-semibold text-black transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-orange',
  secondary: 'bg-brand-pink',
}

export function buttonClasses(variant: ButtonVariant = 'primary', className = '') {
  return `${base} ${variants[variant]} ${className}`.trim()
}
