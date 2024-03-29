import { authentication, createDirectus, rest } from '@directus/sdk'
import dotenv from '@next/env'

dotenv.loadEnvConfig('./')
const { CMS_URL, ADMIN_EMAIL, ADMIN_TOKEN } = process.env

const getClient = async () => {
	const client = createDirectus(CMS_URL).with(rest()).with(authentication('json'))
	await client.login(ADMIN_EMAIL, ADMIN_TOKEN)
	return client
}

export { getClient }
