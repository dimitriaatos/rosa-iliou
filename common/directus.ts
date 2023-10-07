import {
	Query
} from '@/@types/generated/graphql'
import { GraphQLClient } from 'graphql-request'

import GetAbout from '@/queries/GetAbout.gql'
import GetCategories from '@/queries/GetCategories.gql'
import GetHome from '@/queries/GetHome.gql'
import GetLanguages from '@/queries/GetLanguages.gql'

const client = new GraphQLClient(`${process.env.CMS_URL}/graphql`, {
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
})

export const getAssetURL = (image: string) =>
  `${process.env.NEXT_PUBLIC_ASSETS_URL}/${image}`

export const directus = {
  getHome: async (locale: string) =>
    await client.request<{ home: NonNullable<Query['home']> }>(GetHome, {
      locale,
    }),
  getAbout: async (locale: string) =>
    await client.request<{ about: NonNullable<Query['about']> }>(GetAbout, {
      locale,
    }),
  getCategories: async (locale: string) =>
    await client.request<{ categories: Query['categories'] }>(GetCategories, {
      locale,
    }),
  getLanguages: async () =>
    await client.request<{ languages: Query['languages'] }>(GetLanguages),
}

export default directus
