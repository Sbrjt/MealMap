import { NextFunction, Request, Response } from 'express'

function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error(err)
	res.status(500).json({ error: 'Oops, something went wrong' })
}

function notFoundHandler(req: Request, res: Response) {
	res.status(404).json({ error: 'Route not found' })
}

export { errorHandler, notFoundHandler }
