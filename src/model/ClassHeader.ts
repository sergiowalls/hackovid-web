import { Moment } from 'moment'

import { User } from './User'

class ClassHeader {
  constructor(
    public title: string,
    public createdAt: Moment,
    public teacher: User
  ) {}
}

export { ClassHeader }
