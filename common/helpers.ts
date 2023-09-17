export const capitalizedFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1)

const headers = new Headers({
  Authorization: 'Bearer ' + process.env.STRAPI_API_TOKEN,
})

export const getData = async (route: string) => {
  const res = await fetch(process.env.STRAPI_API_URL + route, {
    headers,
  })
  const { data } = await res.json()
  return data
}

export const api = Object.fromEntries(
  ['home', 'about'].map((route) => {
    return [`get${capitalizedFirstLetter(route)}`, () => getData('/' + route)]
  })
)
