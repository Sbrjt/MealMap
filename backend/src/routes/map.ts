import { Router } from 'express'
import allItems from '../controllers/map'

const router = Router()

router.get('/all', allItems)

export default router
