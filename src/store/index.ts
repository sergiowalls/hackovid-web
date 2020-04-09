import { createStoreon } from 'storeon'

import { auth } from './auth'
import { alert } from './alert'

const store = createStoreon([auth, alert])

export { store }
