import Init from '@/app/_component/Init'
import User from '@/app/_component/User'
import Navbar from '@/components/Navbar'
import ProgressBar from '@/components/ProgressBar'
import { Toaster } from '@/components/ui/sonner'
import { inter, meta, vp } from '@/lib/meta'
import './globals.css'

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.variable}>
				{/* <ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				> */}
				<ProgressBar>
					<div className='flex flex-col h-full'>
						<Navbar />
						<div className='flex-auto'>{children}</div>
					</div>
				</ProgressBar>
				<Toaster />
				<User />
				<Init />
				{/* </ThemeProvider> */}
			</body>
		</html>
	)
}

export const metadata = meta
export const viewport = vp
