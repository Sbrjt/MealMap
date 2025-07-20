function Bg() {
	return (
		<>
			<div className='blur-3xl absolute inset-x-0 -top-40 -z-10 overflow-hidden sm:-top-80 '>
				<div
					style={{
						clipPath:
							'polygon(52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%, 100% 2%)',
					}}
					className='relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-orange-300 to-yellow-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75'
				/>
			</div>

			<div className='blur-3xl absolute inset-x-0 -top-50 -z-10 overflow-hidden '>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className='relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-orange-300 to-yellow-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75'
				/>
			</div>
		</>
	)
}

export default Bg
