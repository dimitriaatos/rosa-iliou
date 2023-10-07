import { altFallback } from '@/common/constants'
import directus, { getAssetURL } from '@/common/directus'
import clsx from 'clsx'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import styles from './page.module.css'

export default async function About() {
  const locale = useLocale()
  const { about } = await directus.getAbout(locale)
  const image = about?.image
  return (
    <article className={clsx(styles.about, 'textWidth')}>
      {image?.filename_disk && (
        <Image
          className={styles.image}
          src={getAssetURL(image.filename_disk)}
          alt={image.title || altFallback}
					width={100}
					height={100}
        />
      )}
      {about?.translations?.[0]?.description}
    </article>
  )
}
