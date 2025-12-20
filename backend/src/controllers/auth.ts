import Session from '@/models/sessions'
import User from '@/models/users'
import {
	generateAccessToken,
	generateRefreshToken,
	phoneExists,
} from '@/utils/auth'
import { getGooglePayload } from '@/utils/oauth'
import { sendOtp, validateOtp } from '@/utils/otp'
import { AuthRequest } from '@/utils/types'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

async function googleLogin(req: Request, res: Response) {
	const { credential } = req.body
	// console.log(credential)

	const payload = await getGooglePayload(credential)

	if (!payload) {
		res.status(400).send({ error: 'Invalid Google credential' })
		return
	}

	const user = await User.findOneAndUpdate(
		{ email: payload.email },
		{
			$set: {
				email: payload.email,
				name: payload.name,
				profilePic: payload.picture,
			},
		},
		{ upsert: true, new: true }
	)

	const accessToken = generateAccessToken(user.id)
	res.cookie('access_token', accessToken.token, accessToken.options)

	const refreshToken = await generateRefreshToken(
		user.id,
		req.get('user-agent')
	)
	res.cookie('refresh_token', refreshToken.token, refreshToken.options)

	res.json(user)

	console.log('Logged in:', user.name)
}

async function phoneLogin(req: AuthRequest, res: Response) {
	const { phone } = req.body

	if (await phoneExists(phone)) {
		res.status(400).json({ error: 'Phone no. already in use.' })
		return
	}

	await sendOtp(phone, req.user!.id)
	res.json({ message: 'OTP sent' })

	console.log('OTP sent to: ', phone)
}

async function verifyOtp(req: AuthRequest, res: Response) {
	const phone = validateOtp(req.user!.id, req.body.otp)

	if (!phone) {
		res.status(400).json({ error: 'Incorrect OTP' })
		return
	}

	await User.findByIdAndUpdate(req.user!.id, { phone })
	res.json('Phone verified')
	console.log('Verified:', phone)
}

function logout(req: AuthRequest, res: Response) {
	res.clearCookie('access_token')
	res.clearCookie('refresh_token')
	res.json({ message: 'Logged out' })

	Session.findByIdAndDelete(req.cookies.refresh_token)
	// to logout from all devices delete all sessions
}

async function getUser(req: AuthRequest, res: Response) {
	const id = req.user?.id

	const user = await User.findById(id)

	if (!user) {
		res.status(404).json({ error: 'User not found' })
		return
	}

	res.send(user)
}

export { getUser, googleLogin, logout, phoneLogin, verifyOtp }
