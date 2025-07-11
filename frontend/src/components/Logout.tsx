import useAuth from '@/hooks/useAuth'
import fetchApi from '@/lib/fetch'

function Logout() {
	const { setUser } = useAuth()

	function logout() {
		fetchApi('api/auth/logout')
		setUser(null)
	}

	return <button onClick={logout}>Logout</button>
}

export default Logout
