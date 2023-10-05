import directus, { getAssetURL } from '@/common/directus'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import styles from './page.module.css'

export default async function Home() {
  const locale = useLocale()
  const { home } = await directus.getHome(locale)
  const image = home?.image

  const url = image?.filename_disk ? getAssetURL(image?.filename_disk) : '/'

  return (
    <div className={styles.container}>
      <Image
        src={url}
        alt={image?.title || ''}
        className={styles.image}
        width={image?.width || 100}
        height={image?.height || 100}
      />
    </div>
  )
}
