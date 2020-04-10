import { createStoreon } from 'storeon'

import { auth } from './auth'
import { alert } from './alert'
import { learning } from './learning'

const store = createStoreon([auth, alert, learning])

export { store }
