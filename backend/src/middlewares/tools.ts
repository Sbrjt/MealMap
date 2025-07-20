import cookieParser from 'cookie-parser'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'

// I'm using proxy in next, so I don't need cors

// check for internet in local development
if (process.env.FRONTEND_URL.includes('localhost')) {
	try {
		await fetch('https://clients3.google.com/generate_204')
	} catch (error) {
		console.error('No internet!')
		process.exit(1)
	}
}

const json = express.json({
	limit: '15kb',
})

const limiter = rateLimit({
	max: 150,
	windowMs: 60 * 60 * 1000,
	message: 'Too Many Request from this IP, please try again in an hour',
})

export default [
	json,
	helmet(),
	// mongoSanitize(),
	hpp(),
	limiter,
	cookieParser(),
]

// For security: helmet mongoSanitize hpp
