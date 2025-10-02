import Session from '@/models/sessions'
import UserModel from '@/models/users'
import { CookieOptions } from 'express'
import { distance } from 'fastest-levenshtein'
import jwt from 'jsonwebtoken'
import ms, { StringValue } from 'ms'
import { env } from 'process'

const { JWT_SECRET } = env

const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: 'strict',
}

function generateAccessToken(userId: string, expiresIn: StringValue = '1h') {
	const token = jwt.sign({ id: userId }, JWT_SECRET!, {
		expiresIn: expiresIn,
	})

	return {
		token,
		options: {
			...cookieOptions,
			maxAge: ms(expiresIn),
		},
	}
}

async function generateRefreshToken(
	userId: string,
	userAgent?: string,
	expiresIn: StringValue = '30d'
) {
	const session = await Session.create({
		userId,
		userAgent,
		expireAt: Date.now() + ms(expiresIn),
	})

	return {
		token: session.id,
		options: {
			...cookieOptions,
			maxAge: ms(expiresIn),
		},
	}
}

async function phoneExists(phone: string) {
	const user = await UserModel.findOne({ phone })
	return user
}

function similar(str1: string, str2: string) {
	const d = distance(str1, str2)
	const similarity = 1 - d / Math.max(str1.length, str2.length)
	return similarity > 0.7
}

export {
	cookieOptions,
	generateAccessToken,
	generateRefreshToken,
	phoneExists,
	similar,
}
