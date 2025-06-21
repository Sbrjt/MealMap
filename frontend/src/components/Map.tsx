import { MapProps } from '@/types'
import MapBox, {
	FullscreenControl,
	GeolocateControl,
	NavigationControl,
} from 'react-map-gl/mapbox'

function Map({
	latitude,
	longitude,
	zoom,
	onClick,
	onLoad,
	ref,
	geoControlRef,
	children,
}: MapProps) {
	return (
		<MapBox
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
			initialViewState={{
				latitude: latitude,
				longitude: longitude,
				zoom: zoom,
			}}
			style={{
				width: '100%',
				height: '100%',
			}}
			mapStyle='mapbox://styles/mapbox/light-v11' //todo
			onClick={onClick}
			onLoad={onLoad}
			ref={ref}
		>
			{children}

			{/* controls */}
			<GeolocateControl
				positionOptions={{ enableHighAccuracy: true }}
				trackUserLocation={true}
				ref={geoControlRef}
				showAccuracyCircle={false}
			/>
			<NavigationControl />
			<FullscreenControl />
		</MapBox>
	)
}

export default Map
