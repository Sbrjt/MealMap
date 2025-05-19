import { Request, Response } from 'express'
import Donations from '../models/donations'
import notify from '../utils/notif'

async function newDonation(req: Request, res: Response) {
	try {
		const newDonation = new Donations(req.body)
		const saved = await newDonation.save()

		console.log(`New donation added: ${saved.id} by ${saved.donor}`)

		notify(newDonation)
		res.sendStatus(201)
	} catch (err) {
		console.error(err)
		res.sendStatus(400)
	}
}

export default newDonation
