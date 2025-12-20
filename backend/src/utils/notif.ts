import { Donation } from '@/models/donations'
import SubscriptionModel, { Subscription } from '@/models/subscriptions'
import haversine from 'haversine-distance'
import { env } from 'process'
import webpush, { PushSubscription } from 'web-push'

const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = env

webpush.setVapidDetails(
	'https://my-site.com/contact',
	VAPID_PUBLIC_KEY!,
	VAPID_PRIVATE_KEY!
)

// notification payload
function payload(sub: Subscription, donation: Donation) {
	const distance = Math.round(
		haversine(
			sub.location.coordinates as [number, number],
			donation.location!.coordinates as [number, number]
		) / 1000
	)

	const msg = {
		title: 'Donation available nearby',
		body: `By ${donation.donor} (${distance}km away)`,
		icon: 'favicon-dark.svg',
		// image: 'favicon-dark.svg',
		data: {
			url: 'https://example.com',
		},
		actions: [
			{
				action: 'view',
				title: 'View',
			},
			{
				action: 'dismiss',
				title: 'Dismiss',
			},
		],
		timestamp: Date.now(),
		// requireInteraction: 'true',
	}

	return JSON.stringify(msg)
}

async function notify(donation: Donation) {
	// find all subs within 5 km
	const subs = await SubscriptionModel.find({
		location: {
			$near: {
				$geometry: donation.location,
				$maxDistance: 5000, // 5 km
			},
		},
	})

	// send the notifications concurrently
	const settled = await Promise.allSettled(
		subs.map((sub: Subscription) => {
			try {
				return webpush.sendNotification(sub, payload(sub, donation))
			} catch (err) {
				return Promise.reject(err)
			}
		})
	)

	// count success and failures in delivery
	let success = 0,
		fail = 0

	for (let { status } of settled) {
		if (status === 'fulfilled') success++
		else fail++
	}

	console.log(`Sent ${success} notifications; ${fail} fails`)
}

async function testNotif(sub: PushSubscription) {
	try {
		await webpush.sendNotification(
			sub,
			JSON.stringify({
				title: 'You are now subscribed to notifications 🥳',
			})
		)
		return true
	} catch {
		return false
	}
}

export { notify, testNotif }
