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

schema
	.virtual('longitude')
	.get(function () {
		return this.location.coordinates[0]
	})
	.set(function (v) {
		this.location.coordinates[0] = v
	})

schema
	.virtual('latitude')
	.get(function () {
		return this.location.coordinates[1]
	})
	.set(function (v) {
		this.location.coordinates[1] = v
	})

export type Donation = InferSchemaType<typeof schema>
export default model<Donation>('Donation', schema)
