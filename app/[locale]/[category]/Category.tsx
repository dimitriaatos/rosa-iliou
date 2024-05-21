'use client'

import { Categories, Directus_Files } from '@/@types/generated/graphql'
import left from '@/assets/left.svg'
import right from '@/assets/right.svg'
import { workConstants } from '@/common/constants'
import { capitalizedFirstLetter, rangeLimit } from '@/common/helpers'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Work, { getImageLink } from './Work'
import styles from './category.module.css'

type Direction = 'right' | 'left'
type Category = {
  category: NonNullable<Categories>
}

const maxImages = 7
const arrow = { right, left }
const directions: Direction[] = ['left', 'right']
const getDirBool = (dir: string) => dir === 'right'
const getLRKeyCodes = (dir: Direction) => `Arrow${capitalizedFirstLetter(dir)}`
const hArrowKeyCodes = directions.map(getLRKeyCodes)

const CategoryClient = ({ category }: Category) => {
  const works = category.works
  const [displayed, setDisplayed] = useState({
    works: [works?.[0], works?.[1]],
    index: 0,
  })

  const handleProgress = useCallback(
    (dir: Direction) => {
      setDisplayed((prev) => {
        const index = rangeLimit(prev.index + (getDirBool(dir) ? 1 : -1), [
          0,
          (works?.length || 1) - 2,
        ])
        const newWorks = (works || []).slice(
          Math.max(0, index - maxImages),
          index + 2,
        )
        return { index, works: newWorks }
      })
    },
    [works],
  )

  const reachedEnd = useCallback(
    (dir: Direction) =>
      getDirBool(dir)
        ? displayed.index >= (works?.length || 1) - 2
        : displayed.index <= 0,
    [displayed, works],
  )

  useEffect(() => {
    const handler = ({ code }: KeyboardEvent) => {
      if (hArrowKeyCodes.includes(code)) {
        handleProgress(code === hArrowKeyCodes[0] ? 'left' : 'right')
      }
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handler)
    }
  }, [handleProgress])

  const description = useMemo(() => {
    return (
      works?.[displayed.index]?.translations?.[0]?.description ||
      category?.translations?.[0]?.description ||
      ''
    )
  }, [works, displayed.index, category?.translations])

  return (
    <>
      <aside className={clsx(styles.description, 'cmsContent')}>
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className={styles.content}
        ></div>
      </aside>
      {directions.map(
        (dir) =>
          !reachedEnd(dir) && (
            <div
              key={dir}
              className={styles.progressContainer}
              style={{ [dir]: 0 }}
            >
              <button
                className={styles.progressButton}
                style={{
                  backgroundImage: `url(${arrow[dir].src})`,
                }}
                onClick={() => handleProgress(dir)}
              />
            </div>
          ),
      )}
      {displayed.works?.map((work, index, { length }) => {
        const image = work?.image as Directus_Files
        const num =
          ((2 * Math.PI) / (works?.length || 0) - 0.7) *
          (index + Math.max(0, displayed.index - maxImages))
        const { initOffsetDistance: distance } = workConstants
        const initOffset: [number, number] =
          index === 0 && displayed.index < maxImages
            ? [0, 0]
            : [Math.sin(num) * distance, Math.cos(num) * distance]
        const selected = index === length - 2
        const next = index === length - 1
        const opacity =
          length < maxImages - 1 ? 1 : index === 0 ? 0 : index === 1 ? 0.5 : 1
        return (
          image?.filename_disk && (
            <Work
              key={work?.id}
              {...{
                opacity,
                image,
                initX: initOffset[0],
                initY: initOffset[1],
                next,
                selected,
              }}
            />
          )
        )
      })}
    </>
  )
}

export default CategoryClient
