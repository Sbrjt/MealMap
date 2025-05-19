import { Router } from 'express'
import addToken from '../controllers/notif'

const router = Router()

router.post('/', addToken)

export default router
