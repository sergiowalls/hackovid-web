import { LearningUnit } from './LearningUnit'

export interface INestedMenuEntry {
  name: string,
  subentries?: INestedMenuEntry[]
}

export const courses: INestedMenuEntry[] = [
  {
    name: 'Primària'
  },
  {
    name: 'Secundària',
    subentries: [
      {
        name: '1r ESO',
        subentries: [
          { name: 'Matemàtiques' },
          { name: 'Ciències socials' },
          { name: 'Llengua catalana i literatura' },
          { name: 'Llengua castellana i literatura' },
        ]
      },
      {
        name: '2n ESO',
        subentries: [
          { name: 'Matemàtiques' },
          { name: 'Ciències socials' },
          { name: 'Llengua catalana i literatura' },
          { name: 'Llengua castellana i literatura' },
        ]
      },
      {
        name: '3r ESO',
        subentries: [
          { name: 'Matemàtiques' },
          { name: 'Ciències socials' },
          { name: 'Llengua catalana i literatura' },
          { name: 'Llengua castellana i literatura' },
        ]
      },
      {
        name: '4t ESO',
        subentries: [
          { name: 'Matemàtiques' },
          { name: 'Ciències socials' },
          { name: 'Llengua catalana i literatura' },
          { name: 'Llengua castellana i literatura' },
        ]
      },
    ]
  }
]

export class Filters {
  constructor(
    public learningUnits?: LearningUnit[]
  ) {}
}
