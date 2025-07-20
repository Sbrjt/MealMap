import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

function verifyToken(
	req: Request & { user?: Object },
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.cookies.jwt
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = decoded
		next()
	} catch (err) {
		res.status(401).json({ error: 'Invalid token' })
	}
}

export default verifyToken
