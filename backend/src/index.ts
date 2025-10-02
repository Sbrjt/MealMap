import 'dotenv/config'

import { errorHandler, notFoundHandler } from '@/middlewares/errors'
import middlewares from '@/middlewares/tools'
import authRoute from '@/routes/auth'
import donationRoute from '@/routes/donation'
import mapRoute from '@/routes/map'
import notifRoute from '@/routes/notif'
import userRoute from '@/routes/user'
import printInfo from '@/utils/info'
import connectDb from '@/utils/mongo'
import { createSwaggerDocs } from '@/utils/swagger'
import express from 'express'
import { env } from 'process'
import swaggerUI from 'swagger-ui-express'

printInfo()
const { PORT } = env
await connectDb()

const app = express()
app.use(middlewares)

app.get('/', (req, res) => {
	const xff = req.headers['x-forwarded-for']

	res.send(`Hello from Express! \n${xff ?? ''}`)
})

const routes = [donationRoute, mapRoute, notifRoute, authRoute, userRoute]

for (const route of routes) {
	app.use(route)
}

// for swagger docs
app.use('/docs', swaggerUI.serve, swaggerUI.setup(createSwaggerDocs(routes)))

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`\tServer: http://localhost:${PORT}/docs`)
})
