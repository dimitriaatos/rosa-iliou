'use client'

import { useEffect, useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import styles from './page.module.css'

type DraggableContainer = {
  children: any
}

export default function DraggableContainer({ children }: DraggableContainer) {
  const ref = useRef<any>()
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  })

  useEffect(() => {
    const offset = ref.current.getBoundingClientRect().width / 2
    ref.current.scroll({ left: offset })
    ref.current.style.marginLeft = 0
  }, [])

  return (
    <div
      {...events}
      ref={ref}
      className={styles.container}
      style={{
        marginLeft: 'calc(100vw * -1/2)',
      }}
    >
      {children}
    </div>
  )
}
