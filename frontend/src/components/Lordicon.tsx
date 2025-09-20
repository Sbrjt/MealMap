'use client'
import { fetchApi } from '@/lib/utils'
import { Player } from '@lordicon/react'
import { Ref, useEffect, useState } from 'react'

function Lordicon({ ref, icon }: { ref: Ref<Player>; icon: string }) {
	const [iconData, setIconData] = useState<any>(null)

	useEffect(() => {
		;(async () => {
			const { json } = await fetchApi(`/lottie/${icon}.json`)
			setIconData(json)
		})()
	}, [])

	if (!iconData) return

	return <Player ref={ref} icon={iconData} size={50} />
}

export default Lordicon
