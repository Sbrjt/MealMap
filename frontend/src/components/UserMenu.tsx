'use client'
import Menu, { MenuItem, MenuTrigger } from '@/components/ui/hover-menu'
import { useUser } from '@/lib/userStore'
import Logout from './Logout'

function UserMenu() {
	const user = useUser()

	return (
		<>
			{user && (
				<Menu>
					<MenuTrigger>
						<div className='h-9 w-9 rounded-full bg-linear-to-tr from-orange-400 to-yellow-300 overflow-hidden cursor-pointer'>
							<img
								src={user.profilePic}
								className='h-full cursor-pointer p-0.5 rounded-full'
							/>
						</div>
					</MenuTrigger>
					<MenuItem>
						<div className='flex flex-col gap-y-4 text-sm'>
							Welcome {user.name}!
							<Logout />
						</div>
					</MenuItem>
				</Menu>
			)}
		</>
	)
}

export default UserMenu
