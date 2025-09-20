import { InferSchemaType, Schema, model } from 'mongoose'

const schema = new Schema({
	endpoint: { type: String, unique: true, index: true, required: true },
	keys: {
		_id: false,
		type: {
			p256dh: { type: String, required: true },
			auth: { type: String, required: true },
		},
		required: true,
	},
	location: {
		type: {
			type: String,
			default: 'Point',
		},
		coordinates: {
			type: [Number], // [longitude, latitude]
			maxItems: 2,
		},
		required: true,
	},
})

schema.index({ location: '2dsphere' })

export type Subscription = InferSchemaType<typeof schema>
export default model<Subscription>('Subscription', schema)
