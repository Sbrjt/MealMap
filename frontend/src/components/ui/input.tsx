import * as React from 'react'

import { cn } from '@/lib/utils'
import GlowWrap from './glow-wrap'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<GlowWrap>
			<input
				type={type}
				data-slot='input'
				className={cn(
					'bg-white file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					className
				)}
				{...props}
			/>
		</GlowWrap>
	)
}

export { Input }
