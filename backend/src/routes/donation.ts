import { Router } from 'express'
import { openAPIRoute } from 'express-zod-openapi-autogen'
import newDonation from '../controllers/donation'
import verifyToken from '../middlewares/auth'
import { DonationSchema } from '../utils/schemas'

const router = Router()

router.post(
	'/donation/new',
	verifyToken,
	openAPIRoute(
		{
			tag: 'Map',
			summary: 'Add a donation',
			body: DonationSchema,
		},
		newDonation
	)
)

export default router
