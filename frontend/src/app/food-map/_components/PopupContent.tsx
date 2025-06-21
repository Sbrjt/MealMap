'use client'
import Spinner from '@/components/ui/spinner'
import fetchApi from '@/lib/fetch'
import { Marker } from '@/types'
import { useEffect, useState } from 'react'

function PopupContent({ id }: { id: string }) {
	const [Marker, setMarker] = useState<Marker>(null)

	useEffect(() => {
		;(async () => {
			const { json } = await fetchApi(`/api/map?id=${id}`)
			setMarker(json)
		})()
	}, [])

	return (
		<div>
			{Marker ? (
				<div className='space-y-1'>
					<h1 className='text-lg font-semibold'>{Marker.donor}</h1>
					<p className='text-sm text-gray-600'>{Marker.description}</p>
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
