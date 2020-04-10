import { StoreonModule, StoreonStore } from 'storeon'
import { State } from './state/State'
import { Events } from './event/Events'
import { LearningUnit } from '../model/LearningUnit'

export const learning: StoreonModule<State, Events> = (store: StoreonStore<State, Events>) => {
  store.on('@init', (state: State): State => {
    return {
      ...state,
      learning: {
        learningUnits: []
      }
    }
  })

  store.on('learning/updateLearningUnits', (state: State, learningUnits: LearningUnit[]) => {
    return {
      ...state,
      learning: {
        ...state.learning,
        learningUnits
      }
    }
  })
}
