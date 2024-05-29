const { loadEnvConfig } = require('@next/env')
const env_production = loadEnvConfig(process.cwd()).combinedEnv

module.exports = {
	apps: [{
		name: 'rosa-iliou',
		script: 'npm start',
		env_production,
	}],

	deploy: {
		production: {
			user: 'dimitriaatos',
			host: 'grain',
			ref: 'origin/main',
			repo: 'https://github.com/dimitriaatos/rosa-iliou.git',
			path: '/home/dimitriaatos/sites/rosa-iliou/front',
			'pre-deploy-local': 'rsync -v ./.env.production.local dimitriaatos@grain:/home/dimitriaatos/sites/rosa-iliou/front/current/',
			'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run codegen && npm run build && pm2 reload ecosystem.config.cjs --env production',
			'ssh-options': 'ForwardAgent=yes'
		}
	}
}
