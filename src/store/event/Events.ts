import { Alert } from '../../model/Alert'
import { AuthToken } from '../../model/AuthToken'
import { LearningUnit } from '../../model/LearningUnit'
import { User } from '../../model/User'

export interface AuthenticateEvent {
  token: AuthToken
  user: User
}

export interface AuthEvents {
  'auth/authenticate': AuthenticateEvent
  'auth/logout': undefined
}


export interface AlertEvents {
  'alert/showAlert': Alert
}

export interface LearningEvents {
  'learning/updateLearningUnits': LearningUnit[]
}

export type Events = AuthEvents & AlertEvents & LearningEvents
