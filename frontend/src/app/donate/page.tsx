'use client'
import { useSetUser, useUser } from '@/lib/userStore'
import DonateBtn from './_components/DonateBtn'
import LoginCard from './_components/LoginCard'

function Donate() {
	const user = useUser()

	return (
		<div className='flex justify-evenly flex-col sm:items-center gap h-full px-5 pb-10 relative'>
			{/* <Bg /> */}

			<div className='flex flex-col sm:items-center gap-10'>
				{user && (
					<div className='text-5xl flex'>
						<div>Hi, {user.name}!</div>
						<div className='h-[1lh]'>
							<img
								src='img//waving-hand.svg'
								className='h-full w-auto wiggle pl-2 origin-bottom'
							/>
						</div>
					</div>
				)}
				<div className='text-2xl font-light text-gray-700'>
					MealMap is made possible by people like you.
				</div>
			</div>

			{user?.phone ? <DonateBtn /> : <LoginCard />}
		</div>
	)
}

export default Donate
