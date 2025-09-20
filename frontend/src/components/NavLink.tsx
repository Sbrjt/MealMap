'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLink({ href, children }) {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={cn(
				'sm:py-2 sm:px-3 sm:rounded-md sm:text-foreground text-muted-foreground',
				href === pathname || pathname.startsWith(href + '/')
					? 'sm:bg-gray-200 text-foreground '
					: 'sm:hover:bg-gray-100 hover:text-foreground'
			)}
		>
			{children}
		</Link>
	)
}

export default NavLink
