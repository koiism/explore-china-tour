import type { Database } from '~/types/supabase'

export function useSupabase() {
  const client = useSupabaseClient<Database>()
  return client
}
