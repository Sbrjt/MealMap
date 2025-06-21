import GoogleLogin from '@/components/GoogleLogin'

function LoginCard() {
	return (
		<div className='px-20 py-20 border rounded-xl'>
			Please sign to continue...
			<GoogleLogin />
		</div>
	)
}

export default LoginCard
