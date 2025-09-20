import { NextFunction, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from 'process'
import { AuthRequest, UserPayload } from '../utils/types'

const { JWT_SECRET } = env

function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
	try {
		const token = req.cookies.jwt
		req.user = jwt.verify(token, JWT_SECRET!) as JwtPayload & UserPayload
		next()
	} catch (err) {
		res.status(401).json({ error: 'Invalid token' })
	}
}

export default verifyToken
