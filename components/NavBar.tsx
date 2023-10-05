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
      path: page?.slug,
    }
  })

  return (
    <ul className={styles.list}>
      {pages.map((page, index) => {
        return (
          <li key={index}>
            <Link href={`/${page.path}`} className="roundButton">
              {page.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
