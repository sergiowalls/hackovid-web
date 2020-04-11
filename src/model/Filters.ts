import { LearningUnit } from './LearningUnit'

interface Course {
  name: string,
  courses: {
    name: string,
    subjects: string[]
  }[]
}

const courses: Course[] = [
  {
    name: 'Primària',
    courses: []
  },
  {
    name: 'Secundària',
    courses: [
      {
        name: '1r ESO',
        subjects: [
          'Matemàtiques',
          'Ciències socials'
        ]
      },
      {
        name: '2n ESO',
        subjects: [
          'Matemàtiques'
        ]
      },
      {
        name: '3r ESO',
        subjects: [
          'Matemàtiques'
        ]
      }
    ]
  }
]

export class Filters {
  constructor(
    public learningUnits?: LearningUnit
  ) {}
}
