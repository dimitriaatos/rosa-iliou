'use client'

import { Directus_Files } from '@/@types/generated/graphql'
import { altFallback, workConstants } from '@/common/constants'
import { getAssetURL } from '@/common/directus'
import { useGesturePreventDefault } from '@/common/hooks'
import { animated, useSpring } from '@react-spring/web'
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react'
import Image from 'next/image'
import { ElementRef, forwardRef, useRef } from 'react'
import styles from './category.module.css'
import clsx from 'clsx'

// eslint-disable-next-line react/display-name
const WorkImage = forwardRef<
  ElementRef<typeof Image>,
  { image: Directus_Files }
>(({ image }, forwardedRef) => {
  const handleClose = () => {
    console.log('close')
  }
  return (
    <Image
      className={clsx(styles.animated, styles.image)}
      src={getAssetURL(image?.filename_disk || '')}
      key={image.filename_disk}
      alt={image.title || altFallback}
      width={500}
      height={500}
      ref={forwardedRef}
    />
  )
})

const useGesture = createUseGesture([dragAction, pinchAction])

const AnimatedImage = animated(WorkImage)

const Work = ({
  image,
  initOffset,
}: {
  image: Directus_Files;
  initOffset: [number, number];
}) => {
	const { maxPositionOffset } = workConstants
  const [style, api] = useSpring(() => ({
    x: initOffset[0],
    y: initOffset[1],
    scale: 1,
    rotateZ: 0,
  }))
  const ref = useRef<ElementRef<typeof Image>>(null)
  useGesturePreventDefault(ref)

  useGesture(
    {
      // onHover: ({ active, event }) => console.log('hover', event, active),
      // onMove: ({ event }) => console.log('move', event),
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel()
        api.start({ x, y })
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect()
          const tx = ox - (x + width / 2)
          const ty = oy - (y + height / 2)
          memo = [style.x.get(), style.y.get(), tx, ty]
        }

        const x = memo[0] - (ms - 1) * memo[2]
        const y = memo[1] - (ms - 1) * memo[3]
        api.start({ scale: s, x, y })
        return memo
      },
    },
    {
      target: ref,
      drag: {
        from: () => [style.x.get(), style.y.get()],
        bounds: {
          left: -maxPositionOffset,
          right: maxPositionOffset,
          top: -maxPositionOffset,
          bottom: maxPositionOffset,
        },
      },
      pinch: { scaleBounds: { min: 1, max: 2 }, rubberband: true },
    }
  )

  return <AnimatedImage image={image} style={style} ref={ref} />
}

export default Work
