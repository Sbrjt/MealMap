import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'
import TTLCache from '@isaacs/ttlcache'
import { randomInt } from 'crypto'
import ms from 'ms'
import { env } from 'process'
import { OtpCacheValue } from './types'

const { NODE_ENV, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = env

const sns = new SNSClient({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID!,
		secretAccessKey: AWS_SECRET_ACCESS_KEY!,
	},
})

const otpCache = new TTLCache<string, OtpCacheValue>({
	ttl: ms('1h'),
})

function generateOtp() {
	const n = randomInt(0, 10000)
	return String(n).padStart(4, '0')
}

async function sendOtp(phone: string, id: string) {
	const otp = generateOtp()

	if (NODE_ENV !== 'development') {
		await sns.send(
			new PublishCommand({
				Message: `Your OTP is ${otp}`,
				PhoneNumber: phone,
			})
		)
	} else {
		// each sms costs Rs 5!
		console.log(`Your OTP is ${otp}`)
	}

	otpCache.set(id, { phone, otp })
}

function validateOtp(id: string, enteredOtp: string) {
	const { otp, phone } = otpCache.get(id) || {}

	if (otp === enteredOtp) {
		return phone
	}
	return null
}

export { otpCache, sendOtp, validateOtp }
