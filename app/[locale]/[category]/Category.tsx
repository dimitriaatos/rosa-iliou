'use client'

import { Categories, Directus_Files } from '@/@types/generated/graphql'
import left from '@/assets/left.svg'
import right from '@/assets/right.svg'
import { workConstants } from '@/common/constants'
import { capitalizedFirstLetter, rangeLimit } from '@/common/helpers'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Work from './Work'
import styles from './category.module.css'

type Direction = 'right' | 'left'
type Category = {
  category: NonNullable<Categories>
}

const arrow = { right, left }
const directions: Direction[] = ['left', 'right']
const getDirBool = (dir: string) => dir === 'right'
const getLRKeyCodes = (dir: Direction) => `Arrow${capitalizedFirstLetter(dir)}`
const hArrowKeyCodes = directions.map(getLRKeyCodes)

const CategoryClient = ({ category }: Category) => {
  const works = category.works
  const [numOfWorks, setNumOfWorks] = useState(1)

  const handleProgress = useCallback(
    (dir: Direction) => {
      setNumOfWorks((prev) => {
        return rangeLimit(prev + (getDirBool(dir) ? 1 : -1), [
          1,
          works?.length || 0,
        ])
      })
    },
    [works?.length],
  )

  const reachedEnd = useCallback(
    (dir: Direction) =>
      getDirBool(dir) ? numOfWorks >= (works?.length || 0) : numOfWorks <= 1,
    [numOfWorks, works],
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
    return works?.[numOfWorks - 1]?.translations?.[0]?.description || ''
  }, [works, numOfWorks])
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
      {works?.map((work, index, { length }) => {
        const image = work?.image as Directus_Files
        const num = ((2 * Math.PI) / length - 0.7) * index
        const { initOffsetDistance: distance } = workConstants
        const initOffset: [number, number] =
          index === 0
            ? [0, 0]
            : [Math.sin(num) * distance, Math.cos(num) * distance]
        const displayed = index < numOfWorks
        const selected = index + 1 === numOfWorks
        return (
          image?.filename_disk && (
            <div style={{ display: displayed ? 'block' : 'none' }} key={index}>
              <Work
                {...{
                  image,
                  initOffset,
                  selected,
                }}
              />
            </div>
          )
        )
      })}
    </>
  )
}

export default CategoryClient
