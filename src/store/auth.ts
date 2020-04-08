import { StoreonModule, StoreonStore } from 'storeon'

export interface AuthState {
  isAuthenticated: boolean
  error?: string
}

interface LoginEvent {
  username: string,
  password: string
}

export interface AuthEvents {
  login: LoginEvent
  logout: undefined
}

export const auth: StoreonModule<AuthState, AuthEvents> = (store: StoreonStore) => {
  store.on('@init', (): AuthState => {
    const isAuthenticated = localStorage.getItem('authenticated') !== null

    return {
      isAuthenticated,
      error: undefined
    }
  })

  store.on('login', (): AuthState => {
    localStorage.setItem('authenticated', 'true')

    return {
      isAuthenticated: true,
      error: undefined
    }
  })

  store.on('logout', (): AuthState => {
    localStorage.getItem('authenticated')
    return {
      isAuthenticated: false,
      error: undefined
    }
  })
}
