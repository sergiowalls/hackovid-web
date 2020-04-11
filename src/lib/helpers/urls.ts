import { ClassFilters } from '../../model/ClassFilters'

const baseUrl = "http://aula.centralyze.io:1337"

export default {
  login: () => `${baseUrl}/api-token-auth/`,
  register: () => `${baseUrl}/learning/users`,
  class: {
    getByFilter: (filters: ClassFilters) => {
      return `${baseUrl}/learning/classes`
        + (filters.learningUnits ? '?learning-unit=1' : '')
    },
    create: () => `${baseUrl}/learning/classes`,
    getById: (classId: string | null) => `${baseUrl}/learning/classes/${classId}`
  },
  learningUnits: () => `${baseUrl}/learning/learning-units`
}
