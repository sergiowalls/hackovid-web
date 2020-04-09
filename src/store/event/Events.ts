import { Alert } from '../../model/Alert'


export interface LoginPayload {
  username: string,
  password: string
}

export interface AuthEvents {
  'auth/login': LoginPayload
  'auth/logout': undefined
}


export interface AlertEvents {
  'alert/showAlert': Alert
}

export type Events = AuthEvents & AlertEvents
