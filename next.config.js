//@ts-check
const withNextIntl = require('next-intl/plugin')(
	'./i18n.ts'
)

const nextConfig = withNextIntl({
	images: {
		domains: [process.env.HOST || '']
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		})
		return config
	},
})

module.exports = nextConfig
