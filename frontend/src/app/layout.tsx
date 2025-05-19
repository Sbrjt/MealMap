import InstallSW from '@/components/InstallSW'
import Navbar from '@/components/Navbar'
import Providers from '@/components/ProgressBar'
import { Toaster } from '@/components/ui/sonner'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
	title: 'MealMap',
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
			<InstallSW />
			<body className={poppins.className}>
				<Providers>
					<Toaster />
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	)
}
