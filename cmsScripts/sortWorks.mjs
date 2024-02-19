import { readFiles, readItems, updateItem } from '@directus/sdk'
import { getClient } from './client.mjs'

const call = async () => {
	const client = await getClient()
	const files = await client.request(readFiles({
		fields: ['*'],
		limit: -1,
	}))
	const works = await client.request(readItems('works', {
		fields: ['*'],
		limit: -1,
	}))

	const idToDate = Object.fromEntries(files.map((file) => {
		return [file.id, file.uploaded_on]
	}))

	const sortedWorks = works.sort((a, b) => {
		const timeA = new Date(idToDate[a.image])
		const timeB = new Date(idToDate[b.image])

		return timeB.getTime() > timeA.getTime() ? -1 : 1
	})

	// const results = await Promise.all(sortedWorks.map(async (work, index) => {
	// 	return await client.request(updateItem(
	// 		'works',
	// 		work.id,
	// 		{ sort: index }
	// 	))
	// }))
	console.log(results)
	process.exit(1)
}
call()