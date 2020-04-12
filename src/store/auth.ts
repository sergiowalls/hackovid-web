import { StoreonModule, StoreonStore } from 'storeon'
import { State } from './state/State'
import { AuthenticateEvent, Events } from './event/Events'
import { AuthToken } from '../model/AuthToken'

export const auth: StoreonModule<State, Events> = (store: StoreonStore<State, Events>) => {
  store.on('@init', (state: State): State => {
    const authTokenStringValue = localStorage.getItem('authToken')

    const authTokenValue = authTokenStringValue ? JSON.parse(authTokenStringValue) : undefined

    const authToken = authTokenValue ? new AuthToken(authTokenValue.token) : undefined
    const isAuthenticated = authTokenValue !== undefined

    return {
      ...state,
      auth: {
        isAuthenticated,
        authToken
      }
    }
  })

  store.on('auth/authenticate', (state: State, event: AuthenticateEvent): State => {
    console.log(event)

    localStorage.setItem('authToken', JSON.stringify(event))

    return {
      ...state,
      auth: {
        isAuthenticated: true,
        authToken: event.token,
        user: event.user
      }
    }
  })

  store.on('auth/logout', (state: State): State => {
    localStorage.removeItem('authToken')

    return {
      ...state,
      auth: {
        isAuthenticated: false
      }
    }
  })
}
