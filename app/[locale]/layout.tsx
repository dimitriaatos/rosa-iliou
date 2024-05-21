import directus, { getAssetURL } from '@/common/directus'
import LocaleSwitch from '@/components/LocaleSwitch'
import NavBar from '@/components/NavBar'
import clsx from 'clsx'
import { Metadata } from 'next'
import { Cardo } from 'next/font/google'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import './globals.css'
import styles from './layout.module.css'
import { useLocale } from 'next-intl'

const cardo = Cardo({
  weight: '400',
  subsets: ['greek', 'latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale()
  const { home } = await directus.getHome(locale)
  // const { about } = await directus.getAbout(locale)

  const imageUrl = getAssetURL(
    home?.image?.filename_disk + `?width=${1200}` || '',
  )
  const title = home?.translations?.[0]?.title || ''

  return {
    title: home?.translations?.[0]?.title || '',
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
    viewport: {
      width: 'device-width',
      initialScale: 1,
      userScalable: false,
      maximumScale: 1,
      minimumScale: 1,
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { languages } = await directus.getLanguages()
  const locales = languages.map(({ code }) => code)

  const { categories } = await directus.getCategories(locale)
  const { about } = await directus.getAbout(locale)

  const pages = [about, ...categories].map((page) => {
    return {
      title: page?.translations?.[0]?.title,
      slug: page?.slug,
    }
  })

  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  const { home } = await directus.getHome(locale)
  const title = home?.translations?.[0]?.title

  return (
    <html lang={locale}>
      <body className={clsx(cardo.className, styles.container)}>
        <header className={styles.header}>
          <Link href="/" className={styles.title}>
            <h1>{title}</h1>
          </Link>
          <LocaleSwitch {...{ locale, languages }} className={styles.lang} />
        </header>
        <main className={styles.main}>{children}</main>
        <nav className={styles.nav}>
          <NavBar pages={pages} />
        </nav>
      </body>
    </html>
  )
}
