'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Children, ReactElement, ReactNode, cloneElement } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

function MyForm({
	onSubmit,
	form,
	children,
}: {
	onSubmit: SubmitHandler<any>
	form: UseFormReturn<any>
	children: ReactNode
}) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				{Children.map(children, (child: any) => {
					if (child?.type === Field) {
						return cloneElement(child, { form }) // inject form prop
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
	form?: UseFormReturn<any>
	name: string
}) {
	const elems = Children.toArray(children) as ReactElement[]
	const label = elems.find((e) => e.type === FormLabel)
	const input = elems.find((e) => e !== label)

	if (!input) {
		return null
	}

	return (
		<FormField
			control={form?.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label}
					<FormControl>
						{cloneElement(input, {
							...field,
							...(input.props ?? {}),
						})}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export { Field, MyForm as Form }
