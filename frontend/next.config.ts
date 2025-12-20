import type { NextConfig } from 'next'
import { env } from 'process'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	// experimental: {
	// 	reactCompiler: true,
	// },
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.BACKEND_URL}/:path*`,
			},
		]
	},
}

export default nextConfig
