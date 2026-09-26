import axios from 'axios'
import { useAuthStore } from '@/store/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

let refreshInFlight: Promise<{ token: string; refreshToken: string; user: { id: string; name: string; email: string } }> | null = null

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined
    const auth = useAuthStore.getState()
    if (error?.response?.status !== 401 || !original || original._retry || !auth.refreshToken || original.url?.includes('/auth/refresh')) {
      if (error?.response?.status === 401) auth.logout()
      return Promise.reject(error)
    }

    original._retry = true
    try {
      refreshInFlight ??= axios
        .post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken: auth.refreshToken })
        .then(({ data }) => data)
      const session = await refreshInFlight
      useAuthStore.getState().setSession(session.token, session.user, session.refreshToken)
      original.headers = original.headers ?? {}
      original.headers.Authorization = `Bearer ${session.token}`
      return api.request(original)
    } catch (refreshError) {
      useAuthStore.getState().logout()
      return Promise.reject(refreshError)
    } finally {
      refreshInFlight = null
    }
  }
)

