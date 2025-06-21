import { OAuth2Client, TokenPayload } from 'google-auth-library'
import User from '../models/users'

const client = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET
)

async function getGooglePayload(credential: string) {
	const ticket = await client.verifyIdToken({
		idToken: credential,
		audience: process.env.GOOGLE_CLIENT_ID,
	})

	return ticket.getPayload()
}

async function findOrCreateUser(payload: TokenPayload) {
	let user = await User.findOne({ email: payload.email }).lean()

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
	console.log('Created new user:', user._id)
	return user.toObject()
}

export { findOrCreateUser, getGooglePayload }
