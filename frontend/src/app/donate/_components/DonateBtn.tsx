import Link from 'next/link'

function DonateBtn() {
	return (
		<Link
			href='/donate/form'
			className='-mt-20 text-3xl px-5 py-3 rounded-md border border-black dark:bg-[#695f38] bg-white text-foreground hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-primary transition duration-200'
		>
			Start a donation now!
		</Link>
	)
}

export default DonateBtn
