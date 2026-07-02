import React from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
// import banner from '../../../assets/media/hidden-hill.png'
import LifeStyle from './LifeStyle'
import Catering from './Catering'
import CEOBirthday from './CEOBirthday'
import OurTeam from './OurTeam'
import { motion } from 'framer-motion'

let banner = 'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749634383/hifahtechnology/home-images/IMG_5468_1.webp'

const LifeAtHifah = () => {

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
    <div className='overflow-hidden'>
        <Navbar/>
        {/* hero */}
        <div className='pt-20'>
            <img src={banner} className='w-full mt-[-30px] h-auto ' alt="" />
            <div className='bg-[#121212] w-full py-8 px-4 sm:px-12 mont '>
                <div className='flex flex-col sm:flex-row items-start gap-4'>
                    <motion.h1 
                        {...fadeLeft(0.24)}
                        className='text-white font-semibold text-[24px] sm:text-[32px] w-full sm:w-[69%]'
                    >
                        Life at Hifah Technologies
                    </motion.h1>
                    <motion.p 
                    {...fadeRight(0.24)}
                        className='text-[#d0d0d0] font-medium text-[14px] sm:text-[16px]'
                    >
                        At <span className='text-[#a5d283]'>Hifah Technologies</span>, we believe in building an innovative, inclusive, and growth-driven work environment where creativity and collaboration thrive. Our culture encourages continuous learning, teamwork, and the pursuit of excellence, enabling every team member to reach their full potential.
                        <br/><br/>
We consider our people to be our greatest strength. By fostering respect, recognition, and a strong sense of community, we empower our team to deliver impactful solutions and drive meaningful progress for our clients and partners.</motion.p>
                </div>
            </div>
        </div>
        <LifeStyle fadeUp={fadeUp} />
        {/* <Catering fadeUp={fadeUp}/> */}
        {/* <CEOBirthday fadeUp={fadeUp}/> */}
        {/* <OurTeam fadeUp={fadeUp} /> */}
        <div className='overflow-hidden'>
            <Footer/>
        </div>
    </div>
  )
}

export default LifeAtHifah