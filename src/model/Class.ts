import moment from 'moment'

import { ClassHeader } from './ClassHeader'
import { ClassSection } from './ClassSection'
import { User } from './User'
import { LearningUnit } from './LearningUnit'

enum ClassViewType {
  Editable,
  Saveable,
  Viewable
}

class Class {
  constructor(
    public id: number,
    public learningUnit: LearningUnit,
    public header: ClassHeader,
    public sections: ClassSection[]
  ) {}

  static instantiateNew = (user: User, learningUnit: LearningUnit) => {
    return new Class(
      0,
      learningUnit,
      new ClassHeader('', moment(), user),
      [new ClassSection(0, '', '')]
    )
  }
}

export { Class, ClassViewType }
