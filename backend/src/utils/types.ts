import { Request } from 'express'

type UserPayload = {
	id: string
	// role:
}

type AuthRequest = Request & {
	user?: UserPayload
}

type OtpCacheValue = {
	phone: string
	otp: string
}

export type { AuthRequest, OtpCacheValue, UserPayload }
