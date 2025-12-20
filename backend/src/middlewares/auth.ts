import Session from '@/models/sessions'
import {
	generateAccessToken,
	generateRefreshToken,
	isObjectId,
	similar,
} from '@/utils/auth'
import { AuthRequest, UserPayload } from '@/utils/types'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import ms from 'ms'
import { env } from 'process'
import { refreshTokenLimiter } from './limiters'

const { JWT_SECRET } = env

async function verifyToken(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	try {
		verifyAccessToken(req, res, next)
	} catch (err) {
		// fallback to refresh token
		verifyRefreshToken(req, res, next)
	}
}

function verifyAccessToken(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	const { access_token } = req.cookies
	req.user = jwt.verify(access_token, JWT_SECRET!) as UserPayload

	if (!isObjectId(req.user.id)) {
		throw new Error('Invalid id')
	}

	next()
}

function verifyRefreshToken(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	refreshTokenLimiter(req, res, async () => {
		const { refresh_token } = req.cookies
		console.log(refresh_token)

		if (!refresh_token || !isObjectId(refresh_token)) {
			return res.status(401).json({ error: 'Unauthorized' })
		}

		const tokenData = await Session.findByIdAndUpdate(refresh_token, {
			used: true,
			expireAt: Date.now() + ms('1d'),
		})

		if (!tokenData) {
			res.clearCookie('refresh_token')
			return res.status(401).json({ error: 'Unauthorized' })
		}

		const userId = tokenData.userId.toString()
		const userAgent = req.get('user-agent') || 'unknown'

		if (
			(tokenData.used &&
				// grace period
				Date.now() - tokenData.updatedAt.getTime() > ms('1m')) ||
			!similar(tokenData.userAgent, userAgent)
		) {
			res.clearCookie('refresh_token')
			await Session.deleteMany({ userId })
			return res.status(403).json({ error: 'Bad token' })
		}

		// issue new access token and rotate refresh token
		const accessToken = generateAccessToken(userId)
		res.cookie('access_token', accessToken.token, accessToken.options)

		const newRefreshToken = await generateRefreshToken(userId, userAgent)
		res.cookie('refresh_token', newRefreshToken.token, newRefreshToken.options)

		req.user = { id: userId }

		next()
	})
}

export default verifyToken

/* 
Refresh Token working:

- Refresh token lifetime: 1 month
- Rotation: Each time a refresh token is used, a new one is issued.
- Old tokens: Old token remains in DB for up to 1 month, flagged as "used".
- Theft detection: If a "used" token is reused, log the user out. 
- UA: Also store the user-agent to ensure the request is originating from same browser/device. 
*/
