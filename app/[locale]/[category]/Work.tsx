import { Directus_Files } from '@/@types/generated/graphql'
import { altFallback } from '@/common/constants'
import { getAssetURL } from '@/common/directus'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch'
import styles from './category.module.css'

type WorkImage = {
  image: Directus_Files
  initOffset: [number, number]
  selected: boolean
  displayed: boolean
}

// eslint-disable-next-line react/display-name
const WorkImage = ({ image, initOffset, selected, displayed }: WorkImage) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

  useEffect(() => {
    if (transformComponentRef.current && !selected) {
      const { resetTransform } = transformComponentRef.current
      resetTransform(200)
    }
  }, [selected])

  return (
    <div
      className={styles.zoomWrapper}
      style={{ display: displayed ? 'block' : 'none' }}
    >
      <TransformWrapper
        initialScale={1}
        smooth={false}
        wheel={{
          step: 0.1,
        }}
        disablePadding={true}
        maxScale={2}
        ref={transformComponentRef}
        doubleClick={{}}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%', overflow: 'visible' }}
          contentStyle={{
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            priority={true}
            className={styles.image}
            src={getAssetURL(image?.filename_disk || '')}
            key={image.filename_disk}
            alt={image.title || altFallback}
            fill={true}
            style={{
              transform: `translate(${initOffset[0]}px, ${initOffset[1]}px)`,
            }}
            // onDoubleClick={onDoubleClick}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default WorkImage
