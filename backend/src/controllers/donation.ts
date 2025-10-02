import Donations from '@/models/donations'
import { notify } from '@/utils/notif'
import { AuthRequest } from '@/utils/types'
import { Response } from 'express'

async function newDonation(req: AuthRequest, res: Response) {
	console.log(req.body)

	const donation = await Donations.create({
		...req.body,
		donorId: req.user!.id,
	})

	res.status(201).json({ message: 'New donation added' })
	console.log(`New donation added: ${donation.id} by ${donation.donor}`)

	notify(donation)
}

export default newDonation
