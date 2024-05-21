import { altFallback } from '@/common/constants'
import directus, { getAssetURL } from '@/common/directus'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import DraggableContainer from './DraggableContainer'
import styles from './page.module.css'

export default async function Home() {
  const locale = useLocale()
  const { home } = await directus.getHome(locale)
  const image = home?.image

  return (
    <DraggableContainer>
      {image?.filename_disk && (
        <Image
          className={styles.image}
          priority={true}
          src={getAssetURL(image.filename_disk)}
          alt={image.title || altFallback}
          width={((image.width || 100) * 1) / 2}
          height={((image.height || 100) * 1) / 2}
        />
      )}
    </DraggableContainer>
  )
}
