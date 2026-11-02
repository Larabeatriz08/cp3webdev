import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'
import GlassCard from '../components/GlassCard'

interface ApiErrorProps {
  message?: string
  onRetry?: () => void
}

export default function ApiError({ message, onRetry }: ApiErrorProps) {
  return (
    <GlassCard role="alert" className="py-12 text-center">
      <h1 className="text-3xl font-bold">Não foi possível carregar os dados</h1>
      <p className="mt-2 text-muted">
        {message ??
          'Houve uma falha ao buscar as informações. Tente novamente em alguns instantes.'}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
        <ButtonLink to="/" variant="secondary">
          Voltar ao início
        </ButtonLink>
      </div>
    </GlassCard>
  )
}
