import { StoreonModule, StoreonStore } from 'storeon'
import { Alert } from '../model/Alert'
import { State } from './state/State'
import { Events } from './event/Events'

export const alert: StoreonModule<State, Events> = (store: StoreonStore<State, Events>) => {
  store.on('@init', (state) => {
    return {
      ...state,
      alert: {}
    }
  })

  store.on('alert/showAlert', (state: State, alert: Alert): State => {
    return {
      ...state,
      alert: {
        alert
      }
    }
  })
}
