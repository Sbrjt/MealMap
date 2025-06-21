import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('jwt')?.value

	if (!token) {
		return NextResponse.redirect(new URL('/donate', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/donate/form'],
}
