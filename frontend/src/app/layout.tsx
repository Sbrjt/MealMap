import InstallSW from '@/components/InstallSW'
import Navbar from '@/components/Navbar'
import ProgressBar from '@/components/ProgressBar'
import { Toaster } from '@/components/ui/sonner'
import User from '@/components/User'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
	title: 'MealMap',
	// favicons for dark and light theme
	icons: [
		{
			media: '(prefers-color-scheme: light)',
			url: '/favicon-light.svg',
		},
		{
			media: '(prefers-color-scheme: dark)',
			url: '/favicon-dark.svg',
		},
	],
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<ProgressBar>
					<div className='flex flex-col h-full'>
						<Navbar />
						<div className='flex-auto'>{children}</div>
					</div>
				</ProgressBar>
				<Toaster />
				<User />
				<InstallSW />
			</body>
		</html>
	)
}
