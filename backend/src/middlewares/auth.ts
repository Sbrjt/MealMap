import 'dotenv/config'
import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {
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
