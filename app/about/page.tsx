import { Metadata } from 'next'
import styles from './page.module.css'
import { api } from '@/common/helpers'

export async function generateMetadata(): Promise<Metadata> {
  const data = await api.getHome()

  return {
    title: ['About', data.attributes.title].join(' | '),
  }
}

export default async function About() {
  const data = await api.getAbout()

  return (
    <section>
      <article className={styles.about}>
        {data.attributes.about ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eius, nam iste similique numquam non! Possimus consequuntur ipsa assumenda, inventore numquam reiciendis ullam eligendi adipisci dolores, qui dolorem libero labore.'}
      </article>
    </section>
  )
}
