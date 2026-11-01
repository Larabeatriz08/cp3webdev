import ProjectList from '../features/projects/components/ProjectList'

export default function Home() {
  return (
    <section>
      <h1 className="text-4xl font-bold">Projetos</h1>
      <p className="mt-2 text-muted">Repositórios públicos carregados diretamente do GitHub.</p>
      <div className="mt-8">
        <ProjectList />
      </div>
    </section>
  )
}
