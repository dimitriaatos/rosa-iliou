import directus from '@/common/directus'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import styles from './navbar.module.css'

export default async function NavBar() {
  const locale = useLocale()
  const { categories } = await directus.getCategories(locale)
	const { about } = await directus.getAbout(locale)

  const pages = [about, ...categories].map((page) => {
    return {
      title: page?.translations?.[0]?.title,
      slug: page?.slug,
    }
  })

  return (
    <ul className={styles.list}>
      {pages.map((page) => {
        return (
          <li key={page.slug}>
            <Link href={`/${page.slug}`} className="roundButton">
              {page.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
