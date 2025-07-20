import { OAuth2Client } from 'google-auth-library'

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

export { getGooglePayload }
