import { Alert } from '../../model/Alert'
import { LearningUnit } from '../../model/LearningUnit'
import { AuthToken } from '../../model/AuthToken'
import { User } from '../../model/User'

export interface AlertState {
  alert?: Alert
}

export interface AuthState {
  isAuthenticated: boolean
  authToken?: AuthToken
  user?: User
}

export interface LearningState {
  learningUnits: LearningUnit[]
}

export interface State {
  auth: AuthState
  alert: AlertState
  learning: LearningState
}
