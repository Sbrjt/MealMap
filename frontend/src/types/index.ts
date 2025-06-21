import { ReactNode, Ref } from 'react'

type Marker = {
	donor: string
	description: string
} | null

type Point = {
	id: string
	latitude: number
	longitude: number
	donor: string
	description?: string
	mobile?: string
	date?: Date
}

type User = {
	id: string
	name: string
	email: string
	phone?: string
	profilePic?: string
} | null

type AuthStore = {
	user: User
	setUser: (user: User) => void
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

export type { AuthStore, LatLng, MapProps, Marker, Point, User }
