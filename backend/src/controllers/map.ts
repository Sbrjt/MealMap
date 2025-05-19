import { Request, Response } from 'express'
import Donations from '../models/donations'

async function allItems(req: Request, res: Response) {
	try {
		const donations = await Donations.aggregate([
			{
				$project: {
					id: '$_id',
					_id: 0, // rename _id to id
					donor: 1,
					longitude: { $arrayElemAt: ['$location.coordinates', 0] },
					latitude: { $arrayElemAt: ['$location.coordinates', 1] },
					description: 1,
					mobile: 1,
					date: 1,
				},
			},
		])

		res.json(donations)
	} catch (err) {
		console.error(err)
		res.status(500)
	}
}

export default allItems
