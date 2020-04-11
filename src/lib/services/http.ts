import axios, { AxiosRequestConfig, Method } from 'axios'

import { Try, Success, Failure } from '../helpers/Try'
import { AuthState } from '../../store/state/State'

export class ApiFailure {
  constructor(
    public status: number,
    public message: string
  ) {}
}

const request = <TResponse> (url: string, method: Method, data?: any, auth?: AuthState)
  : Promise<Try<TResponse, ApiFailure>> => {

  return new Promise<Try<TResponse, ApiFailure>>((resolve) => {
    let config: AxiosRequestConfig = {
      url,
      method,
      data
    }

    if (auth && auth.isAuthenticated && auth.authToken) {
      config.headers = {
        Authorization: `Token ${auth.authToken.token}`
      }
    }

    axios.request<TResponse>(config)
      .then(response => {
        resolve(new Success(response.data))
      })
      .catch(error => {
        console.log(error)
        resolve(new Failure(error.message))
      })
  })
}

const get = <TResponse> (url: string, auth?: AuthState)
  : Promise<Try<TResponse, ApiFailure>> => {

  return request(url, 'GET', undefined, auth)
}

const post = <TResponse> (url: string, data?: any, auth?: AuthState)
  : Promise<Try<TResponse, ApiFailure>> => {

  return request(url, 'POST', data, auth)
}


export default { request, get, post }
