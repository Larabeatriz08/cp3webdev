import { describe, expect, it } from 'vitest'
import { contactSchema } from './schema'

const valid = {
  name: 'Maria',
  email: 'maria@exemplo.com',
  message: 'Mensagem com mais de vinte caracteres.',
}

function firstMessage(input: unknown) {
  const result = contactSchema.safeParse(input)
  return result.success ? null : result.error.issues[0].message
}

describe('contactSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('remove espaços nas pontas', () => {
    const result = contactSchema.safeParse({ ...valid, name: '  Maria  ' })
    expect(result.success && result.data.name).toBe('Maria')
  })

  it('exige o nome', () => {
    expect(firstMessage({ ...valid, name: '' })).toBe('Informe seu nome.')
    expect(firstMessage({ ...valid, name: '   ' })).toBe('Informe seu nome.')
  })

  it('exige nome com pelo menos 2 caracteres', () => {
    expect(firstMessage({ ...valid, name: 'A' })).toBe('O nome deve ter pelo menos 2 caracteres.')
  })

  it('exige o e-mail', () => {
    expect(firstMessage({ ...valid, email: '' })).toBe('Informe seu e-mail.')
  })

  it('rejeita e-mail inválido', () => {
    expect(firstMessage({ ...valid, email: 'abc' })).toBe('Informe um e-mail válido.')
  })

  it('exige a mensagem', () => {
    expect(firstMessage({ ...valid, message: '' })).toBe('Escreva sua mensagem.')
  })

  it('rejeita mensagem curta e aceita o limite mínimo', () => {
    expect(firstMessage({ ...valid, message: 'curta' })).toBe(
      'A mensagem deve ter pelo menos 20 caracteres.',
    )
    expect(contactSchema.safeParse({ ...valid, message: 'a'.repeat(20) }).success).toBe(true)
  })

  it('rejeita mensagem acima do limite máximo', () => {
    expect(firstMessage({ ...valid, message: 'a'.repeat(2001) })).toBe(
      'A mensagem deve ter no máximo 2000 caracteres.',
    )
  })
})
