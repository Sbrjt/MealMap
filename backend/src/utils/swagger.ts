import { Router } from 'express'
import { buildOpenAPIDocument } from 'express-zod-openapi-autogen'

function createSwaggerDocs(routers: Router[]) {
	const doc = buildOpenAPIDocument({
		routers,
		schemaPaths: [],
		config: {
			info: {
				title: 'API docs',
				description: 'MealMap',
				version: '',
			},
		},
		errors: {},
		openApiVersion: '3.0.0',
	})

	return doc
}

export { createSwaggerDocs }
