'use client'

import DonateMap from '@/components/DonateMap'
import { Field, Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import fetchApi from '@/lib/fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z as zod } from 'zod'

const formSchema = zod.object({
	name: zod.string().min(5, { message: 'Name is required' }),
	details: zod.string().optional(),
	location: zod.object({
		longitude: zod.number(),
		latitude: zod.number(),
		en: zod.boolean().refine((val) => val === true, {
			message: 'Please share your location',
		}),
	}),
})

async function onSubmit(data: zod.infer<typeof formSchema>) {
	await fetchApi('api/donation/new', {
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
}

function Page() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			details: '',
			location: {
				longitude: 0,
				latitude: 0,
				en: false,
			},
		},
	})

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
							placeholder='Leave additional comments here...'
							className='resize-none max-h-20'
							rows={4}
						/>
					</Field>
					<Button type='submit' className='w-full'>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	)
}

export default Page
