import { LearningUnit } from './LearningUnit'

export interface INestedMenuEntry {
  name: string,
  subentries?: INestedMenuEntry[]
}

export const courses: INestedMenuEntry[] = [
  {
    name: 'Primària',
    subentries: []
  },
  {
    name: 'Secundària',
    subentries: [
      {
        name: '1r ESO',
        subentries: [
          { name: 'Matemàtiques' },
          { name: 'Ciències socials' }
        ]
      },
      {
        name: '2n ESO',
        subentries: [
          { name: 'Matemàtiques' }
        ]
      },
      {
        name: '3r ESO',
        subentries: [
          { name: 'Matemàtiques' }
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
