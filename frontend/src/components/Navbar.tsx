import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { PiBowlFoodDuotone } from 'react-icons/pi'
import InstallBtn from './InstallBtn'

function Navbar({
	actions = [
		{ text: 'Food Map', href: '/food-map' },
		{ text: 'Donate Food', href: '/donate' },
		{ text: 'Get App', isButton: true },
	],
}: any) {
	return (
		<div className='px-6 xs:px-10 shadow-lg bg-white relative'>
			<div className='max-w-container relative mx-auto'>
				<nav className='flex items-center justify-between py-4'>
					{/* left nav */}
					<Link href='/' className='flex items-center gap-2 text-2xl font-bold'>
						<PiBowlFoodDuotone className='text-3xl' />
						MealMap
					</Link>

					{/* right nav */}
					<div className='hidden text-sm xs:flex items-center justify-end gap-4'>
						{actions.map((action, i) =>
							action?.isButton ? (
								<div key={i}>
									<InstallBtn>{action.text}</InstallBtn>
								</div>
							) : (
								<Link
									key={i}
									href={action.href}
									className='hover:bg-[#f5f5f5] py-2 px-3 rounded-md'
								>
									{action.text}
								</Link>
							)
						)}
					</div>

					{/* drawer for mobile */}
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='shrink-0 xs:hidden'
							>
								<Menu className='size-5' />
								<span className='sr-only'>Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right'>
							<nav className='grid gap-6 text-lg font-medium'>
								<Link
									href='/'
									className='flex items-center gap-2 text-xl font-bold'
								>
									<span>MealMap</span>
								</Link>

								{actions.map((action, i) =>
									action?.isButton ? (
										<button className='text-muted-foreground hover:text-foreground text-left hover:cursor-pointer'>
											{action.text}
										</button>
									) : (
										<Link
											key={i}
											href={action.href}
											className='text-muted-foreground hover:text-foreground'
										>
											{action.text}
										</Link>
									)
								)}
							</nav>
						</SheetContent>
					</Sheet>
				</nav>
			</div>
		</div>
	)
}

export default Navbar
