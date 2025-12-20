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

type Coordinate = Pick<Point, 'latitude' | 'longitude'>

type MapProps = Coordinate & {
	zoom?: number
	onClick?: (event: any) => void
	onLoad?: (event: any) => void
	children?: ReactNode
	ref?: Ref<any>
	geoControlRef?: Ref<any>
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

type FetchOptions = {
	body?: Object
	method?: string
	headers?: Record<string, string>
	[key: string]: any
}

export type {
	Coordinate,
	FetchOptions,
	MapProps,
	Marker,
	Point,
	User,
	UserStore,
}
