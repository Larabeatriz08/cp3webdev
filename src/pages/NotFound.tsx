import ButtonLink from '../components/ButtonLink'
import GlassCard from '../components/GlassCard'

export default function NotFound() {
  return (
    <GlassCard className="py-12 text-center">
      <p className="text-6xl font-bold text-brand-orange">404</p>
      <h1 className="mt-4 text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-muted">O endereço que você acessou não existe ou foi removido.</p>
      <ButtonLink to="/" className="mt-6">
        Voltar ao início
      </ButtonLink>
    </GlassCard>
  )
}
