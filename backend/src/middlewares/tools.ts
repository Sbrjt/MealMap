import express, { NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'

// I'm using proxy in next, so I don't need cors

function blockNoOrigin(req: Request, res: Response, next: NextFunction) {
	if (!req.headers.origin) {
		return res.status(403).send('CORS blocked: No Origin')
	}
	next()
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
	// CORS,
	json,
	helmet(),
	// mongoSanitize(), // BUG: not working
	hpp(),
	limiter,
]

// For security: helmet mongoSanitize hpp
