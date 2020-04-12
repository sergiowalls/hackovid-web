import React from 'react'

import './Checkbox.scss'
import { Icon, IconName } from '@blueprintjs/core'

export enum CheckedState {
  Checked,
  Half,
  Unchecked
}

interface CheckboxProps {
  checked: CheckedState
  onClick?: () => void
  label?: string
  className?: string
}


const Checkbox = ({
  checked,
  onClick,
  label,
  className
}: CheckboxProps) => {
  const getIcon = (): IconName | null => {
    switch (checked) {
      case CheckedState.Checked:
        return "tick"
      case CheckedState.Half:
        return "minus"
      case CheckedState.Unchecked:
      default:
        return null
    }
  }

  const icon = getIcon()

  return (
    <div className={`checkbox ${className}`} onClick={onClick}>
      <div className={`checkbox__icon ${ checked !== CheckedState.Unchecked ? 'checked' : ''}`}>
        {icon &&
          <Icon icon={icon} iconSize={10}/>
        }
      </div>
      <div className="checkbox__label">{label}</div>
    </div>
  )
}

export { Checkbox }
