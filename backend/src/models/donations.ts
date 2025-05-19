import { InferSchemaType, Schema, model } from 'mongoose'

const schema = new Schema({
	location: {
		type: { type: String, default: 'Point' },
		coordinates: {
			type: [Number], // [longitude, latitude]
			maxItems: 2,
			required: true,
		},
	},
	donor: { type: String, required: true },
	donorId: {
		type: String, // or `Schema.Types.ObjectId` if referencing a Donor model
		// required: true,
	},
	mobile: {
		type: String, // required: true,
	},
	description: String,
	date: { type: Date, default: Date.now },
})

export type Donation = InferSchemaType<typeof schema>
export default model<Donation>('Donation', schema)
