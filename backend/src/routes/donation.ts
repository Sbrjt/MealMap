import { Router } from 'express'
import newDonation from '../controllers/donation'

const router = Router()

router.post('/new', newDonation)

export default router
