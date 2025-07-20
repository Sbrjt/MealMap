'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Button } from './ui/button'

function InstallBtn({ children }: { children: ReactNode }) {
	const [install, setInstall] = useState<any>()

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', (e: Event) => {
			setInstall(e)
		})
	}, [])

	async function handleInstall() {
		if (!install) return

		await install.prompt()

		const { outcome } = await install.userChoice
		if (outcome === 'accepted') {
			setInstall(null)
		}
	}

	return (
		<Button onClick={handleInstall} className='mx-5'>
			{children}
		</Button>
	)
}

export default InstallBtn
