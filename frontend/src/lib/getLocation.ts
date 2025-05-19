import { toast } from 'sonner'

export default async function getLocation() {
	try {
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
	} catch (err) {
		toast.error("Coundn't access location :(")
		return null
	}
}
