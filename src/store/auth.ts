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
}

export const auth: StoreonModule<AuthState, AuthEvents> = (store: StoreonStore) => {
  store.on('@init', (): AuthState => ({
    isAuthenticated: false,
    error: undefined
  }))

  store.on('login', (state, event): AuthState => {
    return {
      isAuthenticated: true,
      error: undefined
    }
  })
}
