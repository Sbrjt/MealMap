'use client'
import { cn } from '@/lib/utils'
import Check from './check'
import Spinner from './spinner'

function Btn({ status, className, children, ...props }) {
	return (
		<button
			className={cn(
				className,
				`group/btn shadow-input relative flex h-10 w-full items-center justify-center 
                    space-x-2 rounded-md bg-white px-4 font-medium 
                    text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]
                     disabled:cursor-progress! disabled:opacity-80`
			)}
			disabled={status === 'loading'}
			{...props}
		>
			{status === 'loading' && <Spinner />}
			{status === 'done' && <Check />}
			{status === 'fail' && <div>❌</div>}
			{children}
			<span
				className='absolute inset-x-0 -bottom-[2px] block h-[2px] w-full bg-gradient-to-r from-transparent 
            via-amber-400 to-transparent opacity-0 transition duration-400 group-hover/btn:opacity-100'
			/>
		</button>
	)
}

export default Btn
