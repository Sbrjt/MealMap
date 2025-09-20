'use client'
import Lordicon from '@/components/Lordicon'
import { Player } from '@lordicon/react'
import { useRef } from 'react'

function IconCard({ heading, text, icon }) {
	const playerRef = useRef<Player>(null)

	return (
		<div
			className='bg-white rounded-2xl shadow-md p-6 hover:scale-105 hover:shadow-lg duration-300 
            flex flex-col justify-between items-center text-center'
			onMouseEnter={() => {
				if (!playerRef.current?.isPlaying) {
					playerRef.current?.playFromBeginning()
				}
			}}
		>
			<Lordicon icon={icon} ref={playerRef} />
			<h3 className='text-xl font-semibold mb-2'>{heading}</h3>
			<div className='text-gray-600'>{text}</div>
		</div>
	)
}

export default IconCard
