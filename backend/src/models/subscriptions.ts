import { InferSchemaType, Schema, model } from 'mongoose'

const schema = new Schema({
	endpoint: { type: String, unique: true, index: true, required: true },
	expirationTime: Number,
	keys: {
		type: new Schema(
			{
				p256dh: { type: String, required: true },
				auth: { type: String, required: true },
			},
			{ _id: false }
		),
		required: true,
	},
	location: {
		type: {
			type: String,
			default: 'Point',
		},
		coordinates: {
			type: [Number], // [longitude, latitude]
		},
	},
})

schema.index({ location: '2dsphere' })

export type Subscription = InferSchemaType<typeof schema>
export default model<Subscription>('Subscription', schema)
