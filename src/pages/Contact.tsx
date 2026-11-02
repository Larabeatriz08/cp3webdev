import GlassCard from '../components/GlassCard'
import ContactForm from '../features/contact/ContactForm'
import { sendContactMessage } from '../features/contact/services/contactService'

export default function Contact() {
  return (
    <section>
      <h1 className="text-4xl font-bold">Contato</h1>
      <p className="mt-2 text-muted">Preencha o formulário para enviar uma mensagem.</p>
      <GlassCard className="mt-8 max-w-xl">
        <ContactForm onSubmit={sendContactMessage} />
      </GlassCard>
    </section>
  )
}
