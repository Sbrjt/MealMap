import localFont from 'next/font/local'

const inter = localFont({
	src: [
		{
			path: '../../public/fonts/InterVariable.woff2',
			weight: '100 900',
			style: 'normal',
		},
		{
			path: '../../public/fonts/InterVariable-Italic.woff2',
			weight: '100 900',
			style: 'italic',
		},
	],
	variable: '--font-inter',
})

const meta = {
	title: 'MealMap',
	manifest: '/manifest.json',
	// favicons for dark and light theme
	icons: [
		{
			media: '(prefers-color-scheme: light)',
			url: '/img/favicon-light.svg',
		},
		{
			media: '(prefers-color-scheme: dark)',
			url: '/img/favicon-dark.svg',
		},
	],
}

export { inter, meta }

// const poppins = Poppins({
// 	subsets: ['latin'],
// 	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// })
