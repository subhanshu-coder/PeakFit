import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: User | null
  setSession: (token: string, user: User, refreshToken?: string | null) => void
  logout: () => void
}

const STORAGE_KEY = 'fitforge_session'

function loadInitial(): { token: string | null; refreshToken: string | null; user: User | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, refreshToken: null, user: null }
    return { refreshToken: null, ...JSON.parse(raw) }
  } catch {
    return { token: null, refreshToken: null, user: null }
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  ...loadInitial(),
  setSession: (token, user, refreshToken = null) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, refreshToken, user }))
    set({ token, refreshToken, user })
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ token: null, refreshToken: null, user: null })
  },
}))

