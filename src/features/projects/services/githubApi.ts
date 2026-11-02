import type { Project } from '../../../types/project'

const API_URL = 'https://api.github.com'

export type GithubErrorKind = 'config' | 'network' | 'not_found' | 'rate_limit' | 'unknown'

export class GithubApiError extends Error {
  kind: GithubErrorKind

  constructor(kind: GithubErrorKind, message: string) {
    super(message)
    this.name = 'GithubApiError'
    this.kind = kind
  }
}

interface GithubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  updated_at: string
  html_url: string
  homepage: string | null
  topics?: string[]
  stargazers_count: number
  fork: boolean
  archived: boolean
}

function toProject(repo: GithubRepo): Project {
  return {
    id: repo.id,
    name: repo.name,
    slug: repo.name,
    description: repo.description,
    language: repo.language,
    updatedAt: repo.updated_at,
    htmlUrl: repo.html_url,
    homepage: repo.homepage || null,
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
  }
}

async function request(path: string): Promise<Response> {
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
  } catch {
    throw new GithubApiError('network', 'Não foi possível conectar ao GitHub.')
  }

  if (response.ok) return response

  const rateLimited =
    response.status === 429 ||
    (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0')

  if (rateLimited) {
    throw new GithubApiError(
      'rate_limit',
      'O limite de requisições do GitHub foi atingido. Tente novamente mais tarde.',
    )
  }

  if (response.status === 404) {
    throw new GithubApiError('not_found', 'Usuário ou repositório não encontrado.')
  }

  throw new GithubApiError('unknown', 'Erro inesperado ao consultar o GitHub.')
}

export async function fetchProjects(username: string): Promise<Project[]> {
  const response = await request(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
  )
  const repos: GithubRepo[] = await response.json()

  return repos.filter((repo) => !repo.fork && !repo.archived).map(toProject)
}

export async function fetchProject(username: string, slug: string): Promise<Project> {
  const response = await request(
    `/repos/${encodeURIComponent(username)}/${encodeURIComponent(slug)}`,
  )
  const repo: GithubRepo = await response.json()

  return toProject(repo)
}
