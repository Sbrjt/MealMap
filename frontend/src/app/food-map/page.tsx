import Skeleton from '@/components/Skeleton'
import Bg from './_components/Bg'
import FoodMap from './_components/FoodMap'
import NotifBtn from './_components/NotifBtn'

function Page() {
	return (
		<div className='flex flex-col justify-evenly xs:px-20 relative h-screen '>
			<Bg />
			<div className='mt-5'>
				<h1 className='text-3xl font-bold mb-2'>FoodMap</h1>
				<h2 className='text-lg text-gray-700 mb-6'>
					These places have food around you!
				</h2>
			</div>

			<div className='w-auto aspect-9/10 xs:aspect-30/11 relative rounded-2xl overflow-hidden border p-1.5 xs:p-2 bg-white shadow-2xl'>
				<Skeleton>
					<FoodMap />
				</Skeleton>
			</div>

			<div className='flex justify-between sm:justify-start items-center mt-6'>
				<div className='text-base text-gray-800'>
					Get notified about nearby donors
				</div>
				<NotifBtn />
			</div>
		</div>
	)
}

export default Page
