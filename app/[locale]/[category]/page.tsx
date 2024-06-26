import directus, { getAssetURL } from '@/common/directus'
import { Metadata } from 'next'
import { useLocale } from 'next-intl'
import CategoryClient from './Category'
import styles from './category.module.css'

type CategoryProps = {
  params: { category: string }
}

export async function generateMetadata({
  params,
}: CategoryProps): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale()
  const { categories } = await directus.getCategories(locale)
  const { home } = await directus.getHome(locale)
  const category = categories.find(({ slug }) => slug == params.category)

  const websiteTitle = home?.translations?.[0]?.title || ''
  const pageTitle = category?.translations?.[0]?.title || ''

  const title = `${pageTitle} | ${websiteTitle}`
  const imageUrl = getAssetURL(category?.works?.[0]?.image?.filename_disk || '')

  return {
    title,
    twitter: {
      images: imageUrl,
    },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_URL,
      title,
      siteName: title,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
  }
}

const CategoryServer = async ({ params }: { params: { category: string } }) => {
  const locale = useLocale()
  const { categories } = await directus.getCategories(locale)
  const category = categories.find(({ slug }) => slug == params.category)

  return (
    <section className={styles.category}>
      {category && <CategoryClient category={category} />}
    </section>
  )
}

export default CategoryServer
