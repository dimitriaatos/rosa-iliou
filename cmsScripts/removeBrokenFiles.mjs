import { deleteFiles, deleteItems, readFiles, readItems } from '@directus/sdk'
import { getClient } from './client.mjs'

const call = async () => {
	const client = await getClient()

	const files = await client.request(readFiles({
		fields: ['*'],
		limit: -1,
	}))

	const brokenFileIds = files.filter(({ filename_disk }) => !filename_disk).map(({ id }) => id)

	const brokenWorkIds = (await client.request(readItems('works', {
		fields: ['*'],
		filter: {
			image: {
				_in: brokenFileIds
			}
		}
	}))).map(({ id }) => id)

	console.log({ brokenFileIds, brokenWorkIds })

	// if (brokenWorkIds.length) { await client.request(deleteItems('works', brokenWorkIds)) }
	// if (brokenFileIds.length) { await client.request(deleteFiles(brokenFileIds)) }
	console.log('done')
}
call()
