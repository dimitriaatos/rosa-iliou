'use client'

import { GetLanguagesQuery } from '@/@types/generated/graphql'
import clsx from 'clsx'
import { usePathname } from 'next-intl/client'
import LinkWithRef from 'next-intl/link'

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
    <LinkWithRef
      href={pathname}
      locale={otherLocale?.code}
      className={clsx(className, 'roundButton')}
    >
      {otherLocale?.name}
    </LinkWithRef>
  )
}

export default LocaleSwitch
