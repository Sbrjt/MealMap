import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
