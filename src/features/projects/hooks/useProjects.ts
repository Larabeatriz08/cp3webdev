import { useQuery } from '@tanstack/react-query'
import { GITHUB_USERNAME } from '../../../lib/config'
import { fetchProjects, GithubApiError } from '../services/githubApi'
import { shouldRetry } from './shouldRetry'

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
