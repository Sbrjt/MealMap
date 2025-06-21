import fetchApi from '@/lib/fetch'
import { useEffect } from 'react'

const PhoneLogin = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://www.phone.email/sign_in_button_v1.js'
		script.async = true
		document.querySelector('.pe_signin_button').appendChild(script)

		window.phoneEmailListener = function (user) {
			const url = user.user_json_url
			console.log(url)
			fetchApi('/api/auth/phone', { body: { url } })
		}

		return () => {
			window.phoneEmailListener = null
		}
	}, [])

	return (
		<div
			className='pe_signin_button'
			data-client-id='15695407177920574360'
		></div>
	)
}

export default PhoneLogin
