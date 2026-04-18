import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/secrets'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Supabase credentials are not set. Please check secrets.ts or environment variables.')
  // En production, pour lancer une erreur ou désactiver la fonctionnalité
  // throw new Error('Supabase credentials missing');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)