import Button from '../../../components/Button'
import GlassCard from '../../../components/GlassCard'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'

const SKELETON_COUNT = 6
const gridClasses = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'

export default function ProjectList() {
  const { data, isPending, isError, error, refetch, isFetching } = useProjects()

  if (isPending) {
    return (
      <>
        <p role="status" className="sr-only">
          Carregando projetos…
        </p>
        <ul className={gridClasses} aria-hidden="true">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <li key={index}>
              <ProjectCardSkeleton />
            </li>
          ))}
        </ul>
      </>
    )
  }

  if (isError) {
    return (
      <GlassCard role="alert" className="py-10 text-center">
        <h2 className="text-2xl font-bold">Não foi possível carregar os projetos</h2>
        <p className="mt-2 text-muted">{error.message}</p>
        <Button className="mt-6" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Tentando…' : 'Tentar novamente'}
        </Button>
      </GlassCard>
    )
  }

  if (data.length === 0) {
    return (
      <GlassCard className="py-10 text-center">
        <h2 className="text-2xl font-bold">Nenhum projeto por aqui ainda</h2>
        <p className="mt-2 text-muted">
          Os repositórios públicos aparecerão aqui assim que existirem.
        </p>
      </GlassCard>
    )
  }

  return (
    <ul className={gridClasses}>
      {data.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}
