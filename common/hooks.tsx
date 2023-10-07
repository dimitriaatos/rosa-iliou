import Image from 'next/image'
import { ElementRef, useEffect } from 'react'

export const useGesturePreventDefault = (ref: {
  current: ElementRef<typeof Image>;
}) => {
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
    }
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)

    const refCopy = ref.current
    refCopy?.addEventListener?.('dragstart', handler)

    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
      refCopy?.removeEventListener?.('dragstart', handler)
    }
  }, [])
}
