import { useParams } from 'react-router-dom'
import ButtonLink from '../components/ButtonLink'
import { buttonClasses } from '../components/buttonStyles'
import GlassCard from '../components/GlassCard'
import ProjectDetailSkeleton from '../features/projects/components/ProjectDetailSkeleton'
import { useProject } from '../features/projects/hooks/useProject'
import { GithubApiError } from '../features/projects/services/githubApi'
import { formatDate } from '../lib/formatDate'
import { safeUrl } from '../lib/safeUrl'
import ApiError from './ApiError'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const { data, isPending, isError, error, refetch } = useProject(slug)

  if (isPending) return <ProjectDetailSkeleton />

  if (isError) {
    if (error instanceof GithubApiError && error.kind === 'not_found') {
      return <NotFound />
    }
    return <ApiError message={error.message} onRetry={() => refetch()} />
  }

  const siteUrl = safeUrl(data.homepage)

  return (
    <GlassCard>
      <h1 className="break-words text-4xl font-bold">{data.name}</h1>
      <p className="mt-3 text-muted">{data.description ?? 'Sem descrição.'}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
        {data.language && (
          <span className="rounded-full bg-brand-pink px-3 py-0.5 font-medium text-black">
            {data.language}
          </span>
        )}
        <span aria-label={`${data.stars} estrelas`}>★ {data.stars}</span>
        <span>
          Atualizado em <time dateTime={data.updatedAt}>{formatDate(data.updatedAt)}</time>
        </span>
      </div>

      {data.topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tópicos">
          {data.topics.map((topic) => (
            <li key={topic} className="rounded-full border border-line px-3 py-0.5 text-sm">
              {topic}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={data.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses('primary')}
        >
          Ver no GitHub<span className="sr-only"> (abre em nova aba)</span>
        </a>
        {siteUrl && (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('secondary')}
          >
            Ver site<span className="sr-only"> (abre em nova aba)</span>
          </a>
        )}
        <ButtonLink to="/" variant="secondary">
          Voltar ao início
        </ButtonLink>
      </div>
    </GlassCard>
  )
}
