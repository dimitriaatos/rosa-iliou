'use client'

import { Directus_Files } from '@/@types/generated/graphql'
import { altFallback } from '@/common/constants'
import { getAssetURL } from '@/common/directus'
import { useGesturePreventDefault } from '@/common/hooks'
import { animated, useSpring } from '@react-spring/web'
import {
	createUseGesture,
	dragAction,
	pinchAction,
	scrollAction,
	wheelAction,
} from '@use-gesture/react'
import Image from 'next/image'
import { ElementRef, forwardRef, useRef } from 'react'
import styles from './category.module.css'

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
			priority={true}
      className={styles.image}
      src={getAssetURL(image?.filename_disk || '')}
      key={image.filename_disk}
      alt={image.title || altFallback}
      ref={forwardedRef}
			fill={true}
    />
  )
})

const useGesture = createUseGesture([
  dragAction,
  pinchAction,
  wheelAction,
  scrollAction,
])

const AnimatedImage = animated(WorkImage)

const scaleBounds = { min: 1, max: 4 }

const Work = ({
  image,
  initOffset,
}: {
  image: Directus_Files;
  initOffset: [number, number];
}) => {
  const [style, api] = useSpring(() => ({
    x: initOffset[0],
    y: initOffset[1],
    scale: 1,
    rotateZ: 0,
    config: {
      tension: 1000,
      friction: 1,
      clamp: true,
      mass: 1,
      precision: 0.01,
      duration: 0,
    },
  }))
  const ref = useRef<ElementRef<typeof Image>>(null)
  useGesturePreventDefault(ref)

  useGesture(
    {
      // onHover: ({ active, event }) => console.log('hover', event, active),
      // onMove: ({ event }) => console.log('move', event),
      onDrag: ({ pinching, cancel, offset: [x, y], down, ...rest }) => {
        if (pinching) return cancel()
        // console.log(x, y)
        api.start({ x, y, immediate: down })
      },
      // onWheel: (state) => {
      // 	let {
      // 		first,
      //     active,
      //     movement: [xm, ym],
      //     memo,
      //     last,
      //     event,
      //     pinching,
      //   } = state

      //   if (pinching) return
      // 	if (!last) event.preventDefault()

      //   if (first) {
      //     memo = 1
      //   }

      // 	const scale = memo + (yo - ym) / 400 // rangeLimit((yo - ym) / 400, [scaleBounds.min, scaleBounds.max])

      //   // const x = xo - xm
      // 	console.log(scale)
      //   api.start({ immediate: active })
      //   return memo
      // },
      // onScroll: (los) => {
      //   console.log('onScroll')
      // },
      onPinch: (state) => {
        let {
          origin: [ox, oy],
          first,
          movement: [ms],
          offset: [s, a],
          memo,
          direction,
        } = state

        const dir = direction[0] >= 0

        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect()
          const tx = ox - (x + width / 2)
          const ty = oy - (y + height / 2)
          memo = [style.x.get(), style.y.get(), tx, ty]
        }

        const x =
          (memo[0] - (ms - 1) * memo[2]) *
          Math.pow(
            (s - scaleBounds.min) / (scaleBounds.max - scaleBounds.min),
            0.5
          )

        const y =
          (memo[1] - (ms - 1) * memo[3]) *
          Math.pow(
            (s - scaleBounds.min) / (scaleBounds.max - scaleBounds.min),
            0.5
          )

        api.start({ scale: s, x, y, immediate: true })
        return memo
      },
    },
    {
      target: ref,
      drag: {
        from: () => [style.x.get(), style.y.get()],
      },
      wheel: {
        scaleBounds,
        eventOptions: { passive: false },
      },
      pinch: { scaleBounds },
    }
  )

  return <AnimatedImage image={image} style={style} ref={ref} />
}

export default Work
