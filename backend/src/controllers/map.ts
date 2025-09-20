import { Request, Response } from 'express'
import Donations from '../models/donations'

async function allItems(req: Request, res: Response) {
	const donations = await Donations.aggregate([
		{
			$project: {
				id: '$_id',
				_id: 0, // rename _id to id
				longitude: { $arrayElemAt: ['$location.coordinates', 0] },
				latitude: { $arrayElemAt: ['$location.coordinates', 1] },
			},
		},
	])

	res.json(donations)
}

async function getItem(req: Request, res: Response) {
	const { id } = req.query
	const donation = await Donations.findOne({ _id: id })
		.select('description date donor')
		.populate('donorId', 'phone profilePic -_id')
		.lean()

	if (!donation) {
		res.status(404).send({ error: 'Not found' })
		return
	}

	res.json({
		description: donation.description,
		date: donation.date,
		donor: {
			name: donation.donor,
			phone: donation.donorId.phone,
			profilePic: donation.donorId.profilePic,
		},
	})
}

export { allItems, getItem }
