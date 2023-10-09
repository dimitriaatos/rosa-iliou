import directus, { getAssetURL } from '@/common/directus'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import styles from './page.module.css'
import { altFallback } from '@/common/constants'

export default async function Home() {
  const locale = useLocale()
  const { home } = await directus.getHome(locale)
    const image = home?.image

  return (
    <div className={styles.container}>
      {image?.filename_disk && (
        <Image
          priority={true}
          src={getAssetURL(image.filename_disk)}
          alt={image.title || altFallback}
          className={styles.image}
          width={image.width || 100}
          height={image.height || 100}
        />
      )}
    </div>
  )
}
