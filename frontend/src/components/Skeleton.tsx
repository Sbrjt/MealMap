/* 
Use it like:

<Skeleton>
    <Child />
</Skeleton> 

*/

function Skeleton({ children }) {
	return (
		<div className='relative w-full h-full'>
			{/* below */}
			<div className='p-5 gap-5 flex flex-col absolute inset-0'>
				<div className='flex justify-between'>
					<div className='flex flex-auto flex-col justify-around'>
						<div className='h-4 w-3/4 rounded-full skeleton' />
						<div className='h-4 w-1/2 rounded-full skeleton' />
					</div>
					<div className='w-16 h-16 rounded-full skeleton' />
				</div>
				<div className='h-32 skeleton'></div>
				<div className='flex justify-between space-x-4'>
					<div className='w-40 rounded-full skeleton' />
					<div className='flex flex-auto flex-col gap-3 items-end'>
						<div className='h-4 w-full rounded-full skeleton' />
						<div className='h-4 w-3/4 rounded-full skeleton' />
					</div>
				</div>
			</div>

			{/* above */}
			{!!children && <div className='absolute inset-0 z-10'> {children} </div>}
		</div>
	)
}

export default Skeleton
