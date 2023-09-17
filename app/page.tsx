import Image from 'next/image'
import styles from './page.module.css'
import { api } from '@/common/helpers'

export default async function Home() {

	const data = await api.getHome()

	console.log(data.attributes.image)
  return (
    <Image
      src={data.attributes.image}
      alt="photos of projects"
      sizes="100vw"
      width={700}
      height={475}
      className={styles.image}
    />
  )
}
