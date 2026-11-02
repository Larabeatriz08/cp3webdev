import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Sem "globals", a limpeza entre testes precisa ser registrada manualmente.
afterEach(() => {
  cleanup()
})
