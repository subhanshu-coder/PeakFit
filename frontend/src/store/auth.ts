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
    const saved = JSON.parse(raw)
    if (!saved || typeof saved !== 'object' || typeof saved.token !== 'string' || !saved.user || typeof saved.user.id !== 'string' || typeof saved.user.email !== 'string' || typeof saved.user.name !== 'string') {
      return { token: null, refreshToken: null, user: null }
    }
    return { token: saved.token, refreshToken: typeof saved.refreshToken === 'string' ? saved.refreshToken : null, user: saved.user }
  } catch {
    return { token: null, refreshToken: null, user: null }
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  ...loadInitial(),
  setSession: (token, user, refreshToken = null) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, refreshToken, user }))
    } catch {
      // Keep the current session in memory when browser storage is blocked.
    }
    set({ token, refreshToken, user })
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ token: null, refreshToken: null, user: null })
  },
}))

