'use client'
import { Button } from '@/components/ui/button'
import Menu from '@/components/ui/hover-menu'
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { PiBowlFoodDuotone } from 'react-icons/pi'
import InstallBtn from './InstallBtn'
import NavLink from './NavLink'
import UserMenu from './UserMenu'

function Tabs() {
	return (
		<>
			<NavLink href='/food-map'>Food Map</NavLink>
			<NavLink href='/donate'>Donate Food</NavLink>
			<InstallBtn>Get App</InstallBtn>
			<UserMenu />
			{/* <ThemeToggle /> */}
		</>
	)
}

function Navbar() {
	return (
		<nav className='flex items-center justify-between py-4 px-6 xs:px-10 shadow-lg bg-white relative z-10'>
			{/* left nav */}
			<Link href='/' className='flex items-center gap-2 text-2xl font-bold'>
				<PiBowlFoodDuotone className='text-3xl' />
				MealMap
			</Link>
			{/* right nav */}
			<div className='hidden text-sm xs:flex items-center justify-end gap-4'>
				<Tabs />
			</div>

			{/* drawer for phone */}
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='ghost' size='icon' className='shrink-0 xs:hidden'>
						<Menu>{''}</Menu>
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='right' className='flex pl-14 pt-10'>
					<SheetTitle className='sr-only'>navbar</SheetTitle>
					<div className='grid gap-6 text-lg font-medium'>
						<Link href='/' className='text-xl font-bold'>
							MealMap
						</Link>
						<Tabs />
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	)
}

export default Navbar
