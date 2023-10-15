'use client'

import { useRef } from 'react'
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

  return (
    <div {...events} ref={ref} className={styles.container}>
      {children}
    </div>
  )
}
