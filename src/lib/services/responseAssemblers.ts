import { ClassResponse } from '../../model/http/ClassResponse'
import { Class } from '../../model/Class'
import { ClassHeader } from '../../model/ClassHeader'
import { ClassSection } from '../../model/ClassSection'

export const assembleClassFrom = (classResponse: ClassResponse) => {
  return new Class(
    classResponse.id,
    new ClassHeader(
      classResponse.title
    ),
    classResponse.sections.map(section => new ClassSection(
      section.id,
      section.title,
      section.description
    ))
  )
}
