import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import Users from '../models/users'
import { findOrCreateUser, getGooglePayload } from '../utils/auth'

async function googleLogin(req: Request, res: Response) {
	try {
		const { credential } = req.body

		const payload = await getGooglePayload(credential)
		const user = await findOrCreateUser(payload)

		// Create JWT token as a secure HTTP-only cookie

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
				name: user.name,
				phone: user.phone,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '30d' }
		)

		res.cookie('jwt', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		})

		console.log('Logged in:', user.name)
		res.json(user)
	} catch (err) {
		console.error(err)
		res.sendStatus(400)
	}
}

async function phoneLogin(req: Request, res: Response) {
	try {
		const { url } = req.body
		const x = await fetch(url)
		const user = await x.json()
		console.log(user)

		res.sendStatus(200)
	} catch (error) {
		res.sendStatus(500)
	}
}

async function getUser(req: Request, res: Response) {
	const user = await Users.findOne({ _id: req.user.id }).lean()
	res.send(user)
}

function logout(req: Request, res: Response) {
	res.clearCookie('jwt')
	res.sendStatus(200)
}

export { getUser, googleLogin, logout, phoneLogin }
