import { Router } from 'express'
import { getUser } from '../controllers/auth'
import verifyToken from '../middlewares/auth'

const router = Router()

router.get('/', verifyToken, getUser)

export default router
