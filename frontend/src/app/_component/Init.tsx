'use client'
import { fetchApi } from '@/lib/utils'
import { useEffect } from 'react'
import { toast } from 'sonner'

function Init() {
	useEffect(() => {
		checkBackend()
		installSW()
		credits()
	}, [])
	return <></>
}

function installSW() {
	navigator.serviceWorker.register('/sw.js')
}

function credits() {
	if (!window.location.href.includes('local')) {
		console.log('%cMealMap', 'font-size:3rem; font-weight:bold')
		console.log('Made by Shubhrajit')
		console.log('https://github.com/Sbrjt/mealmap')
	}
}

async function checkBackend() {
	try {
		await fetch('https://httpbin.org/get', {})
	} catch {
		toast('Your are not connected to internet!')
		return
	}

	try {
		const { res } = await fetchApi('/api', {
			signal: AbortSignal.timeout(5000),
		})

		if (!res.ok) {
			toast('Backend is down :(')
		}
	} catch {
		toast('Backend timeout')
	}
}

export default Init
