import fs from 'fs'

const filePath = './@types/generated/graphql.ts'

let content = fs.readFileSync(filePath).toString().split('\n')

let found = false
const editedContent = []

for (let index = 0; index < content.length; index++) {
	const line = content[index]
	if (line.startsWith('export type Scalars')) {
		if (found) break
		found = true
	}
	editedContent.push(line)
}

fs.writeFileSync(filePath, editedContent.join('\n'))