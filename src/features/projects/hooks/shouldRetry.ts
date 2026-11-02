import { GithubApiError } from '../services/githubApi'

// Só vale tentar de novo em falhas de rede ou erros desconhecidos.
// Limite de requisições, usuário inexistente e configuração ausente não se resolvem sozinhos.
export function shouldRetry(failureCount: number, error: Error) {
  const retryable =
    !(error instanceof GithubApiError) || error.kind === 'network' || error.kind === 'unknown'
  return retryable && failureCount < 1
}
