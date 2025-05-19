export default async function fetchApi(
	url: string,
	{ body, method }: { body?: Object; method?: string } = {}
) {
	const res = await fetch(url, {
		method,
		body: JSON.stringify(body),
		headers: body ? { 'Content-Type': 'application/json' } : undefined,
	})

	try {
		return { res, json: await res.json() }
	} catch (err) {
		return { res, json: null }
	}
}
