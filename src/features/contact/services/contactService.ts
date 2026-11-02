import emailjs from '@emailjs/browser'
import { isSupabaseConfigured, supabase } from '../../../services/supabaseClient'
import type { ContactFormValues } from '../schema'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

export async function sendContactMessage(values: ContactFormValues): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase não configurado.')
  }

  // 1. Salva no banco primeiro: a mensagem nunca se perde.
  const { error } = await supabase.from('messages').insert({
    name: values.name,
    email: values.email,
    message: values.message,
  })
  if (error) {
    throw new Error('Não foi possível salvar a mensagem.')
  }

  // 2. Avisa por e-mail. Se falhar, a mensagem já está salva no dashboard.
  if (serviceId && templateId && publicKey) {
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { name: values.name, email: values.email, message: values.message },
        { publicKey },
      )
    } catch {
      // Falha no e-mail não invalida o envio.
    }
  }
}
