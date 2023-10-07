import directus from '@/common/directus'
import { useLocale } from 'next-intl'
import styles from './category.module.css'
import CategoryClient from './Category'

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

export async function generateStaticParams() {
  const { categories } = await directus.getCategories('en')

  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default CategoryServer
