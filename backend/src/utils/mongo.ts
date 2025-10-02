import mongoose from 'mongoose'
import { env } from 'process'

const { MONGO_URI, DB } = env

async function connectDb() {
	try {
		await mongoose.connect(MONGO_URI!, { dbName: DB })
		console.log(`\tMongo DB: ${DB}`)
	} catch (err) {
		console.error('Failed to connect to MongoDB')
		throw err
	}
}

export default connectDb

// https://cloud.mongodb.com/v2/681deaf366aed17ccd6138b3#/metrics/replicaSet/681debfd70089c5348f7ef1e/explorer/production
