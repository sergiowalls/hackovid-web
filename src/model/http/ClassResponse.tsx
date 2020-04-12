import { UserResponse } from './UserResponse'

export interface ClassResponse {
  id: number
  title: string
  teacher: UserResponse
  created_at: string
  learning_unit?: number,
  sections: {
    id: number,
    title: string,
    description: string,
    resources: any[]
  }[]
}
