'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLink({ href, children }) {
	const pathname = usePathname()
	const isSelected = href === pathname || pathname.startsWith(href + '/')

	return (
		<Link
			href={href}
			className={cn(
				'sm:py-2 sm:px-3 sm:rounded-md sm:text-foreground text-muted-foreground',
				isSelected
					? 'sm:bg-accent text-foreground'
					: 'sm:hover:bg-muted hover:text-foreground'
			)}
		>
			{children}
		</Link>
	)
}

export default NavLink
