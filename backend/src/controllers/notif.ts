import Subscription from '@/models/subscriptions'
import { testNotif } from '@/utils/notif'
import { Request, Response } from 'express'

async function addToken(req: Request, res: Response) {
	const data = req.body

	if (!(await testNotif(data))) {
		res.status(400).json({ error: 'Failed to subscibe' })
		return
	}

	const sub = await Subscription.findOneAndUpdate(
		{ endpoint: data.endpoint },
		{ $set: data },
		{ upsert: true, new: true }
	)

	res.status(201).json({ message: 'Notification endpoint added' })
	console.log('Notification endpoint added:', sub.id)
}

export default addToken
