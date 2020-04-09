import { Alert } from '../../model/Alert'

export interface AlertState {
  alert?: Alert
}

export interface AuthState {
  isAuthenticated: boolean
  error?: string
}

export interface State {
  auth: AuthState
  alert: AlertState
}
