import { useClearUser } from '@/lib/userStore'
import { fetchApi } from '@/lib/utils'
import { LuLogOut } from 'react-icons/lu'

function Logout() {
	const clearUser = useClearUser()

	function logout() {
		fetchApi('api/auth/logout')
		clearUser()
	}

	return (
		<button
			onClick={logout}
			className='flex items-center justify-between gap-2'
		>
			<div>Logout</div>
			<div>
				<LuLogOut />
			</div>
		</button>
	)
}

export default Logout
