import { AuthRequest } from '@/utils/types'
import rateLimit from 'express-rate-limit'
import ms from 'ms'

const phoneLimiter = rateLimit({
	limit: 2,
	windowMs: ms('1d'),
	message: { error: 'Try again tomorrow.' },
	keyGenerator: (req: AuthRequest) => req.user!.id,
})

const otpLimiter = rateLimit({
	limit: 3,
	windowMs: ms('1h'),
	message: { error: '3 tries over.' },
	keyGenerator: (req: AuthRequest) => req.user!.id,
})

const refreshTokenLimiter = rateLimit({
	windowMs: ms('1h'),
	limit: 5,
	message: { error: 'Try again later.' },
})
// ideally 1 refresh token should be minted in 1 hr; but user might do multiple refreshes

export { otpLimiter, phoneLimiter, refreshTokenLimiter }
