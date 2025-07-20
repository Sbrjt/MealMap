import { CookieOptions } from 'express'
import { TokenPayload } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import User from '../models/users'

// todo
async function findOrCreateUser(payload: TokenPayload) {
	let user = await User.findOne({ email: payload.email })

	if (user) {
		return user
	}

	// If not found, create a new user
	user = new User({
		name: payload.name,
		email: payload.email,
		profilePic: payload?.picture,
	})

	await user.save()
	console.log('Created new user:', user.id)
	return user
}

function jwtToken(user: Object) {
	return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: 'strict',
	maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
}

export { cookieOptions, findOrCreateUser, jwtToken }
