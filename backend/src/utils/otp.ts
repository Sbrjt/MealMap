import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'
import TTLCache from '@isaacs/ttlcache'
import { randomInt } from 'crypto'

const sns = new SNSClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
})

const otpCache = new TTLCache({
	ttl: 60 * 60 * 1000, // 1 hour
})

function generateOtp() {
	const n = randomInt(0, 10000)
	return String(n).padStart(4, '0')
}

async function sendOtp(phone: string) {
	const otp = generateOtp()

	await sns.send(
		new PublishCommand({
			Message: `Your OTP is ${otp}`,
			PhoneNumber: phone,
		})
	)

	otpCache.set(phone, otp)
}

function verify(phone: string, otp: string) {
	console.log(phone, otp)
	console.log(otpCache.get(phone))

	return otpCache.get(phone) === otp
}

export { otpCache, sendOtp, verify }
