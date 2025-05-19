'use client'

import getLocation from '@/lib/getLocation'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useState } from 'react'
import MapBox, {
	FullscreenControl,
	GeolocateControl,
	MapMouseEvent,
	Marker,
	NavigationControl,
} from 'react-map-gl/mapbox'
import Skeleton from './Skeleton'

type LatLng = {
	latitude: number
	longitude: number
	en: boolean
}

function Map({
	value,
	onChange,
}: {
	value?: LatLng
	onChange?: (value: LatLng) => void
}) {
	const [overlay, setOverlay] = useState<boolean>(false)

	useEffect(() => {
		;(async () => {
			const status = await navigator.permissions.query({
				name: 'geolocation',
			})

			if (status.state === 'granted') {
				const coords = (await getLocation()) as {
					longitude: number
					latitude: number
				}
				onChange?.({ ...coords, en: true })
			} else {
				setOverlay(true)
			}
		})()
	}, [])

	async function handleOverlay() {
		const coords = (await getLocation()) as {
			longitude: number
			latitude: number
		}
		onChange?.({ ...coords, en: true })
		setOverlay(false)
	}

	function handleMapClick(e: MapMouseEvent) {
		onChange?.({ longitude: e.lngLat.lng, latitude: e.lngLat.lat, en: true })
	}

	return (
		<div className='aspect-video rounded-sm border overflow-hidden'>
			{overlay ? (
				<div
					className='content-center text-center h-full hover:cursor-pointer'
					onClick={handleOverlay}
				>
					<p>Location access is required.</p>
				</div>
			) : (
				<Skeleton>
					{value?.latitude && (
						<MapBox
							mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
							initialViewState={{
								latitude: value?.latitude,
								longitude: value?.longitude,
								zoom: 15,
							}}
							style={{
								width: '100%',
								height: '100%',
							}}
							mapStyle='mapbox://styles/mapbox/light-v11'
							onClick={handleMapClick}
						>
							<GeolocateControl
								positionOptions={{ enableHighAccuracy: true }}
								trackUserLocation={true}
								showAccuracyCircle={false}
							/>
							<NavigationControl />
							<FullscreenControl />

							<Marker longitude={value.longitude} latitude={value?.latitude} />
						</MapBox>
					)}
				</Skeleton>
			)}
		</div>
	)
}

export default Map
