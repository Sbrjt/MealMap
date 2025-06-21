import { Router } from 'express'
import { googleLogin, logout, phoneLogin } from '../controllers/auth'
import verifyToken from '../middlewares/auth'

const router = Router()

router.post('/google', googleLogin)
router.post('/phone', verifyToken, phoneLogin)
router.get('/logout', logout)

export default router
