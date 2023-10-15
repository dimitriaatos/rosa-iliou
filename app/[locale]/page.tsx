import { altFallback } from '@/common/constants'
import directus, { getAssetURL } from '@/common/directus'
import { Metadata } from 'next'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import DraggableContainer from './DraggableContainer'

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale()
  const { home } = await directus.getHome(locale)

  return {
    title: home?.translations?.[0]?.title || '',
  }
}

export default async function Home() {
  const locale = useLocale()
  const { home } = await directus.getHome(locale)
  const image = home?.image

  return (
    <DraggableContainer>
      {image?.filename_disk && (
        <Image
          priority={true}
          src={getAssetURL(image.filename_disk)}
          alt={image.title || altFallback}
          width={image.width || 100}
          height={image.height || 100}
        />
      )}
    </DraggableContainer>
  )
}
