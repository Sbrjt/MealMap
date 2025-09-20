import { OAuth2Client } from 'google-auth-library'
import { env } from 'process'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

async function getGooglePayload(credential: string) {
	try {
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: GOOGLE_CLIENT_ID,
		})

		return ticket.getPayload()
	} catch (err) {
		return null
	}
}

export { getGooglePayload }
