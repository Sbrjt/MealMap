'use client'
import Map from '@/components/Map'
import getLocation from '@/lib/getLocation'
import { LatLng } from '@/types'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useState } from 'react'
import { MapMouseEvent, Marker } from 'react-map-gl/mapbox'
import { toast } from 'sonner'
import Skeleton from '../../../../components/Skeleton'

function DonateMap({
	value,
	onChange,
}: {
	value?: LatLng
	onChange?: (value: LatLng) => void
}) {
	const [showMap, setShowMap] = useState<boolean>(true)

	useEffect(() => {
		;(async () => {
			const locationAccess = await navigator.permissions.query({
				name: 'geolocation',
			})

			if (locationAccess.state === 'granted') {
				const coords = await getLocation()
				onChange?.({ ...coords })
			} else {
				setShowMap(false)
			}
		})()
	}, [])

	async function handleOverlay() {
		try {
			const coords = await getLocation()
			onChange?.({ ...coords })
			setShowMap(true)
		} catch {
			toast('Plz enable location access.')
		}
	}

	function handleMapClick(e: MapMouseEvent) {
		onChange?.({ longitude: e.lngLat.lng, latitude: e.lngLat.lat })
	}

	return (
		<div
			className='rounded-md p-1.5 border outline-none
            focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] shadow-xs transition-[color,box-shadow]'
		>
			<div className='aspect-video rounded-sm overflow-hidden'>
				{showMap ? (
					<Skeleton>
						{value && (
							<Map
								latitude={value?.latitude}
								longitude={value?.longitude}
								zoom={15}
								onClick={handleMapClick}
							>
								<Marker
									longitude={value.longitude}
									latitude={value?.latitude}
								/>
							</Map>
						)}
					</Skeleton>
				) : (
					<Overlay handleOverlay={handleOverlay} />
				)}
			</div>
		</div>
	)
}

function Overlay({ handleOverlay }) {
	return (
		<div
			className='content-center text-center h-full hover:cursor-pointer'
			onClick={handleOverlay}
		>
			<p>Location access is required.</p>
		</div>
	)
}

export default DonateMap
