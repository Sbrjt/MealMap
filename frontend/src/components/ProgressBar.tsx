'use client'

import { ProgressProvider } from '@bprogress/next/app'

function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ProgressProvider
			height='3px'
			color='linear-gradient(to left, yellow 0%, orange 95%)'
			options={{ showSpinner: false }}
			shallowRouting
		>
			{children}
		</ProgressProvider>
	)
}

export default Providers
