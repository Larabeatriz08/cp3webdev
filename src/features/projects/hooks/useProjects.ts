import { useQuery } from '@tanstack/react-query'
import { GITHUB_USERNAME } from '../../../lib/config'
import { fetchProjects, GithubApiError } from '../../../services/githubApi'

// Só vale tentar de novo em falhas de rede ou erros desconhecidos.
// Limite de requisições, usuário inexistente e configuração ausente não se resolvem sozinhos.
function shouldRetry(failureCount: number, error: Error) {
  const retryable =
    !(error instanceof GithubApiError) || error.kind === 'network' || error.kind === 'unknown'
  return retryable && failureCount < 1
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects', GITHUB_USERNAME],
    queryFn: () => {
      if (!GITHUB_USERNAME) {
        throw new GithubApiError('config', 'Usuário do GitHub não configurado.')
      }
      return fetchProjects(GITHUB_USERNAME)
    },
    retry: shouldRetry,
  })
}
