'use client'
import { useSetUser } from '@/lib/userStore'
import { fetchApi } from '@/lib/utils'
import {
	GoogleLogin,
	GoogleOAuthProvider,
} from '@react-oauth/google'

function GLogin() {
	const setUser = useSetUser()

	return (
		<GoogleOAuthProvider
			clientId={
				process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
			}
		>
			<GoogleLogin
				onSuccess={async ({ credential }) => {
					console.log(credential)

					const { json } = await fetchApi(
						'/api/auth/google',
						{
							body: { credential },
						}
					)
					setUser(json)
					localStorage.setItem('login', 'true')
				}}
			/>
		</GoogleOAuthProvider>
	)
}

export default GLogin
