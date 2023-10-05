import {
	GetAboutQuery,
	GetCategoriesQuery,
	GetHomeQuery,
	GetLanguagesQuery,
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
  `${process.env.ASSETS_URL}/${image}`

export const directus = {
  getHome: async (locale: string) =>
    await client.request<GetHomeQuery>(GetHome, { locale }),
  getAbout: async (locale: string) =>
    await client.request<GetAboutQuery>(GetAbout, { locale }),
  getCategories: async (locale: string) =>
    await client.request<GetCategoriesQuery>(GetCategories, { locale }),
  getLanguages: async () =>
    await client.request<GetLanguagesQuery>(GetLanguages),
}

export default directus
