import compression from 'compression'
import { Router } from 'express'
import { allItems, getItem } from '../controllers/map'

const router = Router()

router.get('/all', compression(), allItems)
router.get('/', getItem)

export default router
