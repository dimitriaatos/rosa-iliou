import { readFiles, readFolders, readItems } from '@directus/sdk'
import { client, login } from './client.mjs'
/**
 * - get folders
 * - get categories including files
 * - get files by folder
 * - check which files are not included in the corresponding category
 * - create a work for each missing file
 */
const call = async () => {
	await login()

	// get folders
	const folders = await client.request(readFolders())
	// get categories including files
	const categories = await client.request(readItems('categories', {
		fields: ['*', { works: ['*'] }],
		deep: {
			works: {
				_limit: -1,
			}
		}
	}))

	// get files by folder
	const filesByFolder = Object.fromEntries(await Promise.all(
		folders.map(async ({ name: folder, id }) => {
			const files = await client.request(readFiles({
				filter: {
					folder: {
						_eq: id
					}
				},
				fields: ['*'],
				limit: -1,
			}))

			return [folder.toLowerCase(), files]
		})
	))

	// check which files are not included in the coresponding category
	Object.entries(filesByFolder).forEach(async ([categoryName, files]) => {
		const fileIdsInWorks = categories.find(
			({ slug }) => {
				return slug === categoryName
			}
		).works.map(({ image }) => image)

		const missingFiles = files.filter(({ id }) => !fileIdsInWorks.includes(id))

		const missingWorks = missingFiles.map(file => {
			return {
				image: file.id,
				category: categoryName,
				status: 'published',
			}
		})
		// await client.request(createItems('works', missingWorks))
		console.log('completed')
	}, [])
}
call()
