import { Directus_Files } from '@/@types/generated/graphql'
import { altFallback } from '@/common/constants'
import { getAssetURL } from '@/common/directus'
import clsx from 'clsx'
import Image, { ImageLoaderProps } from 'next/image'
import { CSSProperties, useEffect, useRef } from 'react'
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch'
import styles from './category.module.css'

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  width = 800
  return `${getAssetURL(src)}?width=${width}&quality=${
    quality || 75
  }&format=webp`
}

export const getImageLink = (src: string): string => {
  return imageLoader({ src, width: 800, quality: 60 })
}

type WorkImage = {
  image: Directus_Files
  initOffset: [number, number]
  selected: boolean
  style?: CSSProperties
  className?: string
}

// eslint-disable-next-line react/display-name
const WorkImage = ({
  image,
  initOffset,
  selected,
  style,
  className,
}: WorkImage) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

  useEffect(() => {
    if (transformComponentRef.current && !selected) {
      const { resetTransform } = transformComponentRef.current
      resetTransform(200)
    }
  }, [selected])

  return (
    <div className={clsx(styles.zoomWrapper, className)} style={style}>
      <TransformWrapper
        initialScale={1}
        smooth={false}
        wheel={{
          step: 0.1,
        }}
        disablePadding={true}
        maxScale={2}
        ref={transformComponentRef}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%', overflow: 'visible' }}
          contentStyle={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* added an intermediate div to eliminate the warning of <Image /> about TransformComponent having position sticky */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <Image
              className={styles.image}
              src={image?.filename_disk || ''}
              key={image.filename_disk}
              alt={image.title || altFallback}
              fill={true}
              sizes="min(calc(100vw - 132px), 800px)"
              priority={true}
              quality={60}
              loader={imageLoader}
              style={{
                transform: `translate(${initOffset[0]}px, ${initOffset[1]}px)`,
              }}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default WorkImage
