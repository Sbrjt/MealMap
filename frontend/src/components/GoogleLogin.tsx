'use client'
import useAuth from '@/hooks/useAuth'
import fetchApi from '@/lib/fetch'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

function GLogin() {
	const { setUser } = useAuth()

	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
			<GoogleLogin
				onSuccess={async ({ credential }) => {
					const { json } = await fetchApi('/api/auth/google', {
						body: { credential },
					})
					setUser(json)
					localStorage.setItem('login', 'true')
				}}
			/>
		</GoogleOAuthProvider>
	)
}

export default GLogin
