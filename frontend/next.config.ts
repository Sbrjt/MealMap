import type { NextConfig } from 'next'
import { env } from 'process'

const { NODE_ENV } = env

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: NODE_ENV === 'production' ? 'lh3.googleusercontent.com' : '*',
			},
		],
	},
	experimental: {
		reactCompiler: true,
	},
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
