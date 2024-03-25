'use client'

import { GetLanguagesQuery } from '@/@types/generated/graphql'
import clsx from 'clsx'
import { usePathname, Link } from '../navigation'

const LocaleSwitch = ({
  locale,
  languages,
  className,
}: {
  locale: string
  languages: GetLanguagesQuery['languages']
  className?: string
}) => {
  const otherLocale = languages.find(({ code }) => code !== locale)
  const pathname = usePathname()
  return (
    <Link
      href={pathname}
      locale={otherLocale?.code as 'en'}
      className={clsx(className, 'roundButton')}
    >
      {otherLocale?.name}
    </Link>
  )
}

export default LocaleSwitch
