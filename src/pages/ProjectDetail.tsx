import { useParams } from 'react-router-dom'
import ButtonLink from '../components/ButtonLink'
import GlassCard from '../components/GlassCard'

export default function ProjectDetail() {
  const { slug } = useParams()

  return (
    <GlassCard>
      <h1 className="text-4xl font-bold">Projeto: {slug}</h1>
      <p className="mt-2 text-muted">Os dados do repositório serão carregados da API do GitHub.</p>
      <ButtonLink to="/" variant="secondary" className="mt-6">
        Voltar ao início
      </ButtonLink>
    </GlassCard>
  )
}
