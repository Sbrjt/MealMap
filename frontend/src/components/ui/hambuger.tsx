'use client'

import { motion, useCycle } from 'motion/react'

interface Props extends React.SVGProps<SVGSVGElement> {
	color?: string
	strokeWidth?: number
	transition?: any
	lineProps?: any
	open: boolean
	setOpen: (open: boolean) => void
	className: string
}

export function MenuButton({
	width = 24,
	height = 24,
	strokeWidth = 1.5,
	color = '#000',
	transition = { duration: 0.3 },
	lineProps,
	open,
	setOpen,
	className,
}: Props) {
	const top = {
		closed: { rotate: 0, translateY: 0 },
		opened: { rotate: 45, translateY: 2 },
	}

	const center = {
		closed: { opacity: 1 },
		opened: { opacity: 0 },
	}

	const bottom = {
		closed: { rotate: 0, translateY: 0 },
		opened: { rotate: -45, translateY: -2 },
	}

	const variant = open ? 'opened' : 'closed'

	const unitHeight = 4
	const unitWidth = (unitHeight * (width as number)) / (height as number)

	const sharedLineProps = {
		stroke: color,
		strokeWidth,
		vectorEffect: 'non-scaling-stroke',
		transition,
		...lineProps,
	}

	return (
		<motion.svg
			onClick={() => {
				setOpen(!open)
				console.log('clck')
			}}
			viewBox={`0 0 ${unitWidth} ${unitHeight}`}
			width={width}
			height={height}
			overflow='visible'
			preserveAspectRatio='none'
			style={{ cursor: 'pointer' }}
			className={className}
		>
			<motion.line
				x1='0'
				x2={unitWidth}
				y1='0'
				y2='0'
				animate={variant}
				variants={top}
				{...sharedLineProps}
			/>
			<motion.line
				x1='0'
				x2={unitWidth}
				y1='2'
				y2='2'
				animate={variant}
				variants={center}
				{...sharedLineProps}
			/>
			<motion.line
				x1='0'
				x2={unitWidth}
				y1='4'
				y2='4'
				animate={variant}
				variants={bottom}
				{...sharedLineProps}
			/>
		</motion.svg>
	)
}
