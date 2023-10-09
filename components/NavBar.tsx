'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import { Maybe } from 'graphql/jsutils/Maybe'

export default function NavBar({
  pages,
}: {
  pages: Array<{
    title: Maybe<string>;
    slug: Maybe<string>;
  }>;
}) {
  const {category} = useParams()
	const pathname = usePathname()

	const currentSlug = category || pathname.split('/').pop()

  return (
    <ul className={styles.list}>
      {pages.map((page) => {
        return (
          <li key={page.slug}>
            {page.slug === currentSlug ? (
              <span className={clsx('roundButton', styles.selected)}>
                {page.title}
              </span>
            ) : (
              <Link href={`/${page.slug}`} className="roundButton">
                {page.title}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
