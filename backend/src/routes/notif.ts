import addToken from '@/controllers/notif'
import { NotifTokenSchema } from '@/utils/schemas'
import { Router } from 'express'
import { openAPIRoute } from 'express-zod-openapi-autogen'

const router = Router()

router.post(
	'/subscribe',
	openAPIRoute(
		{
			tag: 'Misc',
			summary: 'Subscribe to push notification',
			body: NotifTokenSchema,
		},
		addToken
	)
)

export default router
