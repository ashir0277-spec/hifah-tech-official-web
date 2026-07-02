import React, { useRef, useState } from 'react'
// import diner from '../../../assets/media/dinnerabout.png'
// import diner2 from '../../../assets/media/event (2).png'
// import shields from '../../../assets/media/shields.png'
import grid from '../../../assets/media/grid.svg'
import { motion } from 'framer-motion'

let diner = 'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749627477/hifahtechnology/hiddenhills-group-slider/hifah-lunch-5_2.JPG.jpg'
let diner2 = 'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749627471/hifahtechnology/hiddenhills-group-slider/hifah-lunch-2.JPG.jpg' 
let shields = 'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749627480/hifahtechnology/hiddenhills-group-slider/hifah-lunch-4.JPG.jpg'

const HeroAbout = () => {
    const images = [ diner, diner2, shields];
    //   const videos = [banner2, test2, test4];
    
      const [bannerIdx, setBannerIdx] = useState(0)
    const bannerDragStart = useRef(null)
    
    const handleBannerTouchStart = (e) => { bannerDragStart.current = e.touches[0].clientX }
    const handleBannerTouchEnd = (e) => {
      if (bannerDragStart.current === null) return
      const diff = bannerDragStart.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 40) {
        if (diff > 0) setBannerIdx((p) => (p + 1) % images.length)
        else setBannerIdx((p) => (p - 1 + images.length) % images.length)
      }
      bannerDragStart.current = null
    }
  return (
    <>
        <img src={grid} className='absolute top-0 w-full object-cover' alt="grid" />
    <div className='py-14 sm:py-14 w-[88%] sm:w-[88%] mx-auto relative'>
        <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        viewport={{ once: true }}
        className='text-center relative z-10'>
        <p className='text-base sm:text-lg text-[#333] font-semibold mb-1'>About Us</p>
        <h2 className="mont text-3xl font-semibold tracking-tight text-[#454648] sm:text-[40px] w-[80%] mx-auto">Empowering the world to design</h2>
        <p className="mt-4 text-sm sm:text-base font-medium text-[#00000090] mont w-full sm:w-[47%] mx-auto">From mobile apps to AI-driven automation, web development to digital marketing – we provide everything your business needs to grow.</p>
        </motion.div>

        {/* desktop */}
        <div className='hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-5 pt-10'>
            <motion.img
            initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        viewport={{ once: true }}
            className='w-full rounded-2xl' src={diner} alt="dinner" />
            <motion.img
            initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        viewport={{ once: true }}
            className='w-full rounded-2xl' src={diner2} alt="dinner" />
            <motion.img
            initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        viewport={{ once: true }}
            className='w-full rounded-2xl' src={shields} alt="dinner" />
        </div>

        {/* mobile slider */}
        <div
          className='block sm:hidden mt-4 relative overflow-hidden'
          onTouchStart={handleBannerTouchStart}
          onTouchEnd={handleBannerTouchEnd}
        >
          <motion.img
            key={bannerIdx}
            src={images[bannerIdx]}
            alt={`slide-${bannerIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className='w-full object-cover rounded-2xl'
          />
        
          {/* Dots */}
          <div className='flex justify-center gap-2 mt-3'>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIdx(i)}
                style={{
                  width: bannerIdx === i ? 20 : 8,
                  height: 8,
                  borderRadius: 99,
                  background: bannerIdx === i ? '#31BBD0' : '#00000033',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
   
    </div>
    </>
  )
}

export default HeroAbout