import { Directus_Files } from '@/@types/generated/graphql'
import { altFallback } from '@/common/constants'
import { getAssetURL } from '@/common/directus'
import clsx from 'clsx'
import Image, { ImageLoaderProps } from 'next/image'
import { CSSProperties, memo, useEffect, useRef } from 'react'
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
  getMatrixTransformStyles,
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
  initX: number
  initY: number
  selected: boolean
  next: boolean
  opacity: number
  style?: CSSProperties
  className?: string
}

// eslint-disable-next-line react/display-name
const WorkImage = memo(
  ({ image, initX, initY, selected, next, className, opacity }: WorkImage) => {
    const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

    useEffect(() => {
      if (transformComponentRef.current && !selected) {
        const { resetTransform } = transformComponentRef.current
        resetTransform()
      }
    }, [selected])

    return (
      <div
        className={clsx(styles.zoomWrapper, className)}
        style={{
          opacity: opacity,
          pointerEvents: next ? 'none' : undefined,
          visibility: next ? 'hidden' : 'visible',
        }}
      >
        <TransformWrapper
          initialScale={1}
          customTransform={getMatrixTransformStyles}
          smooth={false}
          wheel={{
            step: 0.1,
          }}
          disablePadding={true}
          maxScale={2}
          ref={transformComponentRef}
        >
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
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
                // sizes="(max-width: 500px) 300px,(max-width: 768px) 400px, (max-width: 1800px) 400px,(max-width: 1920px) 400px, (min-width: 1921px) 400px"
                sizes="min(calc(100vw - 132px), 400px)"
                priority={true}
                quality={100}
                loader={imageLoader}
                style={{
                  transform: `translate(${initX}px, ${initY}px)`,
                }}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    )
  },
)

export default WorkImage
