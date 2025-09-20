import { Request, Response } from 'express'
import Subscription from '../models/subscriptions'

async function addToken(req: Request, res: Response) {
	const data = req.body

	const sub = await Subscription.findOneAndUpdate(
		{ endpoint: data.endpoint },
		{ $set: data },
		{ upsert: true, new: true }
	)

	res.status(201).json({ message: 'Notification endpoint added' })
	console.log('Notification endpoint added:', sub.id)
}

export default addToken
