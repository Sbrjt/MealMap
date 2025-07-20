import 'dotenv/config'
import express from 'express'
import tools from './middlewares/tools'
import authRoute from './routes/auth'
import donationRoute from './routes/donation'
import mapRoute from './routes/map'
import notifRoute from './routes/notif'
import userRoute from './routes/user'
import logInfo from './utils/info'
import connectDb from './utils/mongo'

logInfo()

const app = express()

app.use(tools)

await connectDb()

app.get('/', (req, res) => {
	const xff = req.headers['x-forwarded-for']
	res.send(`Hello from Express! \n${xff ?? ''}`)
})

app.use('/donation', donationRoute)
app.use('/map', mapRoute)
app.use('/subscribe', notifRoute)
app.use('/auth', authRoute)
app.use('/user', userRoute)

// app.get('/test', verifyToken, (req, res) => {
// 	console.log(req?.user)

// 	res.json({ hi: 'hi' })
// })

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`\tServer: http://localhost:${process.env.PORT}`)
})
