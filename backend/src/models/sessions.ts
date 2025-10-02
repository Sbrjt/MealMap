import { InferSchemaType, Schema, model } from 'mongoose'

const schema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
			index: true,
		},
		userAgent: {
			type: String,
			default: 'unknown',
		},
		used: {
			type: Boolean,
			default: false,
		},
		expireAt: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
)

schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

export type Session = InferSchemaType<typeof schema>
export default model<Session>('Session', schema)
