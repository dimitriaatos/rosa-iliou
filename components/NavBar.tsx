'use client'

import clsx from 'clsx'
import { Maybe } from 'graphql/jsutils/Maybe'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import styles from './navbar.module.css'

export default function NavBar({
  pages,
}: {
  pages: Array<{
    title: Maybe<string>
    slug: Maybe<string>
  }>
}) {
  const { category } = useParams()
  const pathname = usePathname()

  const currentSlug = category || pathname.split('/').pop()

  const isHome = ['en', 'el'].some((s) => s === currentSlug)

  return (
    <ul className={clsx(styles.list, isHome ? undefined : styles.hideOnPhone)}>
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
