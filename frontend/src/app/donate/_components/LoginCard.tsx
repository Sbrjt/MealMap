'use client'
import useAuth from '@/hooks/useAuth'
import 'react-phone-input-2/lib/style.css'
import GoogleLogin from './GoogleLogin'
import PhoneOtp from './PhoneOtp'

function LoginCard() {
	const { user } = useAuth()

	return (
		<div className='sm:w-1/3 py-8 w-full px-3 border flex flex-col items-center justify-evenly gap-5 rounded-xl min:h-1/2 sm:min-h-[40%]'>
			{!user ? (
				<>
					Please sign to continue...
					<GoogleLogin />
				</>
			) : (
				<PhoneOtp />
			)}
		</div>
	)
}

export default LoginCard
