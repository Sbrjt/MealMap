import { Request, Response } from 'express'
import Subscription from '../models/subscriptions'

async function addToken(req: Request, res: Response) {
	try {
		const data = req.body

		const sub = await Subscription.findOneAndUpdate(
			{ endpoint: data.endpoint },
			{ $set: data },
			{ upsert: true, new: true }
		)

		console.log('Notification endpoint added:', sub.id)
		res.sendStatus(201)
	} catch (err) {
		console.error(err)
		res.sendStatus(400)
	}
}

export default addToken
