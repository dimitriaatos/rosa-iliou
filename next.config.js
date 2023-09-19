/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: [process.env.STRAPI_HOST]
	}
}

module.exports = nextConfig
