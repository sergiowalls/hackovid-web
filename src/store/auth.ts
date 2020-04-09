import { StoreonModule, StoreonStore } from 'storeon'
import { State } from './state/State'
import { Events, LoginPayload } from './event/Events'

export const auth: StoreonModule<State, Events> = (store: StoreonStore<State, Events>) => {
  store.on('@init', (state: State): State => {
    const isAuthenticated = localStorage.getItem('authenticated') !== null

    return {
      ...state,
      auth: {
        isAuthenticated,
        error: undefined
      }
    }
  })

  store.on('auth/login', (state: State, event: LoginPayload): State => {
    localStorage.setItem('authenticated', 'true')

    return {
      ...state,
      auth: {
        isAuthenticated: true,
        error: undefined
      }
    }
  })

  store.on('auth/logout', (state: State): State => {
    localStorage.removeItem('authenticated')

    return {
      ...state,
      auth: {
        isAuthenticated: false,
        error: undefined
      }
    }
  })
}
