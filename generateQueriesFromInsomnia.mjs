import insomnia from './insomnia.json' assert { type: 'json' }
import { writeFile } from 'fs/promises'
const path = './queries'

const creatingFiles = insomnia.resources.filter(el => el._type == 'request').map(async (req) => {
	const data = JSON.parse(req.body.text)
	try {
		return await writeFile(`${path}/${data.operationName}.gql`, data.query, 'utf8')
	} catch (err) {
		throw err
	}
})

Promise.all(creatingFiles).then(() => { console.log('OK') })