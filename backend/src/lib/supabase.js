import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const url = process.env.SUPABASE_URL
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY

export function assertSupabaseConfig() {
  if (!url || !publishableKey) {
    throw new Error('SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be configured')
  }
}

function createSupabaseClient(accessToken) {
  assertSupabaseConfig()
  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    ...(accessToken
      ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
      : {}),
  })
}

export function createPublicClient() {
  return createSupabaseClient()
}

export function createUserClient(accessToken) {
  return createSupabaseClient(accessToken)
}

export function getSupabaseError(error) {
  return error?.message || 'Database request failed'
}

