'use client'

import fetchApi from '@/lib/fetch'
import getLocation from '@/lib/getLocation'
import { toast } from 'sonner'

async function handleNotif() {
	// get the serviceWorker and subscribe to push notifications
	const sw = await navigator.serviceWorker.ready

	try {
		const subscription = await sw.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
		})

		const coords = await getLocation()

		const location = {
			type: 'Point',
			coordinates: [coords.longitude, coords.latitude],
		}

		const { res } = await fetchApi('api/subscribe', {
			body: { ...subscription.toJSON(), location },
			method: 'POST',
		})

		if (res.ok) toast.success('Successfully subscribed 🎉')
		else toast.error("Couldn't subscribe")
	} catch (err) {
		toast.error('Plz enable notifications')
	}
}

function NotifBtn() {
	return (
		<button
			onClick={handleNotif}
			className='btn btn-outline-warning rounded-full h-9 w-9 flex items-center justify-center border border-yellow-500 text-yellow-500 ml-4 hover:cursor-pointer'
		>
			🔔
		</button>
	)
}

export default NotifBtn
