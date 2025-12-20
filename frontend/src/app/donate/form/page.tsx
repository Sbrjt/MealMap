'use client'
import DonateMap from '@/app/donate/form/_components/DonateMap'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Field, Form } from '@/components/ui/myForm'
import Button from '@/components/ui/stateful-button'
import { Textarea } from '@/components/ui/textarea'
import { fetchApi } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z as zod } from 'zod'
import Bg from './_components/Bg'

const formSchema = zod.object({
	name: zod.string().min(1, { message: 'Name is required' }),
	details: zod.string().optional(),
	location: zod
		.object({
			longitude: zod.number(),
			latitude: zod.number(),
		})
		.refine((location) => location != null, {
			message: 'Please share your location',
		}),
})

function DonateForm() {
	const form = useForm({ resolver: zodResolver(formSchema) })
	const [fetching, setFetching] = useState<string | null>(null)

	async function handleSubmit(data: zod.infer<typeof formSchema>) {
		setFetching('loading')

		const { res } = await fetchApi('/api/donation/new', {
			body: {
				...data.location,
				description: data.details,
				donor: data.name,
				// phone: data.phone,
			},
		})

		if (res.ok) {
			setFetching('done')

			setTimeout(() => {
				setFetching(null)
			}, 3000)
		} else {
			// console.log(json?.error?.message)

			setFetching('fail')

			setTimeout(() => {
				setFetching(null)
			}, 3000)
		}
	}

	return (
		<div className='relative py-20 px-5'>
			<Bg />
			<div className='sm:w-1/2 mx-auto'>
				<h1 className='text-4xl text-center font-bold mb-16'>Donate food 🍪</h1>
				<Form onSubmit={handleSubmit} form={form}>
					<Field name='name'>
						<FormLabel>Name of organisation/person</FormLabel>
						<Input placeholder="eg, Mom's Bakery" />
					</Field>
					<Field name='location'>
						<FormLabel>Pick your location: </FormLabel>
						<DonateMap />
					</Field>
					<Field name='details'>
						<FormLabel>More details</FormLabel>
						<Textarea
							className='resize-none min-h-24 max-h-40'
							placeholder='Eg:&#10;Donating unsold loaves of bread...&#10;Pickup preferred in the evening...'
							rows={4}
						/>
					</Field>
					<Button
						type='submit'
						className='w-full bg-primary dark:bg-black gap-2 transition-all duration-1000 ease-in-out dark:text-white'
						status={fetching}
					>
						Submit
					</Button>
				</Form>

				{/* <button className='bg-yellow-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 transform active:scale-85 shadow-md'>
					Click Me
				</button> */}
			</div>
		</div>
	)
}

export default DonateForm
