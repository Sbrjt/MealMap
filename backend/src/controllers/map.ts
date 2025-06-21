import { Request, Response } from 'express'
import Donations from '../models/donations'

async function allItems(req: Request, res: Response) {
	try {
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
	} catch (err) {
		console.error(err)
		res.status(500)
	}
}

async function getItem(req: Request, res: Response) {
	try {
		const { id } = req.query
		const donations = await Donations.findOne({ _id: id }).select(
			'donor description date'
		)

		res.json(donations)
	} catch (err) {
		console.error(err)
		res.status(500)
	}
}

export { allItems, getItem }
