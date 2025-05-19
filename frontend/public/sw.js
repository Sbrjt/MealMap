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
})

// badge, action icon
