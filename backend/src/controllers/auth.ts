import { Request, Response } from 'express'
import User from '../models/users'
import {
	cookieOptions,
	findOrCreateUser,
	jwtToken,
	phoneExists,
} from '../utils/auth'
import { getGooglePayload } from '../utils/oauth'
import { sendOtp, validateOtp } from '../utils/otp'
import { AuthRequest } from '../utils/types'

async function googleLogin(req: Request, res: Response) {
	const { credential } = req.body

	const payload = await getGooglePayload(credential)

	if (!payload) {
		res.status(400).send({ error: 'Invalid Google credential' })
		return
	}

	const user = await findOrCreateUser(payload)

	// create JWT token and send it as a secure HTTP-only cookie

	const token = jwtToken({
		id: user.id,
		email: user.email,
		name: user.name,
		phone: user?.phone,
	})

	res.cookie('jwt', token, cookieOptions)
	res.json(user)

	console.log('Logged in:', user.name)
}

async function phoneLogin(req: AuthRequest, res: Response) {
	const { phone } = req.body

	if (await phoneExists(phone)) {
		res.status(400).json({ error: 'Phone no. already in use.' })
		return
	}

	await sendOtp(phone, req.user.id)
	res.json({ message: 'OTP sent' })

	console.log('OTP sent to: ', phone)
}

async function verifyOtp(req: AuthRequest, res: Response) {
	const phone = validateOtp(req.user.id, req.body.otp)

	if (!phone) {
		res.status(400).json({ error: 'Incorrect OTP' })
		return
	}

	await User.findByIdAndUpdate(req.user.id, { phone })
	res.json('Phone verified')
	console.log('Verified:', phone)
}

function logout(req: Request, res: Response) {
	res.clearCookie('jwt')
	res.json({ message: 'Logged out' })
}

async function getUser(req: AuthRequest, res: Response) {
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(404).json({ error: 'User not found' })
		return
	}

	res.send(user)
}

export { getUser, googleLogin, logout, phoneLogin, verifyOtp }
