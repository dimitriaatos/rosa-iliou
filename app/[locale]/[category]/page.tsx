import directus from '@/common/directus'
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

  return {
    title: `${pageTitle} | ${websiteTitle}`,
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

// export async function generateStaticParams() {
//   const { categories } = await directus.getCategories('en')

//   return categories.map((category) => ({
//     category: category.slug,
//   }))
// }

export default CategoryServer
