import { ClassHeader } from './ClassHeader'
import { ClassSection } from './ClassSection'

enum ClassViewType {
  Editable,
  Saveable,
  Viewable
}

class Class {
  constructor(
    public id: number,
    public header: ClassHeader,
    public sections: ClassSection[]
  ) {}

  static instantiateNew = () => {
    return new Class(
      0,
      new ClassHeader(''),
      [new ClassSection(0, '', '')]
    )
  }
}

export { Class, ClassViewType }
