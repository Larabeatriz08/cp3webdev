import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GITHUB_USERNAME } from '../../../lib/config'
import type { Project } from '../../../types/project'
import { fetchProject, GithubApiError } from '../services/githubApi'
import { shouldRetry } from './shouldRetry'

export function useProject(slug: string) {
  const queryClient = useQueryClient()
  const listKey = ['projects', GITHUB_USERNAME]

  return useQuery({
    queryKey: ['project', GITHUB_USERNAME, slug],
    queryFn: () => {
      if (!GITHUB_USERNAME) {
        throw new GithubApiError('config', 'Usuário do GitHub não configurado.')
      }
      return fetchProject(GITHUB_USERNAME, slug)
    },
    // Reaproveita o que a lista já buscou: abrir um card não faz nova requisição.
    initialData: () =>
      queryClient.getQueryData<Project[]>(listKey)?.find((project) => project.slug === slug),
    initialDataUpdatedAt: () => queryClient.getQueryState(listKey)?.dataUpdatedAt,
    retry: shouldRetry,
  })
}
