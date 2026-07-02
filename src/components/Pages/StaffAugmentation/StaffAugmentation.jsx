import React from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import HeroStaff from './HeroStaff'
import Partners from '../HomePage/Clients'
import HowItWorks from './HowItWorks'
import Engineered from './Engineered'
import Elite from './Elite'
import Testimonials from './Testimonials'
import NewsLetter from './Cta'

const StaffAugmentation = () => {

      // ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})
const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})
const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})

  return (
    <div className='mont overflow-hidden'>
        <Navbar/>
        <HeroStaff/>
        <div>
            <Partners/>
        </div>
        <div className='mx-auto w-[90%] sm:w-[90%]'>
        <HowItWorks fadeUp={fadeUp} />
        </div>
        <Engineered fadeUp={fadeUp} fadeLeft={fadeLeft} fadeRight={fadeRight} />
        <div className='mx-auto w-[90%] sm:w-[90%]'>
        <Elite fadeUp={fadeUp} />
        <Testimonials fadeUp={fadeUp} />
        <NewsLetter />
        </div>
        <div className='overflow-hidden'>
            <Footer/>
        </div>
    </div>
  )
}

export default StaffAugmentation