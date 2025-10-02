import { getUser } from '@/controllers/auth'
import verifyToken from '@/middlewares/auth'
import { Router } from 'express'
import { openAPIRoute } from 'express-zod-openapi-autogen'

const router = Router()

router.get(
	'/user',
	verifyToken,
	openAPIRoute(
		{
			tag: 'Misc',
			summary: 'Get users info',
		},
		getUser
	)
)

export default router
