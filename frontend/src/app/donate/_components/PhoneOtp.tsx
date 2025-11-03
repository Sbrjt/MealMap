'use client'
import { Button } from '@/components/ui/button'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { useSetUser, useUser } from '@/lib/userStore'
import { fetchApi } from '@/lib/utils'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function PhoneOtp() {
	const [country, setCountry] = useState<string>('in')
	const user = useUser()
	const setUser = useSetUser()
	const [phone, setPhone] = useState<string>('')
	const [otp, setOtp] = useState<string>('')
	const [showOtp, setShowOtp] = useState(false)
	const [wrongOtp, setWrongOtp] = useState<boolean>(false)

	useEffect(() => {
		;(async () => {
			const { json } = await fetchApi('https://ipwho.is/')
			setCountry(json.country_code.toLowerCase())
		})()
	}, [])

	async function sendOtp() {
		const { res } = await fetchApi('/api/auth/phone', { body: { phone } })

		if (res.ok) {
			setShowOtp(true)
		}
	}

	async function verifyOtp() {
		if (otp.length !== 4) {
			return
		}

		const { res, json } = await fetchApi('/api/auth/verify-otp', {
			body: { otp, phone },
		})
		if (res.ok) {
			setUser({ ...user!, phone })
		} else {
			setWrongOtp(true)
			setTimeout(() => {
				setWrongOtp(false)
			}, 5000)
		}
	}

	function skip() {
		setUser({ ...user!, phone: 'skipped' })
	}

	return (
		<>
			{!showOtp ? (
				<>
					Verify phone number
					<div>
						<PhoneInput
							country={country}
							value={phone}
							onChange={(value) => setPhone(value)}
						/>
					</div>
					<div className='flex justify-around gap-5'>
						<Button onClick={sendOtp}>Go</Button>
						<Button onClick={skip} variant='outline'>
							Skip
						</Button>
					</div>
				</>
			) : (
				<>
					Enter OTP:
					<InputOTP
						maxLength={4}
						value={otp}
						onChange={(value) => setOtp(value)}
						pattern={REGEXP_ONLY_DIGITS}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
						</InputOTPGroup>
					</InputOTP>
					<Button onClick={verifyOtp}>Go</Button>
					{wrongOtp && <div className='text-red-900 text-sm'>Wrong OTP!</div>}
				</>
			)}
		</>
	)
}

export default PhoneOtp
