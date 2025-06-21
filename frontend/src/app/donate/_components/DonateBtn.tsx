import Link from 'next/link'

function DonateBtn() {
	return (
		<Link
			href='/donate/form'
			className='text-xl px-5 py-3 rounded-md border border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200'
		>
			Start a donation now!
		</Link>
	)
}

export default DonateBtn
