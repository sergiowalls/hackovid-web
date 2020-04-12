import { Filters } from '../../model/Filters'

const baseUrl = "http://aula.centralyze.io:1337"

export default {
  login: () => `${baseUrl}/api-token-auth/`,
  register: () => `${baseUrl}/learning/users`,
  class: {
    getByFilter: (filters: Filters) => {
      return `${baseUrl}/learning/classes`
        + (filters.learningUnits ? '?learning-unit=1' : '')
    },
    create: () => `${baseUrl}/learning/classes`,
    getById: (classId: string | null) => `${baseUrl}/learning/classes/${classId}`
  },
  learningUnits: () => `${baseUrl}/learning/learning-units`,
  savedSections: {
    save: (id: number)=> `${baseUrl}/learning/users/me/saved-sections/${id}/`,
    get: ()=> `${baseUrl}/learning/users/me/saved-sections/`,
  }
}
