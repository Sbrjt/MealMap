import FoodMap from '@/components/FoodMap'
import NotifBtn from '@/components/NotifBtn.jsx'
import Skeleton from '@/components/Skeleton'

function Page() {
	return (
		<div className='bg-white mt-10 xs:px-20'>
			<div className='max-w-7xl mx-auto my-5 px-4'>
				<h1 className='text-2xl font-bold mb-2'>FoodMap</h1>
				<h4 className='text-lg text-gray-700 mb-6'>
					These places have food around you!
				</h4>

				<div className='w-auto aspect-9/10 xs:aspect-10/4 relative rounded-2xl overflow-hidden border p-1.5 xs:p-2'>
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
		</div>
	)
}

export default Page
