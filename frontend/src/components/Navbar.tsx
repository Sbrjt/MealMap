'use client'
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { useState } from 'react'
import { PiBowlFoodDuotone } from 'react-icons/pi'
import InstallBtn from './InstallBtn'
import NavLink from './NavLink'
import ThemeToggle from './ThemeToggle'
import UserMenu from './UserMenu'
import { MenuButton } from './ui/hambuger'

function Tabs() {
	return (
		<>
			<NavLink href='/food-map'>Food Map</NavLink>
			<NavLink href='/donate'>Donate Food</NavLink>
			<InstallBtn>Get App</InstallBtn>
			<UserMenu />
			<ThemeToggle />
		</>
	)
}

function Navbar() {
	const [open, setOpen] = useState(false)

	return (
		<nav className='flex items-center justify-between py-5 px-6 xs:px-10 shadow-lg bg-white dark:bg-[#1c1c1c] relative z-10'>
			{/* left nav */}
			<Link href='/' className='flex items-center gap-2 text-2xl font-bold'>
				<PiBowlFoodDuotone className='text-3xl' />
				MealMap
			</Link>
			{/* right nav */}
			<div className='hidden text-lg xs:flex items-center justify-end gap-4'>
				<Tabs />
			</div>

			{/* drawer for phone */}
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					{/* Todo: not working */}
					<MenuButton
						className='z-[99999] xs:hidden m-2'
						open={open}
						setOpen={setOpen}
					/>
					{/* <span className='sr-only'>Toggle navigation menu</span> */}
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
