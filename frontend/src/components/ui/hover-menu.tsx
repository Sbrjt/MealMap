'use client'
import { motion } from 'motion/react'
import { ReactNode, useState } from 'react'

import { createContext, useContext } from 'react'

const MenuContext = createContext()

const transition = {
	type: 'spring',
	mass: 0.5,
	damping: 11.5,
	stiffness: 100,
	restDelta: 0.001,
	restSpeed: 0.001,
}

export default function Menu({ children }) {
	const [open, setOpen] = useState(false)
	const toggle = () => setOpen((o) => !o)

	return (
		<MenuContext.Provider value={{ open, toggle }}>
			<div
				onMouseEnter={() => toggle()}
				onMouseLeave={() => toggle()}
				className='relative z-50 flex items-center'
			>
				{children}
			</div>
		</MenuContext.Provider>
	)
}

export function MenuTrigger({ children }) {
	const { toggle } = useContext(MenuContext)

	return (
		<motion.button
			onClick={toggle}
			transition={{ duration: 0.3 }}
			className='cursor-pointer text-black hover:opacity-[0.9] dark:text-white relative'
		>
			{children}
		</motion.button>
	)
}

export const MenuItem = ({ children }: { children: ReactNode }) => {
	const { open } = useContext(MenuContext)

	return (
		<>
			{open && (
				<motion.div
					initial={{ opacity: 0, scale: 0.85, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={transition}
				>
					<div className='absolute right-0 transform pt-10 z-50'>
						<motion.div
							transition={transition}
							layoutId='active' // layoutId ensures smooth animation
							className='bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl'
						>
							<motion.div
								layout // layout ensures smooth animation
								className='w-max h-full p-4'
							>
								{children}
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</>
	)
}
