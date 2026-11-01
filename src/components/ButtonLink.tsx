import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary'

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant }

const variants: Record<Variant, string> = {
  primary: 'bg-brand-orange',
  secondary: 'bg-brand-pink',
}

export default function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-block rounded-lg px-5 py-2 font-semibold text-black transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
