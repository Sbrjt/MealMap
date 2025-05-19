'use client'
import { useEffect } from 'react'

function InstallSW() {
	useEffect(() => {
		navigator.serviceWorker.register('/sw.js')
	}, [])
	return <></>
}

export default InstallSW
