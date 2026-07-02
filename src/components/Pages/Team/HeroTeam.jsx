import React from 'react'
import grid from '../../../assets/media/grid.svg'
import { motion } from 'framer-motion'

const HeroTeam = () => {
  return (
    <div className='relative pt-0 sm:pt-16'>
        <img src={grid} className='absolute w-full top-0' alt="grid" />
    <div className='pb-8 sm:pb-12 py-7 pt-16 sm:pt-0 w-[88%] sm:w-[88%] mx-auto relative'>
        <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        viewport={{ once: true }}
        className='relative z-10'>
        <p className='text-base sm:text-lg text-[#333] font-semibold mb-4'>Our Team</p>
        <h2 className="mont text-2xl font-semibold tracking-tight text-[#333] sm:text-[40px] capitalize">Meet the team behind us<span className='text-[#4AC3D5]'></span></h2>
        <p className="mt-2 sm:mt-3 text-[15px] sm:text-lg mont font-medium text-[#454648] mont w-full sm:w-[63%]">Get to know the talented professionals driving our success, combining creativity and expertise to deliver high-performance web and mobile solutions for ambitious businesses.</p>
        </motion.div>
    </div>
    </div>
  )
}

export default HeroTeam