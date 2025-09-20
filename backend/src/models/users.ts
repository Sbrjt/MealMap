import { InferSchemaType, Schema, model } from 'mongoose'

const schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, index: true, required: true },
	phone: String,
	profilePic: String,
	firstLogin: { type: Date, default: Date.now },
	// userType: String,
})

schema.set('toJSON', {
	transform: (_, ret: any) => {
		ret.id = ret._id
		delete ret._id
		delete ret.__v
		delete ret.firstLogin
		return ret
	},
})

export type User = InferSchemaType<typeof schema>
export default model<User>('User', schema)
