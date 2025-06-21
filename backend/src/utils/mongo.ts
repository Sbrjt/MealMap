import mongoose from 'mongoose'

const mongoURI = process.env.MONGO_URI
const db = process.env.DB

async function connectDb() {
	try {
		await mongoose.connect(mongoURI, { dbName: db })
		console.log(`\tMongo DB: ${db}`)
	} catch (err) {
		console.error('Failed to connect to MongoDB:\n', err)
		process.exit(1)
	}
}

export default connectDb
