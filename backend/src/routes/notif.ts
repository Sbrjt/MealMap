import { Router } from 'express'
import { openAPIRoute } from 'express-zod-openapi-autogen'
import addToken from '../controllers/notif'

const router = Router()

router.post(
	'/subscribe',
	openAPIRoute(
		{
			tag: 'Misc',
			summary: 'Subscribe to push notification',
		},
		addToken
	)
)

export default router
