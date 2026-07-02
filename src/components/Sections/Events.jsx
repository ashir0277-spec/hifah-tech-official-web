import React from 'react'
import banner from '../../assets/media/banner.png'
import office from '../../assets/media/office.png'
import event1 from '../../assets/media/event (1).png'
import event2 from '../../assets/media/event (2).png'
import event3 from '../../assets/media/event (3).png'
import { motion } from 'framer-motion'

const Events = () => {
  return (
    <div className='w-[88%] sm:w-[88%] mx-auto py-20'>
        <h2 className="mont text-[24px] font-semibold tracking-tight text-[#333] sm:text-[32px]">Ready to build something truly extraordinary?</h2>
        <div className='block sm:flex gap-5 mt-8'>
            <motion.img
            initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        viewport={{ once: true }}
            className='w-[50%] object-cover rounded-2xl' src={banner} alt="" />
            <motion.img
            initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        viewport={{ once: true }}
            className='w-[50%]' src={office} alt="" />
        </div>
        <div className='block sm:flex gap-5 mt-5'>
            <motion.img
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            viewport={{ once: true }}
            className='w-[50%]' src={event1} alt="" />
            <motion.img
            initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        viewport={{ once: true }}
            className='w-[50%]' src={event2} alt="" />
            <motion.img
            initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
        viewport={{ once: true }}
            className='w-[50%]' src={event3} alt="" />
        </div>

    </div>
  )
}

export default Events