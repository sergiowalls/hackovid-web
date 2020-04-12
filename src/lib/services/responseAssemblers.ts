import { ClassResponse } from '../../model/http/ClassResponse'
import { Class } from '../../model/Class'
import { ClassHeader } from '../../model/ClassHeader'
import { ClassSection } from '../../model/ClassSection'
import moment from 'moment'
import { UserResponse } from '../../model/http/UserResponse'
import { User } from '../../model/User'
import { LearningUnit } from '../../model/LearningUnit'

export const assembleUser = (userResponse: UserResponse): User => {
  return new User(
    userResponse.id,
    userResponse.username,
    userResponse.institution,
    userResponse.first_name
  )
}

export const assembleClassFrom = (classResponse: ClassResponse, learningUnits: LearningUnit[]) => {
  return new Class(
    classResponse.id,
    learningUnits.filter(learningUnit => classResponse.learning_unit === learningUnit.id)[0],
    new ClassHeader(
      classResponse.title,
      moment(classResponse.created_at),
      assembleUser(classResponse.teacher)
    ),
    classResponse.sections.map(section => new ClassSection(
      section.id,
      section.title,
      section.description
    ))
  )
}
