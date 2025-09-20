'use client'
import { useSetUser, useUser } from '@/lib/userStore'
import DonateBtn from './_components/DonateBtn'
import LoginCard from './_components/LoginCard'

function Donate() {
	const user = useUser()
	const setUser = useSetUser()

	return (
		<div className='flex justify-evenly flex-col sm:items-center gap-2 h-full px-5 relative'>
			{/* <Bg /> */}

			<div className='flex flex-col sm:items-center gap-10'>
				{user && (
					<div className='text-4xl flex'>
						<div>Hi, {user.name}!</div>
						<div className='h-10'>
							<img
								src='img//waving-hand.svg'
								className='h-full w-auto wiggle pl-2 origin-bottom'
							/>
						</div>
					</div>
				)}
				<div className='text-xl font-light text-gray-700'>
					MealMap is made possible by people like you.
				</div>
			</div>

			{user?.phone ? <DonateBtn /> : <LoginCard />}
			{/* <Logout /> */}
		</div>
	)
}

export default Donate
