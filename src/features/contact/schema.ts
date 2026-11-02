import { z } from 'zod'

export const NAME_MAX = 100
export const EMAIL_MAX = 254
export const MESSAGE_MIN = 20
export const MESSAGE_MAX = 2000

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Informe seu nome.')
    .min(2, 'O nome deve ter pelo menos 2 caracteres.')
    .max(NAME_MAX, `O nome deve ter no máximo ${NAME_MAX} caracteres.`),
  email: z
    .string()
    .trim()
    .min(1, 'Informe seu e-mail.')
    .max(EMAIL_MAX, `O e-mail deve ter no máximo ${EMAIL_MAX} caracteres.`)
    .email('Informe um e-mail válido.'),
  message: z
    .string()
    .trim()
    .min(1, 'Escreva sua mensagem.')
    .min(MESSAGE_MIN, `A mensagem deve ter pelo menos ${MESSAGE_MIN} caracteres.`)
    .max(MESSAGE_MAX, `A mensagem deve ter no máximo ${MESSAGE_MAX} caracteres.`),
})

export type ContactFormValues = z.infer<typeof contactSchema>
