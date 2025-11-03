import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
	res.send('Hello from MealMap')
})

router.get('/xff', (req, res) => {
	const xff = req.headers['x-forwarded-for']
	res.send('Request chain: ' + xff)
})

export default router
