import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { googleLogin, logout, phoneLogin, verifyOtp } from '../controllers/auth'
import verifyToken from '../middlewares/auth'

const router = Router()

const phoneLimiter = rateLimit({
	limit: 2,
	windowMs: 24 * 60 * 60 * 1000, // 1 day
	// message: 'Try again tomorrow.',
	keyGenerator: (req: any) => req.user.id,
})

const otpLimiter = rateLimit({
	limit: 5,
	windowMs: 60 * 60 * 1000, // 1 hour
	// message: '5 tries over.',
	keyGenerator: (req: any) => req.user.id,
})

router.post('/google', googleLogin)
router.post('/phone', verifyToken, phoneLimiter, phoneLogin)
router.post('/verify-otp', verifyToken, otpLimiter, verifyOtp)
router.get('/logout', logout)

export default router
