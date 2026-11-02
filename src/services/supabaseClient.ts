import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

// Valores de reserva evitam que o site inteiro quebre quando o .env está vazio.
export const supabase = createClient(url ?? 'http://localhost', anonKey ?? 'missing-key')
