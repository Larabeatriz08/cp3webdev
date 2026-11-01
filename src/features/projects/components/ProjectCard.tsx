import { Link } from 'react-router-dom'
import GlassCard from '../../../components/GlassCard'
import { formatDate } from '../../../lib/formatDate'
import type { Project } from '../../../types/project'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard className="relative flex h-56 flex-col transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-orange hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <h2 className="truncate text-lg font-bold">
        <Link
          to={`/projetos/${encodeURIComponent(project.slug)}`}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {project.name}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
        {project.description ?? 'Sem descrição.'}
      </p>
      <div className="mt-auto flex items-center justify-between gap-2 text-sm text-muted">
        {project.language ? (
          <span className="rounded-full bg-brand-pink px-3 py-0.5 font-medium text-black">
            {project.language}
          </span>
        ) : (
          <span />
        )}
        <time dateTime={project.updatedAt}>{formatDate(project.updatedAt)}</time>
      </div>
    </GlassCard>
  )
}
