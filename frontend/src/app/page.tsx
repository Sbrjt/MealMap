import Card from '@/components/ui/card'
import Image from 'next/image'

function page() {
	return (
		<div className='flex flex-col justify-between items-center gap-20 xs:gap-40 xs:p-0 bg-amber-50'>
			<div className='flex flex-col xs:flex-row justify-evenly items-center w-full xs:mt-20 mt-7 px-5 gap-10 xs:gap-0 '>
				<div>
					<p className='xs:text-5xl text-4xl'>
						Turn your surplus into
						<br className='hidden sm:block' /> someone’s next meal.
					</p>
					<p className='font-light mt-5 xs:text-xl text-lg'>
						Donate leftover food and help feed those in need.
					</p>
				</div>
				<Image
					src='/hero-blob.svg'
					alt='image'
					height={0}
					width={0}
					className='xs:h-96 xs:w-auto h-auto w-full px-5 xs:px-0'
				/>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-5 xs:gap-15 px-5 xs:px-30'>
				<Card
					heading='📍 Drop a Pin'
					text='Donors mark their location and describe available food.'
				/>
				<Card
					heading='🔔 Notify NGOs'
					text='Nearby NGOs get notified instantly.'
				/>
				<Card
					heading='🚚 Food Pickup'
					text='Food gets picked up and distributed before it goes to waste.'
				/>
			</div>

			<div
				style={{
					backgroundImage: `url('/bg.webp')`,
					borderImage:
						'linear-gradient(to bottom, rgba(255,251,235,1) 20%, rgba(166,95,0,0.3) 100%) 1 fill',
				}}
				className='bg-center bg-no-repeat bg-cover w-full pb-32 xs:py-20 xs:h-120'
			>
				<div className='text-center'>
					<p className='text-2xl px-5 xs:px-0 xs:text-4xl font-bold mb-2'>
						If you can’t feed a hundred people
						<br className='hidden sm:block' /> then feed just one.
					</p>
					<p className='text-lg italic'>~ Mother Teresa</p>
				</div>
			</div>
		</div>
	)
}

export default page
// f0b100
