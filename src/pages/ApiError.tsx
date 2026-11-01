import ButtonLink from '../components/ButtonLink'
import GlassCard from '../components/GlassCard'

export default function ApiError() {
  return (
    <GlassCard className="py-12 text-center">
      <h1 className="text-3xl font-bold">Não foi possível carregar os dados</h1>
      <p className="mt-2 text-muted">
        Houve uma falha ao buscar as informações. Tente novamente em alguns instantes.
      </p>
      <ButtonLink to="/" className="mt-6">
        Voltar ao início
      </ButtonLink>
    </GlassCard>
  )
}
