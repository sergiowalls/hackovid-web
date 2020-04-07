import { createStoreon } from 'storeon'

import { auth } from './auth'

const store = createStoreon([auth])

export { store }
