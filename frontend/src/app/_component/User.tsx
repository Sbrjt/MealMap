'use client'
import { useSetUser, useUser } from '@/lib/userStore'
import { fetchApi } from '@/lib/utils'
import { useEffect, useState } from 'react'
import GoogleOneTapLogin from 'react-google-one-tap-login'

function User() {
	const user = useUser()
	const setUser = useSetUser()
	const [show, setShow] = useState(false)

	console.log(user)

	useEffect(() => {
		;(async () => {
			const { res, json } = await fetchApi('/api/user')

			if (res.ok) {
				setUser(json)
			} else {
				// check for past login
				if (localStorage.getItem('login')) {
					setShow(true)
				}
			}
		})()
	}, [])

	// google one-tap (show if user is not logged in)
	return (
		<>
			{show && (
				<GoogleOneTapLogin
					googleAccountConfigs={{
						client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
						auto_select: true,
						callback: async ({ credential }) => {
							const { json } = await fetchApi('/api/auth/google', {
								body: { credential },
							})
							setUser(json)
							setShow(false)
							localStorage.setItem('login', 'true')
						},
					}}
				/>
			)}
		</>
	)
}

export default User

// todo: use react-oauth/google
