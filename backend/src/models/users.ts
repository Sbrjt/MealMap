import { InferSchemaType, Schema, model } from 'mongoose'

const schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, index: true, required: true },
	phone: String,
	profilePic: String,
	userType: String,
	firstLogin: { type: Date, default: Date.now },
})

export type User = InferSchemaType<typeof schema>
export default model<User>('User', schema)
