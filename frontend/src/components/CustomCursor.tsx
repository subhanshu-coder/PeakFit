import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * A ring that follows the pointer with spring physics and expands + labels
 * itself when hovering anything with [data-cursor]. Desktop / mouse only —
 * bails out on touch devices.
 */
export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.4 })
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.4 })

  const [label, setLabel] = useState<string | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)
    if (touch) return

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      setLabel(target?.getAttribute('data-cursor') || null)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  if (isTouch) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: label ? 84 : 16,
        height: label ? 84 : 16,
        backgroundColor: label ? '#C6FF3A' : '#F3F1EA',
      }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
    >
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink">
          {label}
        </span>
      )}
    </motion.div>
  )
}
