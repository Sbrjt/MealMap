'use client'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { ReactElement, useState } from 'react'

function GlowWrap({
	radius = 200,
	children,
}: {
	radius?: number
	children: ReactElement
}) {
	const [visible, setVisible] = useState(false)

	let mouseX = useMotionValue(0)
	let mouseY = useMotionValue(0)

	function handleMouseMove({ currentTarget, clientX, clientY }: any) {
		let { left, top } = currentTarget.getBoundingClientRect()

		mouseX.set(clientX - left)
		mouseY.set(clientY - top)
	}

	return (
		<motion.div
			style={{
				background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          #f0b000,
          transparent 80%
        )
      `,
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			className='rounded-lg p-[2.5px] transition duration-500'
		>
			{children}
		</motion.div>
	)
}

export default GlowWrap
