import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

// ─── Animated Counter Hook ────────────────────────────────────────────────────
// Handles integers AND decimals like 0.8
const useCountUp = (target, duration = 1.8, decimals = 0, inView = false) => {
  const [display, setDisplay] = useState('0')
  const rafRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const startVal = 0

    const tick = (now) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (target - startVal) * eased

      setDisplay(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toString()
      )

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(decimals > 0 ? target.toFixed(decimals) : target.toString())
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, target, duration, decimals])

  return display
}

// ─── Single Stat Item ─────────────────────────────────────────────────────────
const StatItem = ({ value, decimals = 0, suffix, label, delay, inView }) => {
  const count = useCountUp(value, 1.8, decimals, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className="flex flex-col items-center sm:items-start text-center sm:text-left"
    >
      <p className="mont font-bold text-white leading-none"
        style={{ fontSize: 'clamp(28px, 5vw, 40px)' }}
      >
        {count}{suffix}
      </p>
      <p
        className="mont font-medium tracking-widest capitalize text-base mt-1.5"
        style={{ color: '#9CA3AF', letterSpacing: '0.12em' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────
const Divider = ({ inView, delay }) => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0 }}
    animate={inView ? { opacity: 1, scaleY: 1 } : {}}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    className="hidden sm:block w-px self-stretch"
    style={{ background: 'rgba(255,255,255,0.10)', minHeight: '48px' }}
  />
)

// ─── Project Results & Impact Bar ─────────────────────────────────────────────
const ProjectResultsBar = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const stats = [
    { value: 150, decimals: 0, suffix: '%', label: 'Sales Increase',      delay: 0.25 },
    { value: 0.8, decimals: 1, suffix: 's', label: 'Average Load Time',   delay: 0.38 },
    { value: 45,  decimals: 0, suffix: '%', label: 'Higher Engagement',   delay: 0.50 },
  ]

  return (
    <div className="w-[90%]  mx-auto my-10 sm:my-14">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        viewport={{ once: true, margin: '-60px' }}
        className="rounded-2xl px-8 sm:px-14 py-8 sm:py-10"
        style={{ background: '#1A1A1A' }}
      >
        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mont font-semibold text-white text-center mb-7 sm:mb-8"
          style={{ fontSize: 'clamp(15px, 2.5vw, 40px)' }}
        >
          Project Results &amp; Impact
        </motion.p>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
          {stats.map((s, i) => (
            <React.Fragment key={i}>
              <StatItem {...s} inView={inView} />
              {i < stats.length - 1 && <Divider inView={inView} delay={0.3 + i * 0.1} />}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectResultsBar