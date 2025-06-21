'use client'

import DonateMap from '@/app/donate/form/_components/DonateMap'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Field, Form } from '@/components/ui/myForm'
import { Textarea } from '@/components/ui/textarea'
import fetchApi from '@/lib/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z as zod } from 'zod'

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

function Page() {
	const form = useForm({ resolver: zodResolver(formSchema) })

	const [loading, setLoading] = useState<boolean>(false)

	async function onSubmit(data: zod.infer<typeof formSchema>) {
		setLoading(true)

		await fetchApi('/api/donation/new', {
			body: {
				location: {
					coordinates: [data.location.longitude, data.location.latitude],
				},
				donor: data.name,
				description: data?.details,
				// mobile: data.mobile,
			},
			method: 'POST',
		})

		setLoading(false)
	}

	return (
		<div className='p-5'>
			<div className='bg-white p-6 rounded-lg shadow w-full xs:w-2xl mx-auto'>
				<h1 className='text-2xl font-bold mb-6'>Donate food 🍪</h1>
				<Form onSubmit={onSubmit} form={form}>
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
					<Button type='submit' className='w-full' disabled={loading}>
						{loading && <Loader2Icon className='animate-spin mr-2' />}
						Submit
					</Button>
				</Form>
			</div>
		</div>
	)
}

export default Page
