import { Alert } from '../../model/Alert'
import { AuthToken } from '../../model/AuthToken'
import { LearningUnit } from '../../model/LearningUnit'

export interface AuthEvents {
  'auth/authenticate': AuthToken
  'auth/logout': undefined
}


export interface AlertEvents {
  'alert/showAlert': Alert
}

export interface LearningEvents {
  'learning/updateLearningUnits': LearningUnit[]
}

export type Events = AuthEvents & AlertEvents & LearningEvents
