import { Alert } from '../../model/Alert'
import { AuthToken } from '../../model/AuthToken'

export interface AuthEvents {
  'auth/authenticate': AuthToken
  'auth/logout': undefined
}


export interface AlertEvents {
  'alert/showAlert': Alert
}

export type Events = AuthEvents & AlertEvents
