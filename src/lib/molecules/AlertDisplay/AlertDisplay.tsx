import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import { IconName, Intent, Position, Toaster } from '@blueprintjs/core'

import { AlertType } from '../../../model/Alert'
import { State } from '../../../store/state/State'
import { Events } from '../../../store/event/Events'

const alertTypeToIntent = (alertType: AlertType) => {
  switch (alertType) {
    case 'error':
      return Intent.DANGER
    case 'success':
      return Intent.SUCCESS
    default:
      return Intent.NONE
  }
}

const alertTypeToIcon = (alertType: AlertType): IconName | null => {
  switch (alertType) {
    case 'error':
      return 'warning-sign'
    case 'success':
      return 'tick'
    default:
      return null
  }
}

const AlertDisplay = () => {
  const { alert: { alert } } = useStoreon<State, Events>('alert')

  let toaster: Toaster

  useEffect(() => {
    if (toaster && alert) {
      toaster.show({
        message: alert!!.message,
        icon: alertTypeToIcon(alert!!.type),
        intent: alertTypeToIntent(alert!!.type),
        timeout: 5000
      })
    }
  }, [alert])

  return (
    <Toaster position={Position.TOP} ref={(ref: Toaster) => toaster = ref} />
  )
}

export { AlertDisplay }
