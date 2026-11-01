import type { ComponentProps } from 'react'

export default function GlassCard({ className = '', ...props }: ComponentProps<'div'>) {
  return <div className={`glass rounded-2xl border p-6 ${className}`} {...props} />
}
