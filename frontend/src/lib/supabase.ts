import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bbgawjqixbzhezlavwwo.supabase.co'
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_dBDf8bSaevrpWdiToYdBlQ_OQa3BT1X'

// This is a publishable browser key. Supabase access is still constrained by
// the database's row-level security policies.
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: false,
    persistSession: true,
    autoRefreshToken: false,
  },
})
