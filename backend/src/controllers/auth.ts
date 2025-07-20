import { Request, Response } from 'express'
import User from '../models/users'
import { cookieOptions, findOrCreateUser, jwtToken } from '../utils/auth'
import { getGooglePayload } from '../utils/oauth'
import { otpCache, sendOtp } from '../utils/otp'

async function googleLogin(req: Request, res: Response) {
	try {
		const { credential } = req.body

		const payload = await getGooglePayload(credential)
		const user = await findOrCreateUser(payload)

		// Create JWT token as a secure HTTP-only cookie

		const token = jwtToken({
			id: user.id,
			email: user.email,
			name: user.name,
			phone: user?.phone,
		})

		res.cookie('jwt', token, cookieOptions)

		console.log('Logged in:', user.name)
		res.json(user)
	} catch (err) {
		console.error(err)
		res.sendStatus(400)
	}
}

async function phoneLogin(req: Request, res: Response) {
	const { phone } = req.body

	try {
		await sendOtp(phone)
		res.sendStatus(200)
		console.log('OTP sent to: ', phone)
	} catch (err) {
		console.error('Error sending OTP:', err)
		res.sendStatus(500)
	}
}

async function verifyOtp(req: any, res: Response) {
	try {
		const { otp, phone } = req.body

		if (otpCache.get(phone) == null) {
			res.status(400).json({ error: 'OTP expired' })
			return
		}

		if (otpCache.get(phone) === otp) {
			const user = await User.findById(req.user.id)
			user.phone = phone
			user.save()

			const token = jwtToken({
				id: user.id,
				email: user.email,
				name: user.name,
				phone: user.phone,
			})

			res.cookie('jwt', token, cookieOptions)

			console.log('Verified:', phone)

			res.sendStatus(200)
			return
		}

		res.status(400).json({ error: 'Incorrect OTP' })
	} catch (error) {
		res.sendStatus(500)
	}
}

async function getUser(req: any, res: Response) {
	try {
		const user = await User.findById(req.user.id)

		if (user) {
			res.send(user)
		} else {
			res.sendStatus(400)
		}
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}

function logout(req: Request, res: Response) {
	res.clearCookie('jwt')
	res.sendStatus(200)
}

export { getUser, googleLogin, logout, phoneLogin, verifyOtp }
