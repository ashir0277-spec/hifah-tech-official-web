import React, { useRef, useState } from 'react'
import arrUp from '../../assets/icons/arrUp.svg'

// Local Asset Imports for Videos
import test from '../../assets/media/dinner.png'
import test2 from '../../assets/media/opening2.png'
import test3 from '../../assets/media/test3.png'
import test4 from '../../assets/media/test4.png'

// External Service Links for Banner & Gallery Images
const banner   = "https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749634383/hifahtechnology/home-images/IMG_5468_1.webp";
const banner2  = "https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749632950/hifahtechnology/Opening-ceremony/opening5.webp";
const event1   = "https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749628938/hifahtechnology/lunch/hifah-lunch-5_2.webp";
const event2   = "https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749628938/hifahtechnology/lunch/hifah-lunch-11.webp";
const event3   = "https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749628938/hifahtechnology/lunch/hifah-lunch-21.webp";

import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Gallery = () => {

  const images = [event1, event2, event3];

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

  // Videos - EXACT ORIGINAL STRUCTURE
  const videos = [
    {
        img: test,
        name: 'John Doe',
        designation: 'Amazing  Dinner',
        time: '12:45'
    },
    {
        img: test2,
        name: 'Jane Smith',
        designation: 'Opening cermony',
        time: '12:45'
    },
    {
        img: test3,
        name: 'Emily Johnson',
        designation: 'Head of Marketing, Creative Solutions Ltd.',
        time: '12:45'
    },
    {
        img: test,
        name: 'John Doe',
        designation: 'Amazing  Dinner',
        time: '12:45'
    },
    {
        img: test,
        name: 'John Doe',
        designation: 'Amazing  Dinner',
        time: '12:45'
    },
  ]

  const [videoIdx, setVideoIdx] = useState(0)
  const videoDragStart = useRef(null)

  const handleVideoTouchStart = (e) => { videoDragStart.current = e.touches[0].clientX }
  const handleVideoTouchEnd = (e) => {
    if (videoDragStart.current === null) return
    const diff = videoDragStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) setVideoIdx((p) => (p + 1) % videos.length)
      else setVideoIdx((p) => (p - 1 + videos.length) % videos.length)
    }
    videoDragStart.current = null
  }

  const sliderRef = useRef(null);

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2,    
  });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [hoverId, setHoverId] = useState('')

  const navigate = useNavigate();

  return (
    <div className='my-26 px-4 sm:px-18 overflow-hidden'>
      <p className='text-sm sm:text-xl mont text-[#4AC3D5] font-semibold'>Hifah Technologies Gallery</p>
      
      <div className='block sm:flex items-end justify-between'>
        <h2 className="mont text-[20px] font-semibold tracking-tight text-[#333] sm:text-[40px]">The Team We're Proud to Stand Behind </h2>
        <div onClick={() => navigate('/life-at-hifah-technologies')} className='hidden sm:flex items-center gap-3 cursor-pointer'>
          <p className='text-sm sm:text-base text-[#4AC3D5] font-medium hover:underline'>View Our All Gallery</p>
          <img src={arrUp} alt="arrow Up" />
        </div>
      </div>

      {/* ==================== IMAGE GALLERY ==================== */}
      {/* Mobile + MD + LG Slider */}
      <div
        className='block lg:hidden mt-4 relative overflow-hidden'
        onTouchStart={handleBannerTouchStart}
        onTouchEnd={handleBannerTouchEnd}
      >
        <AnimatePresence mode='wait'>
          <motion.img
            key={bannerIdx}
            src={images[bannerIdx]}
            alt={`slide-${bannerIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}    
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className='w-full object-cover rounded-2xl'     
          />
        </AnimatePresence>

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

      {/* Desktop Gallery - Starts from LG */}
      <div className='w-full pb-10 hidden lg:block'>
        <div className='flex flex-col lg:flex-row gap-5 mt-8'>
          <motion.img
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className='w-full lg:w-1/2 h-[370px] object-cover rounded-2xl' 
            src={banner} 
            alt="" 
          />
          <motion.img
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            viewport={{ once: true }}
            className='w-full lg:w-1/2 h-[370px] object-cover rounded-2xl' 
            src={banner2} 
            alt="" 
          />
        </div>

        <div className='flex flex-col lg:flex-row gap-5 mt-5'>
          <motion.img
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            viewport={{ once: true }}
            className='w-full lg:w-1/3 h-[290px] object-cover rounded-2xl' 
            src={event1} 
            alt="" 
          />
          <motion.img
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            viewport={{ once: true }}
            className='w-full lg:w-1/3 h-[290px] object-cover rounded-2xl' 
            src={event2} 
            alt="" 
          />
          <motion.img
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            viewport={{ once: true }}
            className='w-full lg:w-1/3 h-[290px] object-cover rounded-2xl' 
            src={event3} 
            alt="" 
          />
        </div>
      </div>

      {/* ==================== VIDEOS SECTION (UNTOUCHED) ==================== */}
      {/* <h2 className="mont text-[24px] font-semibold tracking-tight text-[#333] sm:text-[32px] pt-6 sm:pt-0">Our Videos</h2>
              
      <motion.div 
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >

        <motion.div
          ref={sliderRef}
          className="mt-4 hidden sm:flex gap-4 overflow-x-auto sm:overflow-hidden scroll-smooth"
        >
          {videos.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ flex: 1 }}
              animate={{ flex: isMobile ? (activeIndex === index ? 4 : 1) : 1 }}
              whileHover={!isMobile ? { flex: 4 } : {}}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => isMobile && setActiveIndex(index)}
              onMouseEnter={() => { setHovered(true); setHoverId(index) }}
              onMouseLeave={() => { setHovered(false); setHoverId('') }}
              className="relative h-[520px] rounded-3xl overflow-hidden cursor-pointer flex-[1] min-w-[70px] sm:min-w-[150px]"
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-full h-full object-cover rounded-3xl transition-all duration-500"
              />
              <div className={`absolute inset-0 ${isMobile ? (activeIndex === index ? "opacity-100" : "") : "group-hover:bg-black/10"} transition-all duration-500`} />
              <div className='absolute bottom-3 right-2 bg-black rounded-[6px] py-1 px-3 text-white font-semibold text-xl'>{testimonial.time}</div>
              <div className={`bg-[#31BBD0] ${hovered && hoverId === index ? 'opacity-100' : 'opacity-0'} flex items-center gap-3 absolute top-[40%] left-[40%] rounded-full py-2 px-3`}>
                <div className="bg-white/30 backdrop-blur-md p-2 rounded-full w-fit">
                  <Play fill="white" stroke="white" />
                </div>
                <p className='text-white font-semibold text-xl pr-2'>Play</p>
              </div>
              <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-full px-3 ${hovered && hoverId === index ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
                <p className="font-semibold text-white text-[26px] mt-4">{testimonial.designation}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="sm:hidden mt-4 relative"
          onTouchStart={handleVideoTouchStart}
          onTouchEnd={handleVideoTouchEnd}
        >
          <motion.div
            key={videoIdx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative h-[350px] rounded-xl overflow-hidden"
          >
            <img
              src={videos[videoIdx]?.img}
              alt={videos[videoIdx]?.name}
              className="w-full h-full object-cover"
            />

            <div className='absolute z-6 bottom-3 right-2 bg-black rounded-[6px] py-1 px-3 text-white font-semibold text-sm'>
              {videos[videoIdx]?.time}
            </div>

            <div className='bg-[#31BBD0] flex items-center gap-3 absolute z-8 top-[40%] left-1/2 -translate-x-1/2 rounded-full py-2 px-3'>
              <div className="bg-white/30 backdrop-blur-md p-2 rounded-full w-fit">
                <Play fill="white" className='w-4 h-4' stroke="white" />
              </div>
              <p className='text-white font-semibold text-sm pr-2'>Play</p>
            </div>

            <div className={`absolute z-5 inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-100 transition-opacity duration-300`}></div>

            <div className='absolute z-8 bottom-5 left-1/2 -translate-x-1/2 w-full px-3'>
              <p className="font-semibold text-white text-[16px] mt-4">{videos[videoIdx]?.designation}</p>
            </div>
          </motion.div>

          <div className='flex relative z-10 items-center justify-center gap-3 mt-4'>
            <button
              onClick={() => setVideoIdx((p) => (p - 1 + videos.length) % videos.length)}
              className='w-8 h-8 rounded-full border border-[#FFFFFF33] flex items-center justify-center text-white'
            >
              <ChevronLeft size={16} />
            </button>

            <div className='flex gap-2 items-center'>
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVideoIdx(i)}
                  style={{
                    width: videoIdx === i ? 20 : 8,
                    height: 8,
                    borderRadius: 99,
                    background: videoIdx === i ? '#31BBD0' : '#00000033',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setVideoIdx((p) => (p + 1) % videos.length)}
              className='w-8 h-8 rounded-full border border-[#FFFFFF33] flex items-center justify-center text-white'
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div> */}

      <div onClick={() => navigate('/life-at-hifah-technologies')} className='flex justify-center mt-4 bg-[#4AC3D5] hover:bg-[#36b1c4] transition-colors duration-250 w-fit mx-auto px-9 py-2.5 rounded-full sm:hidden items-center gap-3 cursor-pointer'>
        <p className='text-sm sm:text-base text-[#fff] font-medium'>View Our All Gallery</p>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.13243 11.3409C0.389989 8.56076 1.10931 5.47146 3.29039 3.29039C6.54476 0.0360171 11.8211 0.0360171 15.0755 3.29039C18.3299 6.54476 18.3299 11.8211 15.0755 15.0755C12.8944 17.2566 9.80512 17.9759 7.02498 17.2335M11.6831 11.683V6.68303M11.6831 6.68303H6.68306M11.6831 6.68303L3.34957 15.0163" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default Gallery