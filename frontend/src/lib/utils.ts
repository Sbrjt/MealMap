import { FetchOptions } from '@/lib/types'
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
	{ body, method, headers }: FetchOptions = {}
) {
	const res = await fetch(url, {
		method: method ?? (body ? 'POST' : 'GET'),
		body: JSON.stringify(body),
		headers: {
			...(body ? { 'Content-Type': 'application/json' } : {}),
			...headers,
		},
	})

	const type = res.headers.get('content-type')
	let json: Record<string, unknown> | null = null,
		text: string | null = null

	if (type?.includes('application/json')) {
		json = await res.json()
	} else {
		text = await res.text()
	}

	if (!res.ok) {
		console.log(json || text)
	}

	return { res, json, text }
	// use blob if required
}

export { cn, fetchApi, getLocation }
