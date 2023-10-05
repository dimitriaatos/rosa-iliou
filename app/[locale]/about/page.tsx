import directus from '@/common/directus'
import clsx from 'clsx'
import { useLocale } from 'next-intl'
import styles from './page.module.css'

export default async function About() {
  const locale = useLocale()
  const { about } = await directus.getAbout(locale)

  return (
    <article className={clsx(styles.about, 'textWidth')}>
      {about?.translations?.[0]?.description ||
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eius, nam iste similique numquam non! Possimus consequuntur ipsa assumenda, inventore numquam reiciendis ullam eligendi adipisci dolores, qui dolorem libero labore.'}
    </article>
  )
}
