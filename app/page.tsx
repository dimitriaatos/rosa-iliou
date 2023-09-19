import { api, getCmsUrl } from '@/common/helpers'
import Image from 'next/image'
import styles from './page.module.css'

export default async function Home() {
  const data = await api.getHome()

  const image = data.attributes.image.data.attributes

  const url = getCmsUrl() + image.url

  return (
    <div className={styles.container}>
      <Image
        src={url}
        alt="photos of projects"
        className={styles.image}
        width={image.width}
        height={image.height}
      />
    </div>
  )
}
