import React, { ReactElement } from 'react'

import './Row.scss'

interface RowProps {
	children?: null | ReactElement | (null | ReactElement)[]
	className?: string
}

const Row = ({
	children,
	className
}: RowProps) => {
	return (
		<div className={`row ${className}`}>
			{children}
		</div>
	)
}

export { Row }
