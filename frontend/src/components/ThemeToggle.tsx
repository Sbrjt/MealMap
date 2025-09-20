'use client'
import { useTheme } from 'next-themes'
import { IoMoon, IoSunny } from 'react-icons/io5'

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()

	console.log(resolvedTheme)

	function toggleTheme() {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
	}

	return (
		<button
			onClick={toggleTheme}
			className='p-2 rounded-full text-xl
                 bg-white text-black dark:bg-black dark:text-white'
		>
			{/* {resolvedTheme} */}
			{resolvedTheme === 'dark' ? <IoSunny /> : <IoMoon />}
		</button>
	)
}
