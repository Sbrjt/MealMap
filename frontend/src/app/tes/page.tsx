'use client'

export default function Example() {
	return (
		<div className='relative w-full h-64 border border-black'>
			<div className='p-4 text-center'>
				<h1 className='text-lg font-bold'>This is normal text</h1>
				<p>It behaves like a normal tag but sits above the overlays</p>
			</div>
			<div className='absolute inset-0 bg-blue-200 opacity-50'>lklk</div>
			<div className='absolute inset-0 bg-red-200 opacity-50'>sgdjla</div>
		</div>
	)
}
