import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { fieldProps } from '../../components/fieldStyles'
import Spinner from '../../components/Spinner'
import { contactSchema, MESSAGE_MAX, type ContactFormValues } from './schema'

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => Promise<void>
}

type Status = 'idle' | 'success' | 'error'

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '' },
  })

  const messageLength = useWatch({ control, name: 'message' }).length

  const submit = handleSubmit(async (values) => {
    setStatus('idle')
    try {
      await onSubmit(values)
      reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  })

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field id="name" label="Nome" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          {...fieldProps('name', errors.name?.message)}
          {...register('name')}
        />
      </Field>

      <Field id="email" label="E-mail" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          {...fieldProps('email', errors.email?.message)}
          {...register('email')}
        />
      </Field>

      <Field
        id="message"
        label="Mensagem"
        error={errors.message?.message}
        hint={`${messageLength}/${MESSAGE_MAX}`}
      >
        <textarea
          rows={5}
          {...fieldProps('message', errors.message?.message)}
          {...register('message')}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Spinner className="mr-2 align-[-2px]" />}
        {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
      </Button>

      {status === 'success' && (
        <p role="status" className="rounded-lg border border-line bg-surface/60 p-3">
          Mensagem enviada com sucesso. Obrigado pelo contato!
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-danger p-3 text-danger">
          Não foi possível enviar a mensagem. Tente novamente em instantes.
        </p>
      )}
    </form>
  )
}
