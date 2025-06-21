export default async function getLocation() {
	const { coords } = await new Promise<GeolocationPosition>(
		(resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
			})
		}
	)

	return {
		longitude: coords.longitude,
		latitude: coords.latitude,
	}
}
