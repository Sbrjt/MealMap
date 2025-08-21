'use client'
import Spinner from '@/components/ui/spinner'
import { fetchApi } from '@/lib/utils'
import { Marker } from '@/types'
import { useEffect, useState } from 'react'

function PopupContent({ id }: { id: string }) {
	const [marker, setMarker] = useState<Marker>(null)

	async function getMarker() {
		const { json } = await fetchApi(`/api/map?id=${id}`)
		setMarker(json)
	}

	useEffect(() => {
		getMarker()
	}, [])

	return (
		<div>
			{marker ? (
				<div className='space-y-1'>
					<h1 className='text-lg font-semibold'>{marker.donor}</h1>
					<p className='text-sm text-gray-600'>{marker.description}</p>
				</div>
			) : (
				<div className='h-20 w-40 flex items-center justify-center'>
					<Spinner />
				</div>
			)}
		</div>
	)
}

export default PopupContent
