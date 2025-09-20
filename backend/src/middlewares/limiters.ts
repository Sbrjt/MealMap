import rateLimit from 'express-rate-limit'
import ms from 'ms'
import { AuthRequest } from '../utils/types'

const phoneLimiter = rateLimit({
	limit: 2,
	windowMs: ms('1d'),
	message: { error: 'Try again tomorrow.' },
	keyGenerator: (req: AuthRequest) => req.user.id,
})

const otpLimiter = rateLimit({
	limit: 3,
	windowMs: ms('1h'),
	message: { error: '3 tries over.' },
	keyGenerator: (req: AuthRequest) => req.user.id,
})

export { otpLimiter, phoneLimiter }
