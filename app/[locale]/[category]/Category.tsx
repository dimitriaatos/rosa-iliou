'use client'

import { Categories, Directus_Files } from '@/@types/generated/graphql'
import right from '@/assets/right.svg'
import Work from './Work'
import { useCallback, useEffect, useState } from 'react'
import { capitalizedFirstLetter, rangeLimit } from '@/common/helpers'
import styles from './category.module.css'
import { workConstants } from '@/common/constants'

type Direction = 'right' | 'left';

const arrow = { right, left: right }
const directions: Direction[] = ['left', 'right']
const getDirBool = (dir: string) => dir === 'right'
const getLRKeyCodes = (dir: Direction) => `Arrow${capitalizedFirstLetter(dir)}`
const hArrowKeyCodes = directions.map(getLRKeyCodes)

const CategoryClient = ({
  category,
}: {
  category: NonNullable<Categories>;
}) => {
  const works = category.works
  const [numOfWorks, setNumOfWorks] = useState<number>(1)

  const handleProgress = useCallback(
    (dir: Direction) => {
      setNumOfWorks((prev) => {
        return rangeLimit(prev + (getDirBool(dir) ? 1 : -1), [
          1,
          works?.length || 0,
        ])
      })
    },
    [works?.length]
  )

  const reachedEnd = useCallback(
    (dir: Direction) =>
      getDirBool(dir) ? numOfWorks >= (works?.length || 0) : numOfWorks <= 1,
    [numOfWorks, works]
  )

  useEffect(() => {
    const handler = ({ code }: KeyboardEvent) => {
      if (hArrowKeyCodes.includes(code)) {
        handleProgress(code === hArrowKeyCodes[0] ? 'left' : 'right')
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [handleProgress])

  return (
    <>
      {directions.map(
        (dir) =>
          !reachedEnd(dir) && (
            <button
              className={styles.progressButton}
              style={{
                backgroundImage: `url(${arrow[dir].src})`,
                [dir]: 0,
              }}
              key={dir}
              onClick={() => handleProgress(dir)}
            />
          )
      )}
      {works
        ?.filter((w, i) => i < numOfWorks)
        ?.map((work, index, {length}) => {
          const image = work?.image as Directus_Files
          const num = ((2 * Math.PI) / length - 0.7) * index
          const { initOffsetDistance: distance } = workConstants
          const initOffset: [number, number] =
            index === 0
              ? [0, 0]
              : [Math.sin(num) * distance, Math.cos(num) * distance]
          return (
            image?.filename_disk && (
              <Work image={image} initOffset={initOffset} key={index} />
            )
          )
        })}
    </>
  )
}

export default CategoryClient
