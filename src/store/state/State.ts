import { Alert } from '../../model/Alert'
import { LearningUnit } from '../../model/LearningUnit'

export interface AlertState {
  alert?: Alert
}

export interface AuthState {
  isAuthenticated: boolean
}

export interface LearningState {
  learningUnits: LearningUnit[]
}

export interface State {
  auth: AuthState
  alert: AlertState
  learning: LearningState
}
