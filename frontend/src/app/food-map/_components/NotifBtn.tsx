'use client'
import { fetchApi, getLocation } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

function NotifBtn() {
	const [pending, setPending] = useState(false)

	// get the serviceWorker and subscribe to push notifications
	async function handleNotif() {
		setPending(true)

		const sw = await navigator.serviceWorker.ready

		try {
			const subscription = await sw.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
			})

			try {
				const coords = await getLocation()

				const location = {
					type: 'Point',
					coordinates: [coords.longitude, coords.latitude],
				}

				const { res } = await fetchApi('api/subscribe', {
					body: { ...subscription.toJSON(), location },
				})

				if (!res.ok) {
					toast.error("Couldn't subscribe :(")
				}
			} catch {
				toast.error('Plz enable location access')
			}
		} catch {
			toast.error('Plz enable notifications')
		}

		setPending(false)
	}

	return (
		<button
			disabled={pending}
			onClick={handleNotif}
			className='btn btn-outline-warning rounded-full h-9 w-9 flex items-center justify-center border border-yellow-500 text-yellow-500 ml-4 hover:cursor-pointer'
		>
			🔔
		</button>
	)
}

export default NotifBtn
