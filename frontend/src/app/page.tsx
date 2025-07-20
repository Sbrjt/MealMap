import Card from '@/app/_component/Card'
import Image from 'next/image'
import Link from 'next/link'

function page() {
	return (
		<div className=''>
			<div className='relative flex flex-col justify-between items-center gap-20 xs:gap-10 xs:p-0 w-full '>
				<Bg />
				<div className='flex flex-col xs:flex-row justify-evenly items-center w-full xs:mt-20 mt-7 px-5 pt-5 gap-10 xs:gap-0'>
					<div className='flex flex-col'>
						<div className='xs:text-5xl text-4xl font-semibold tracking-tight'>
							Turn your surplus into
							<br className='hidden sm:block' /> someone’s next meal.
						</div>
						<div className='text-gray-700 mt-5 xs:text-xl text-lg'>
							Donate leftover food and help feed those in need.
						</div>
						<div className='flex justify-start items-center text-xl gap-15 mt-7'>
							{/* <button className='border  hover:border-black bg-transparent relative group px-3 py-2 hover:rounded-none transition-all'>
								<div
									className='absolute bottom-0 right-0 bg-amber-300 opacity-85 h-full w-full -z-10 rounded group-hover:rounded-none 
                                group-hover:bg-amber-300 group-hover:-bottom-1.5 group-hover:-right-1.5 group-hover:opacity-100 transition-all duration-200'
								/>
								<div>FoodMap</div>
							</button> */}
							<Link
								href='/food-map'
								className='border border-gray-500 hover:border-black bg-transparent relative group px-3 py-2 transition-all'
							>
								<div
									className='absolute -bottom-1.5 -right-1.5 bg-amber-300 opacity-70 h-full w-full -z-10 
                                group-hover:bg-amber-300 group-hover:-bottom-0 group-hover:-right-0 group-hover:opacity-90 transition-all duration-200'
								/>
								<div>FoodMap</div>
							</Link>
							<Link
								href='/donate'
								className="py-2 group transition-all duration-200
                                relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-0 after:bg-black after:duration-300 hover:after:w-full"
							>
								Donate
								<div className='ml-1.5 inline-block transform origin-left group-hover:ml-2.5 group-hover:scale-x-110 transition-all duration-300'>
									→
								</div>
							</Link>
						</div>
					</div>
					<Image
						src='/img/hero-blob.svg'
						alt='image'
						height={100}
						width={100}
						className='xs:h-80 xs:w-auto h-auto w-full px-5 xs:px-0'
					/>
				</div>
				<div
					className='grid grid-cols-1 md:grid-cols-3 gap-5 xs:gap-15 pt-20 px-5 xs:px-30
					 bg-gradient-to-b from-transparent via-amber-50 via-20% to-[#fff39d]'
				>
					<Card
						heading='Drop a Pin'
						text='Donors mark their location and describe available food.'
						icon='location'
					/>
					<Card
						heading='Notify NGOs'
						text='Nearby NGOs get notified instantly.'
						icon='bell'
					/>
					<Card
						heading='Food Pickup'
						text='Food gets picked up and distributed before it goes to waste.'
						icon='truck'
					/>
				</div>
			</div>

			<div
				style={{
					backgroundImage: `url('/img/bg.webp')`,
					borderImage:
						'linear-gradient(to bottom, rgba(255, 243, 157, 1) 20%, rgba(255, 243, 157, 0.9) 50%, rgba(166,95,0,0.3) 100%) 1 fill',
				}}
				className='bg-center bg-no-repeat bg-cover w-full h-screen flex items-center justify-center'
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

function Bg() {
	return (
		<>
			<div className='blur-3xl absolute inset-x-0 -top-40 -z-10 overflow-hidden sm:-top-80 '>
				<div
					style={{
						clipPath:
							'polygon(52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 2% 100%, 2% 100%, 2% 100%, 76.1% 97.7%, 74.1% 44.1%, 100% 2%)',
					}}
					className='relative left-[calc(50%-11rem)] aspect-5/3 w-144.5 -translate-x-1/2 rotate-30 bg-yellow-200 sm:left-[calc(50%-30rem)] sm:w-288.75'
				/>
			</div>

			<div className='blur-3xl absolute inset-x-0 -top-50 -z-10 overflow-hidden '>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className='relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-yellow-200 sm:left-[calc(50%+36rem)] sm:w-288.75'
				/>
			</div>
		</>
	)
}

export default page
