export const capitalizedFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1)

const headers = new Headers({
  Authorization: 'Bearer ' + process.env.STRAPI_API_TOKEN,
})

const getApiUrl = (route: string) => {
  const url = new URL(process.env.STRAPI_API_URL + route)
  url.search = new URLSearchParams({ populate: '*' }).toString()
  return url
}

export const getData = async (route: string) => {
  const res = await fetch(getApiUrl(route), {
    headers,
    cache: process.env.NODE_ENV == 'production' ? 'force-cache' : 'no-cache',
  })
  const { data } = await res.json()
  return data
}

export const api = Object.fromEntries(
  ['home', 'about'].map((route) => {
    return [`get${capitalizedFirstLetter(route)}`, () => getData('/' + route)]
  })
)

export const getCmsUrl = (): string => {
  const { NODE_ENV, STRAPI_CMS_URL, NEXT_PUBLIC_STRAPI_ROUTE } = process.env
  return NODE_ENV == 'production' ? NEXT_PUBLIC_STRAPI_ROUTE : STRAPI_CMS_URL
}
