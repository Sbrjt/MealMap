import { Router } from 'express'
import { openAPIRoute } from 'express-zod-openapi-autogen'
import { googleLogin, logout, phoneLogin, verifyOtp } from '../controllers/auth'
import verifyToken from '../middlewares/auth'
import { otpLimiter, phoneLimiter } from '../middlewares/limiters'
import {
	GoogleAuthSchema,
	PhoneLoginSchema,
	VerifyOtpSchema,
} from '../utils/schemas'

const router = Router()

router.post(
	'/auth/google',
	openAPIRoute(
		{
			tag: 'Auth',
			summary: 'Authenticate with Google',
			body: GoogleAuthSchema,
		},
		googleLogin
	)
)

router.post(
	'/auth/phone',
	verifyToken,
	phoneLimiter,
	openAPIRoute(
		{
			tag: 'Auth',
			summary: 'Authenticate with phone',
			body: PhoneLoginSchema,
		},
		phoneLogin
	)
)

router.post(
	'/auth/verify-otp',
	verifyToken,
	otpLimiter,
	openAPIRoute(
		{
			tag: 'Auth',
			summary: 'Verify OTP',
			body: VerifyOtpSchema,
		},
		verifyOtp
	)
)

router.get(
	'/auth/logout',
	openAPIRoute(
		{
			tag: 'Auth',
			summary: 'Logout',
		},
		logout
	)
)

export default router
