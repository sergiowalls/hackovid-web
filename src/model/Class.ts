import { ClassHeader } from './ClassHeader'
import { ClassSection } from './ClassSection'

class Class {
  constructor(
    public header: ClassHeader,
    public sections: ClassSection[]
  ) {}

  static instantiateNew = () => {
    return new Class(
      new ClassHeader('', []),
      [new ClassSection(0, '', '')]
    )
  }
}

export { Class }
