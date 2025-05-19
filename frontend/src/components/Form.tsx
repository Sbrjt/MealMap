'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Children, ReactNode, cloneElement } from 'react'
import { UseFormReturn } from 'react-hook-form'

function MyForm({
	onSubmit,
	form,
	children,
}: {
	onSubmit: any
	form: any
	children: ReactNode
}) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				{Children.map(children, (child: any) => {
					if (child.type === Field) {
						return cloneElement(child, { form }) // Inject form prop
					}
					return child
				})}
			</form>
		</Form>
	)
}

function Field({
	children,
	form,
	name,
}: {
	children: ReactNode
	form?: UseFormReturn<FormData>
	name: any
}) {
	const elems = Children.toArray(children)

	const label = elems.find((c: any) => c.type === FormLabel)
	const input = elems.find((c) => c !== label)

	return (
		<FormField
			control={form?.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label}
					<FormControl>
						{cloneElement(input, { ...field, ...input?.props })}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export { Field, MyForm as Form }
