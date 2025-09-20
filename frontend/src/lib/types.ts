import { ReactNode, Ref } from 'react'

type Marker = {
	donor: {
		name: string
		profilePic: string
		mobile?: string
	}
	description: string
} | null

type Point = {
	id: string
	latitude: number
	longitude: number
	donor: string
	description?: string
	phone?: string
	date?: Date
}

type User = {
	id: string
	name: string
	email: string
	phone?: string
	profilePic?: string
} | null

type UserStore = {
	user: User | null
	setUser: (partial: Partial<User>) => void
	clearUser: () => void
}

type LatLng = {
	latitude: number
	longitude: number
}

type MapProps = {
	latitude: number
	longitude: number
	zoom?: number
	onClick?: (event: any) => void
	onLoad?: (event: any) => void
	children?: ReactNode
	ref?: Ref<any>
	geoControlRef?: Ref<any>
}

type FetchOptions = {
	body?: Object
	method?: string
	headers?: Record<string, string>
}

export type { FetchOptions, LatLng, MapProps, Marker, Point, User, UserStore }
