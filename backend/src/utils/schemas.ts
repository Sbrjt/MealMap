import { z } from 'zod'

const DonationSchema = z.object({
	latitude: z.number().min(-90).max(90),
	longitude: z.number().min(-180).max(180),
	phone: z.boolean().optional(),
	description: z.string().optional(),
	donor: z.string(),
})

const GoogleAuthSchema = z.object({
	credential: z.string(),
})

const PhoneLoginSchema = z.object({
	phone: z.string().length(12).regex(/^\d+$/),
})

const VerifyOtpSchema = z.object({
	otp: z.string().length(4).regex(/^\d+$/),
})

const MapItemSchema = z.object({
	id: z.string().nonempty(),
})

const NotifTokenSchema = z.object({
	endpoint: z.string().url(),
	keys: z.object({
		p256dh: z.string(),
		auth: z.string(),
	}),
})

export {
	DonationSchema,
	GoogleAuthSchema,
	MapItemSchema,
	NotifTokenSchema,
	PhoneLoginSchema,
	VerifyOtpSchema,
}
