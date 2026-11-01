import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses, type ButtonVariant } from './buttonStyles'

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: ButtonVariant }

export default function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />
}
