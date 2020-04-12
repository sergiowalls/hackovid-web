import { LearningUnit } from '../../model/LearningUnit'

const baseUrl = "http://aula.centralyze.io:1337"

export default {
  user: {
    me: () => `${baseUrl}/learning/users/me`
  },
  login: () => `${baseUrl}/api-token-auth/`,
  register: () => `${baseUrl}/learning/users`,
  class: {
    getByLearningUnit: (learningUnit: LearningUnit) => {
      return `${baseUrl}/learning/classes`
        + `?learning-unit=${learningUnit.id}`
    },
    getAll: () => {
      return `${baseUrl}/learning/classes`
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
