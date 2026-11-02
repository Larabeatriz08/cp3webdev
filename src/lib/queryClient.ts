import { QueryClient } from '@tanstack/react-query'

// Dados do GitHub mudam pouco: ficam "frescos" por 10 minutos, o que evita
// requisições repetidas ao navegar entre páginas (requisito 3.8).
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
})
