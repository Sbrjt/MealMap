'use client'

import fetchApi from '@/lib/fetch'
import getLocation from '@/lib/getLocation'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import MapBox, {
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	Popup,
} from 'react-map-gl/mapbox'

type Point = {
	id: string
	latitude: number
	longitude: number
	donor: string
	description?: string
	mobile?: string
	date?: Date
}

function Map() {
	const [data, setData] = useState()
	const [overlay, setOverlay] = useState<boolean>(false)
	const [selectedMarker, setSelectedMarker] = useState<Point | null>(null)
	const geoControlRef = useRef<mapboxgl.GeolocateControl>(null)

	async function handleOverlay() {
		setOverlay(false)
		getLocation()
	}

	useEffect(() => {
		const controller = new AbortController()

		;(async () => {
			console.log('fetching...')
			const res = await fetch('api/map/all')
			console.log(res)

			if (res.ok) {
				const json = await res.json()
				console.log(json)
			}

			const { json } = await fetchApi('api/map/all')
			setData(json)

			const status = await navigator.permissions.query({ name: 'geolocation' })

			if (status.state !== 'granted') {
				setOverlay(true)
			}

			status.addEventListener('change', () => {
				geoControlRef.current?.trigger()
			})
		})()

		// clean-up
		return () => {
			controller.abort()
		}
	}, [])

	return (
		<>
			<div className='absolute inset-0 rounded-lg overflow-hidden'>
				<MapBox
					mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
					initialViewState={{
						latitude: 23,
						longitude: 85,
						zoom: 3,
					}}
					style={{
						width: '100%',
						height: '100%',
					}}
					mapStyle='mapbox://styles/mapbox/light-v11'
					onLoad={() => {
						overlay ? null : geoControlRef.current?.trigger()
					}}
					onClick={() => {
						setSelectedMarker(null)
					}}
				>
					<GeolocateControl
						positionOptions={{ enableHighAccuracy: true }}
						trackUserLocation={true}
						ref={geoControlRef}
						showAccuracyCircle={false}
					/>
					<NavigationControl />
					<FullscreenControl />
					<Markers
						data={data}
						selectedMarker={selectedMarker}
						setSelectedMarker={setSelectedMarker}
					/>
				</MapBox>
			</div>
			{overlay && <Overlay handleOverlay={handleOverlay} />}
		</>
	)
}

function Markers({ data, selectedMarker, setSelectedMarker }) {
	return (
		<>
			{/* add markers on the map from data */}
			{data?.map((point: Point) => {
				return (
					<Marker
						key={point.id}
						latitude={point.latitude}
						longitude={point.longitude}
					>
						<div
							style={{ cursor: 'pointer' }}
							onClick={(e) => {
								e.stopPropagation()
								setSelectedMarker(point)
							}}
						>
							<img
								src='/mapbox-icon.png'
								width='50'
								height='50'
								className='d-inline-block align-text-top mx-2'
							/>
						</div>
					</Marker>
				)
			})}

			{/* show a popup when a marker is selected */}
			{selectedMarker && (
				<Popup
					latitude={selectedMarker?.latitude}
					longitude={selectedMarker?.longitude}
					onClose={() => setSelectedMarker(null)}
					closeOnClick={false}
				>
					<h1>{selectedMarker?.donor}</h1>
					<div>{selectedMarker?.description}</div>
				</Popup>
			)}
		</>
	)
}

function Overlay({ handleOverlay }) {
	return (
		<div
			className='absolute inset-0 z-10 backdrop-blur-xs hover:cursor-pointer content-center text-center active:scale-50 active:opacity-0 duration-300 px-10'
			onClick={handleOverlay}
		>
			Please enable location access. Click to enable.
		</div>
	)
}

export default Map
