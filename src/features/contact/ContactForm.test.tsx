import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm'

const validMessage = 'Olá! Gostaria de conversar sobre uma oportunidade.'

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Nome'), 'Maria')
  await user.type(screen.getByLabelText('E-mail'), 'maria@exemplo.com')
  await user.type(screen.getByLabelText('Mensagem'), validMessage)
}

describe('ContactForm', () => {
  it('mostra uma mensagem específica por campo e não envia com campos vazios', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ContactForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByText('Informe seu nome.')).toBeInTheDocument()
    expect(screen.getByText('Informe seu e-mail.')).toBeInTheDocument()
    expect(screen.getByText('Escreva sua mensagem.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejeita e-mail inválido', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ContactForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Nome'), 'Maria')
    await user.type(screen.getByLabelText('E-mail'), 'abc')
    await user.type(screen.getByLabelText('Mensagem'), validMessage)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejeita mensagem curta', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ContactForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Nome'), 'Maria')
    await user.type(screen.getByLabelText('E-mail'), 'maria@exemplo.com')
    await user.type(screen.getByLabelText('Mensagem'), 'curta')
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(
      await screen.findByText('A mensagem deve ter pelo menos 20 caracteres.'),
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('bloqueia o botão enquanto envia', async () => {
    const user = userEvent.setup()
    let finish: () => void = () => {}
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve
        }),
    )
    render(<ContactForm onSubmit={onSubmit} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByRole('button', { name: /enviando/i })).toBeDisabled()

    finish()

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Enviar mensagem' })).toBeEnabled(),
    )
  })

  it('envia os dados e mostra a confirmação', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<ContactForm onSubmit={onSubmit} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByRole('status')).toHaveTextContent('Mensagem enviada com sucesso')
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Maria',
      email: 'maria@exemplo.com',
      message: validMessage,
    })
  })

  it('mostra erro quando o envio falha', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn().mockRejectedValue(new Error('falha'))
    render(<ContactForm onSubmit={onSubmit} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível enviar')
  })
})
