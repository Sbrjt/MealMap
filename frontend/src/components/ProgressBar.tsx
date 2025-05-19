'use client'

import { ProgressProvider } from '@bprogress/next/app'

function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ProgressProvider
			height='4px'
			color='#fffd00'
			options={{ showSpinner: false }}
			shallowRouting
		>
			{children}
		</ProgressProvider>
	)
}

export default Providers
