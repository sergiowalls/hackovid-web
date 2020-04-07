import React, { ReactElement } from 'react'

import './Col.scss'

interface ColProps {
	children?: null | ReactElement | string | (null | ReactElement | string)[]
	className?: string
	sm?: number
	smOffset?: number
	md?: number
	mdOffset?: number
	lg?: number
	lgOffset?: number
	xl?: number
	xlOffset?: number
}

const Col = ({
	children,
	className,
	sm,
	smOffset,
	md,
	mdOffset,
	lg,
	lgOffset,
	xl,
	xlOffset
}: ColProps) => {
	return (
		<div
			className={`col ${className}` +
				(sm ? ` col-sm-${sm}` : '') +
				(smOffset ? ` col-sm-offset-${smOffset}` : '') +
				(md ? ` col-md-${md}` : '') +
				(mdOffset ? ` col-md-offset-${mdOffset}` : '') +
				(lg ? ` col-lg-${lg}` : '') +
				(lgOffset ? ` col-lg-offset-${lgOffset}` : '') +
				(xl ? ` col-xl-${xl}` : '') +
				(xlOffset ? ` col-xl-offset-${xlOffset}` : '')
			}>
			{children}
		</div>
	)
}

export { Col }
