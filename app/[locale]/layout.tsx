import directus from '@/common/directus'
import LocaleSwitch from '@/components/LocaleSwitch'
import NavBar from '@/components/NavBar'
import clsx from 'clsx'
import localFont from 'next/font/local'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import './globals.css'
import styles from './layout.module.css'
import Head from 'next/head'

const PRFont = localFont({
  src: './font/PFRegalTextPro-RegularA.woff2',
})

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { languages } = await directus.getLanguages()
  const locales = languages.map(({ code }) => code)

  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  const { home } = await directus.getHome(locale)
  const title = home?.translations?.[0]?.title

  return (
    <html lang={locale}>
      <body className={clsx(PRFont.className, styles.container)}>
        <Head>
          <title>{title}</title>
        </Head>
        <header className={styles.header}>
          <Link href="/" className={styles.title}>
            <h1>{title}</h1>
          </Link>
          <LocaleSwitch {...{ locale, languages }} className={styles.lang} />
        </header>
        <main className={styles.main}>{children}</main>
        <nav className={styles.nav}>
          <NavBar />
        </nav>
      </body>
    </html>
  )
}
