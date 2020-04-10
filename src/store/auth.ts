import { StoreonModule, StoreonStore } from 'storeon'
import { State } from './state/State'
import { Events } from './event/Events'
import { AuthToken } from '../model/AuthToken'

export const auth: StoreonModule<State, Events> = (store: StoreonStore<State, Events>) => {
  store.on('@init', (state: State): State => {
    const isAuthenticated = localStorage.getItem('authenticated') !== null

    return {
      ...state,
      auth: {
        isAuthenticated
      }
    }
  })

  store.on('auth/authenticate', (state: State, event: AuthToken): State => {
    console.log(event)

    localStorage.setItem('authenticated', 'true')

    return {
      ...state,
      auth: {
        isAuthenticated: true
      }
    }
  })

  store.on('auth/logout', (state: State): State => {
    localStorage.removeItem('authenticated')

    return {
      ...state,
      auth: {
        isAuthenticated: false
      }
    }
  })
}
