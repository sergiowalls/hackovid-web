import React, { useState } from 'react'
import { Icon, IconName, Popover } from '@blueprintjs/core'

import './FloatingActionButton.scss'

interface FloatingActionButtonProps {
  icon: IconName
  onClick?: () => void
}

const FloatingActionButton = ({
  icon,
  onClick
}: FloatingActionButtonProps) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  return (
    <div className="floating-action-button__container">
      <Popover isOpen={isOpen}>
        <div
          className="floating-action-button"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={onClick}
        >
          <Icon icon={icon} iconSize={30} />
        </div>
        <div className="floating-action-button__popover">
          Crear classe
        </div>
      </Popover>
    </div>
  )
}

export { FloatingActionButton }
