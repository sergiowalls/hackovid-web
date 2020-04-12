import { StoreonModule, StoreonStore } from 'storeon'
import { State } from './state/State'
import { AuthenticateEvent, Events } from './event/Events'
import { AuthToken } from '../model/AuthToken'
import { User } from '../model/User'

export const auth: StoreonModule<State, Events> = (store: StoreonStore<State, Events>) => {
  store.on('@init', (state: State): State => {

    const authTokenStringValue = localStorage.getItem('authToken')
    const authTokenValue = authTokenStringValue ? JSON.parse(authTokenStringValue) : undefined

    const userStringValue = localStorage.getItem('user')
    const userValue = userStringValue ? JSON.parse(userStringValue) : undefined

    const user = userValue ? new User(userValue.id, userValue.username, userValue.institution, userValue.name) : undefined
    const authToken = authTokenValue ? new AuthToken(authTokenValue.token) : undefined
    const isAuthenticated = authTokenValue !== undefined

    return {
      ...state,
      auth: {
        isAuthenticated,
        authToken,
        user
      }
    }
  })

  store.on('auth/authenticate', (state: State, event: AuthenticateEvent): State => {
    console.log(event)

    localStorage.setItem('authToken', JSON.stringify(event.token))
    localStorage.setItem('user', JSON.stringify(event.user))

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
    localStorage.removeItem('user')

    return {
      ...state,
      auth: {
        isAuthenticated: false
      }
    }
  })
}
