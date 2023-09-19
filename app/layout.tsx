import { api } from '@/common/helpers'
import NavBar from '@/components/NavBar'
import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import './globals.css'
import styles from './layout.module.css'

const PRFont = localFont({
  src: './font/PFRegalTextPro-RegularA.woff2',
})

export async function generateMetadata(): Promise<Metadata> {
  const data = await api.getHome()

  return {
    title: data.attributes.title,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await api.getHome()

  return (
    <html lang="en">
      <body className={clsx(PRFont.className, styles.container)}>
        <header className={styles.header}>
          <Link href="/" className={styles.title}>
            <h1>{data.attributes.title}</h1>
          </Link>
        </header>
        <main className={styles.main}>{children}</main>
        <nav className={styles.nav}>
          <NavBar />
        </nav>
      </body>
    </html>
  )
}
