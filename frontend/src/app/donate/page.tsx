'use client'
import useAuth from '@/hooks/useAuth'
import DonateBtn from './_components/DonateBtn'
import LoginCard from './_components/LoginCard'

function Page() {
	const { user } = useAuth()

	return (
		<div className='flex flex-col sm:items-center pt-28 gap-20 h-full px-5'>
			<div className='flex flex-col sm:items-center gap-10'>
				{user && (
					<div className='text-4xl flex'>
						<div>Hi, {user.name}!</div>
						<div className='h-10'>
							<img
								src='/waving-hand.svg'
								className='h-full w-auto wiggle pl-2 origin-bottom'
							/>
						</div>
					</div>
				)}
				<div className='text-xl font-light text-gray-700'>
					MealMap is made possible by people like you.
				</div>
			</div>

			{user ? <DonateBtn /> : <LoginCard />}
			{/* <Logout /> */}
		</div>
	)
}

export default Page
