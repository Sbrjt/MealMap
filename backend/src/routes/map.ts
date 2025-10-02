import { allItems, getItem } from '@/controllers/map'
import { MapItemSchema } from '@/utils/schemas'
import { Router } from 'express'
import { openAPIRoute } from 'express-zod-openapi-autogen'

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

// bug: query not showing in swagger docs
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
