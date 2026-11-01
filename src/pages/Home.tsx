import GlassCard from '../components/GlassCard'
import { useProjects } from '../features/projects/hooks/useProjects'

export default function Home() {
  const { data, isPending, isError, error } = useProjects()

  return (
    <GlassCard>
      <h1 className="text-4xl font-bold">Página inicial</h1>

      {isPending && <p className="mt-4 text-muted">Carregando projetos…</p>}
      {isError && <p className="mt-4">{error.message}</p>}
      {data && data.length === 0 && <p className="mt-4 text-muted">Nenhum projeto encontrado.</p>}
      {data && data.length > 0 && (
        <ul className="mt-4 list-disc pl-5">
          {data.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
    </GlassCard>
  )
}
