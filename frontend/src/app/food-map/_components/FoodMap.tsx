'use client'
import Map from '@/components/Map'
import { Coordinate, Point } from '@/lib/types'
import { fetchApi, getLocation } from '@/lib/utils'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { MapRef, Marker, Popup } from 'react-map-gl/mapbox'
import PopupContent from './PopupContent'
import { GeolocateControl } from 'mapbox-gl'

function FoodMap() {
	const [points, setPoints] = useState<Coordinate[] | null>(null)
	const [overlay, setOverlay] = useState<boolean>(false)
	const [selectedMarker, setSelectedMarker] = useState<Point | null>(null)
	const geoControlRef = useRef<GeolocateControl>(null)
	const mapRef = useRef<MapRef>(null)

	/*
	if user hasn't enabled location, show an overlay (without prompting)
	show prompt only when user clicks on overlay
	if user grants location (or it was already granted), zoom in on map
	if user denies location, fall back to ip-geolocation
    */

	async function clickOverlay() {
		setOverlay(false)

		try {
			await getLocation()
			geoControlRef.current?.trigger()
		} catch (err) {
			// ip-geolocation
			const { json } = await fetchApi('https://ipwho.is/')

			mapRef.current?.flyTo({
				center: [json.longitude, json.latitude],
				zoom: 9,
			})
		}
	}

	function mapLoad() {
		if (!overlay) {
			geoControlRef.current?.trigger()
		}
	}

	function mapClick() {
		setSelectedMarker(null)
	}

	useEffect(() => {
		const controller = new AbortController()

		;(async () => {
			const { json } = await fetchApi('/api/map/all')
			setPoints(json)

			const status = await navigator.permissions.query({
				name: 'geolocation',
			})

			if (status.state !== 'granted') {
				setOverlay(true)
			}

			status.addEventListener('change', () => {
				geoControlRef.current?.trigger()

				const geolocate = geoControlRef.current
				if (geolocate && typeof geolocate.trigger === 'function') {
					geolocate.trigger()
				} else {
					console.warn('GeolocateControl not ready yet')
				}
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
				<Map
					ref={mapRef}
					latitude={23}
					longitude={85}
					zoom={4}
					onLoad={mapLoad}
					onClick={mapClick}
					geoControlRef={geoControlRef}
				>
					<Markers
						data={points}
						selectedMarker={selectedMarker}
						setSelectedMarker={setSelectedMarker}
					/>
				</Map>
			</div>
			{overlay && <Overlay handleOverlay={clickOverlay} />}
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
							className='cursor-pointer'
							onClick={(e) => {
								e.stopPropagation()
								setSelectedMarker(point)
							}}
						>
							<img
								src='/img/mapbox-icon.png'
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
					<PopupContent id={selectedMarker.id} key={selectedMarker.id} />
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

export default FoodMap
