import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// ─── Calendar Icon ────────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 5.75C7.84 5.75 7.5 5.41 7.5 5V2C7.5 1.59 7.84 1.25 8.25 1.25C8.66 1.25 9 1.59 9 2V5C9 5.41 8.66 5.75 8.25 5.75Z" fill="#31BBD0"/>
<path d="M15.75 5.75C15.34 5.75 15 5.41 15 5V2C15 1.59 15.34 1.25 15.75 1.25C16.16 1.25 16.5 1.59 16.5 2V5C16.5 5.41 16.16 5.75 15.75 5.75Z" fill="#31BBD0"/>
<path d="M12.0016 14.09C12.5216 14.09 12.9016 13.78 12.9016 13.29C12.9016 12.79 12.5216 12.5 12.0016 12.5C11.4816 12.5 11.1016 12.79 11.1016 13.29C11.1016 13.78 11.4816 14.09 12.0016 14.09Z" fill="#31BBD0"/>
<path d="M11.9994 16.9999C12.629 16.9999 13.1394 16.5835 13.1394 16.0699C13.1394 15.5563 12.629 15.1399 11.9994 15.1399C11.3698 15.1399 10.8594 15.5563 10.8594 16.0699C10.8594 16.5835 11.3698 16.9999 11.9994 16.9999Z" fill="#31BBD0"/>
<path d="M19.57 4.5C18.91 4.01 17.96 4.48 17.96 5.31V5.41C17.96 6.58 17.12 7.66 15.95 7.78C14.6 7.92 13.46 6.86 13.46 5.54V4.5C13.46 3.95 13.01 3.5 12.46 3.5H11.54C10.99 3.5 10.54 3.95 10.54 4.5V5.54C10.54 6.33 10.13 7.03 9.51 7.42C9.42 7.48 9.32 7.53 9.22 7.58C9.13 7.63 9.03 7.67 8.92 7.7C8.8 7.74 8.67 7.77 8.53 7.78C8.37 7.8 8.21 7.8 8.05 7.78C7.91 7.77 7.78 7.74 7.66 7.7C7.56 7.67 7.46 7.63 7.36 7.58C7.26 7.53 7.16 7.48 7.07 7.42C6.44 6.98 6.04 6.22 6.04 5.41V5.31C6.04 4.54 5.22 4.08 4.57 4.41C4.56 4.42 4.55 4.42 4.54 4.43C4.5 4.45 4.47 4.47 4.43 4.5C4.4 4.53 4.36 4.55 4.33 4.58C4.05 4.8 3.8 5.05 3.59 5.32C3.48 5.44 3.39 5.57 3.31 5.7C3.3 5.71 3.29 5.72 3.28 5.74C3.19 5.87 3.11 6.02 3.04 6.16C3.02 6.18 3.01 6.19 3.01 6.21C2.95 6.33 2.89 6.45 2.85 6.58C2.82 6.63 2.81 6.67 2.79 6.72C2.73 6.87 2.69 7.02 2.65 7.17C2.61 7.31 2.58 7.46 2.56 7.61C2.54 7.72 2.53 7.83 2.52 7.95C2.51 8.09 2.5 8.23 2.5 8.37V17.13C2.5 19.82 4.68 22 7.37 22H16.63C19.32 22 21.5 19.82 21.5 17.13V8.37C21.5 6.78 20.74 5.39 19.57 4.5ZM12 18.25C10.45 18.25 9.5 17.48 9.5 16.24C9.5 15.56 9.85 14.97 10.46 14.62C10.02 14.31 9.73 13.85 9.73 13.22C9.73 11.92 10.77 11.25 12 11.25C13.23 11.25 14.26 11.92 14.26 13.22C14.26 13.85 13.98 14.31 13.53 14.62C14.15 14.97 14.5 15.56 14.5 16.24C14.5 17.48 13.54 18.25 12 18.25Z" fill="#31BBD0"/>
</svg>

)

// ─── Arrow Right Icon ─────────────────────────────────────────────────────────
const ArrowRightIcon = () => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 -3.91654e-07 10 -8.74228e-07C4.48 -1.3568e-06 1.3568e-06 4.48 8.74228e-07 10C3.91654e-07 15.52 4.48 20 10 20ZM6.5 9.25L11.69 9.25L9.97 7.53C9.68 7.24 9.68 6.76 9.97 6.47C10.12 6.32 10.31 6.25 10.5 6.25C10.69 6.25 10.88 6.32 11.03 6.47L14.03 9.47C14.32 9.76 14.32 10.24 14.03 10.53L11.03 13.53C10.74 13.82 10.26 13.82 9.97 13.53C9.68 13.24 9.68 12.76 9.97 12.47L11.69 10.75L6.5 10.75C6.09 10.75 5.75 10.41 5.75 10C5.75 9.59 6.09 9.25 6.5 9.25Z" fill="white"/>
</svg>


)

// ─── Similar Project CTA ──────────────────────────────────────────────────────
const SimilarProjectCTA = () => {

  const navigate  = useNavigate();
  return (
    <div className="w-[85%] max-w-6xl mx-auto my-10 sm:my-14">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        viewport={{ once: true, margin: '-60px' }}
        className="rounded-[16px] px-6 sm:px-16 py-12 sm:py-16 flex flex-col items-center text-center border border-[#716F6F29] bg-[#716F6F0A]"
      >

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          viewport={{ once: true }}
          className="mont font-semibold text-[#1A1A2E] mb-4 leading-tight"
          style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}
        >
          Have a Similar Project
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          viewport={{ once: true }}
          className="mont font-medium  text-sm sm:text-[15px] text-[#333333] leading-relaxed max-w-md mb-8"
        >
          Let's talk about how we can help your business grow with modern technology and beautiful design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {/* Book Consultation — outlined pill */}
          <button
            onClick={() => navigate('/contact')}
            className="mont text-sm font-semibold flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#31BBD0] text-[#53C1CE] bg-white hover:border-[#53C1CE] hover:shadow-sm transition-all duration-200 whitespace-nowrap"
          >
            <CalendarIcon />
            Book Consultation
          </button>

          {/* Start Project — solid teal pill */}
          <button
            onClick={() => navigate('/contact')}
            className="mont text-sm font-semibold flex items-center w-full justify-center gap-2 px-5 py-2.5 rounded-full text-white transition-opacity duration-200 hover:opacity-90 active:opacity-80 whitespace-nowrap"
            style={{ background: 'linear-gradient(90deg, #31BBD0 0%, #53C1CE 100%)' }}
          >
            Start Project
            <ArrowRightIcon />
          </button>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default SimilarProjectCTA