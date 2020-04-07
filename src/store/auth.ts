import { StoreonModule, StoreonStore } from 'storeon'

export interface AuthState {
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
    error: undefined
  }))

  store.on('login', (state, event): AuthState => {
    return { error: 'Error calling API for login' }
  })
}
