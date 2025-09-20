import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { xss } from 'express-xss-sanitizer'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import ms from 'ms'

// I'm using proxy in next, so I don't need cors

// check for internet in local development
if (process.env.FRONTEND_URL?.includes('localhost')) {
	try {
		await fetch('https://clients3.google.com/generate_204')
	} catch (error) {
		console.error('No internet!')
		process.exit(1)
	}
}

const json = express.json({
	limit: '10kb',
})

const rateLimiter = rateLimit({
	max: 100,
	windowMs: ms('1h'),
	message: 'Too many requests',
})

const logger = morgan('dev')

const compressor = compression({
	threshold: '1kb',
})

export default [
	json,
	xss(),
	helmet(),
	// mongoSanitize(),
	hpp(),
	rateLimiter,
	cookieParser(),
	logger,
	compressor,
]

// For security: xss, helmet, mongoSanitize, hpp
