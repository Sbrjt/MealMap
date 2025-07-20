import mongoose from 'mongoose'

const mongoURI = process.env.MONGO_URI
const db = process.env.DB

async function connectDb() {
	try {
		await mongoose.connect(mongoURI, { dbName: db })
		console.log(`\tMongo DB: ${db}`)
	} catch (err) {
		console.error('Failed to connect to MongoDB')
		throw err
	}
}

export default connectDb

// https://cloud.mongodb.com/v2/681deaf366aed17ccd6138b3#/metrics/replicaSet/681debfd70089c5348f7ef1e/explorer/production
