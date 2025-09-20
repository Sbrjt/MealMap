import { Router } from 'express'
import { openAPIRoute } from 'express-zod-openapi-autogen'
import { allItems, getItem } from '../controllers/map'
import { MapItemSchema } from '../utils/schemas'

const router = Router()

router.get(
	'/map/all',
	openAPIRoute(
		{
			tag: 'Map',
			summary: 'Get coordinates of donations',
		},
		allItems
	)
)

// todo
router.get(
	'/map',
	openAPIRoute(
		{
			tag: 'Map',
			summary: 'Donation details',
			query: MapItemSchema,
		},
		getItem
	)
)

export default router
