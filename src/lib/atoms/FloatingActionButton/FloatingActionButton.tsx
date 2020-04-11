import React, { useState } from 'react'
import { Icon, IconName, Popover } from '@blueprintjs/core'

import './FloatingActionButton.scss'

interface FloatingActionButtonProps {
  icon: IconName
  onClick?: () => void
  popoverText?: string
}

const FloatingActionButton = ({
  icon,
  onClick,
  popoverText
}: FloatingActionButtonProps) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  return (
    <div className="floating-action-button__container">
      <div className="floating-action-button__fixed">
        <Popover isOpen={isOpen}>
          <div
            className="floating-action-button"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={onClick}
          >
            <Icon icon={icon} iconSize={25} />
          </div>
          {popoverText &&
            <div className="floating-action-button__popover">
              {popoverText}
            </div>
          }
        </Popover>
      </div>
    </div>
  )
}

export { FloatingActionButton }
