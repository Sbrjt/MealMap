import 'dotenv/config';
import express from 'express';
import tools from './middlewares/tools';
import donationRoute from './routes/donation';
import mapRoute from './routes/map';
import notifRoute from './routes/notif';
import logInfo from './utils/info';
import connectDb from './utils/mongo';

logInfo()

const app = express()


app.get('/ip', (req, res) => {
    const xff = req.headers['x-forwarded-for'];
    res.send(`X-Forwarded-For header: ${xff}`);
  });

  
app.use(tools)
app.set('trust proxy', 2);

connectDb()

app.get('/', (req, res) => {
	res.send('Hello from Express!')
})

app.use('/donation', donationRoute)
app.use('/map', mapRoute)
app.use('/subscribe', notifRoute)
app.get('/test', (req, res) => {
	res.json({ hi: 'hi' })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`\tServer: http://localhost:${process.env.PORT}`)
})
