'use client'
import { motion } from 'motion/react'

function Check({ className }: { className?: string }) {
	return (
		<>
			<motion.svg
				className={className}
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			>
				<motion.path
					d='M4 12 L9 17 L20 6'
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
				/>
			</motion.svg>
		</>
	)
}

export default Check
