// for web-push notification

self.addEventListener('push', (event) => {
	const data = event.data.json()

	self.registration.showNotification(data.title, data)
})

self.addEventListener('notificationclick', (e) => {
	if (e.action === 'dismiss') {
		e.notification.close()
		return
	}

	// if (e.action === 'view')
	e.waitUntil(clients.openWindow(e.notification.data.url))
	// badge, action icon
})

// for workbox cache

if (self.location.hostname !== 'localhost') {
	self.__WB_DISABLE_DEV_LOGS = true

	importScripts(
		'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js'
	)

	const {
		routing: { registerRoute, setCatchHandler },
		strategies: { CacheFirst, StaleWhileRevalidate, NetworkFirst },
		expiration: { ExpirationPlugin },
	} = workbox

	// CacheFirst for images, fonts
	registerRoute(
		({ request, url }) =>
			request.destination === 'image' || request.destination === 'font',
		new CacheFirst({
			cacheName: 'static',
			plugins: [new ExpirationPlugin({ maxAgeSeconds: 7 * 24 * 60 * 60 })],
		})
	)

	// StaleWhileRevalidate for html, css, js
	registerRoute(
		({ request }) =>
			request.mode === 'navigate' ||
			['script', 'style', 'manifest', 'worker'].includes(request.destination),
		new StaleWhileRevalidate({
			cacheName: 'app',
		})
	)
}
