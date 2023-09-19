import Link from 'next/link'
import { capitalizedFirstLetter } from '../common/helpers'
import styles from './navbar.module.css'

const routes = ['about', 'metal', 'wood', 'clay', 'jewelry'].map((slug) => ({
  path: slug,
  name: capitalizedFirstLetter(slug),
}))

export default function NavBar() {
  return (
    <ul className={styles.list}>
      {routes.map((route, index) => {
        return (
          <li key={index}>
            <Link href={`/${route.path}`} className={styles.link}>
              {route.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
