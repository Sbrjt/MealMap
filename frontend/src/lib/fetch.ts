// my custom fetch function

async function fetchApi(
	url: string,
	{ body, method }: { body?: Object; method?: string } = {}
) {
	const res = await fetch(url, {
		method: method ?? (body ? 'POST' : 'GET'),
		body: JSON.stringify(body),
		headers: body ? { 'Content-Type': 'application/json' } : undefined,
	})

	if (res.ok) {
		return { res, json: await res.json() }
	} else {
		console.error(res)
		return { res, json: null }
	}
}

export default fetchApi
