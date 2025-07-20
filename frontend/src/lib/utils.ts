import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

async function getLocation() {
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

// my custom fetch function

async function fetchApi(
	url: string,
	{ body, method }: { body?: Object; method?: string } = {}
) {
	const res = await fetch(url, {
		method: method ?? (body ? 'POST' : 'GET'),
		body: JSON.stringify(body),
		headers: body ? { 'Content-Type': 'application/json' } : undefined,
	})

	if (res.ok) {
		// if (res.headers.get('content-type').includes('application/json'))
		try {
			return { res, json: await res.json() }
		} catch (err) {
			return { res, json: null }
		}
	} else {
		return { res, json: null }
	}
}

export { cn, fetchApi, getLocation }
