import type { CodegenConfig } from '@graphql-codegen/cli'
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.CMS_URL + '/graphql']: {
        headers: {
          Authorization: 'Bearer ' + process.env.API_TOKEN,
        },
      },
    },
  ],
  documents: 'queries/**/*.{graphql,gql}/',
  generates: {
    '@types/generated/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations'],
    },
    '@types/generated/modules.d.ts': {
      plugins: ['typescript-graphql-files-modules'],
    },
  },
}

export default config
