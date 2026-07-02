import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import img1 from '../../../assets/images/about-media-1.jpg'
import img2 from '../../../assets/images/about-media-2.jpg'
import arrow from '../../../assets/icons/arrowRight.svg'
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup'

import mission from '../../../assets/media/event (3).png'


const HowWroks = () => {

  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const lineref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(false)
          requestAnimationFrame(() => setAnimate(true))
        }
      },
      { threshold: 0.3 }
    )
    if (lineref.current) observer.observe(lineref.current)
    return () => observer.disconnect()
  }, [])

  const isMobile = typeof window !== "undefined" && window.innerWidth < 440;

  return (
    <section className="py-16 sm:py-28">
      <div className="mx-auto w-[90%] sm:w-[88%]">

        {/* "About Us" label — only on desktop (lg+) aligned right of left column */}
        <div className='flex justify-start lg:justify-end w-full lg:w-[57.5%]'>
          <motion.p
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className='text-base sm:text-xl hidden lg:block text-[#4AC3D5] font-semibold mb-2'
          >About Us</motion.p>
        </div>

        {/*
          Layout strategy:
          - Mobile  (<640px):  flex-col  (existing mobile styles)
          - Tablet  (640–1023px): flex-col, stacked — image on top, content below
          - Desktop (1024px+): flex-row side-by-side (existing sm: styles promoted to lg:)
        */}
        <div className='flex flex-col lg:flex-row gap-0 lg:gap-10'>

          {/* ── IMAGE BLOCK ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className='w-full lg:w-[50%] relative min-h-[260px] lg:min-h-[380px] sm:flex sm:flex-col sm:gap-4 lg:block'
          >
            {/* Top image — hidden on mobile, full width on tablet, absolute on desktop */}
            <img
              src={img1}
              className='h-[250px] lg:h-[302px] hidden sm:block rounded-[12px] relative lg:absolute top-0 right-0 w-full lg:w-auto object-cover'
              alt="media"
            />

            {/* Bottom / main image — full width on tablet, absolute on desktop */}
            <img
              src={mission}
              className='w-full lg:w-auto relative lg:absolute rounded-[12px] bottom-0 left-0 h-[260px] lg:h-[302px] object-cover'
              alt="media"
            />

            {/* "Since 2022" badge — desktop rotated vertical */}
            <div className='bg-[#A2D184] py-2.5 hidden lg:block px-4 w-fit absolute top-16 -left-14 -rotate-90'>
              <p className='text-white text-[26px] uppercase font-semibold'>Since 2022</p>
            </div>

            {/* "Since 2022" badge — mobile (top-left, no rotation) */}
            <div className='bg-[#A2D184] py-1 px-2 w-fit block sm:hidden absolute top-0 left-0'>
              <p className='text-white text-[16px] uppercase font-semibold'>Since 2022</p>
            </div>

            {/* "Since 2022" badge — tablet only (below images, inline) */}
            <div className='bg-[#A2D184] py-1.5 px-3 w-fit hidden sm:block lg:hidden mt-4'>
              <p className='text-white text-[20px] uppercase font-semibold'>Since 2022</p>
            </div>
          </motion.div>

          {/* ── CONTENT BLOCK ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className='w-full lg:w-[50%] mont'
          >

            {/* Heading */}
            <h2 className="mont text-2xl sm:text-[30px] lg:text-[48px] mt-4 sm:mt-6 lg:mt-0 font-semibold leading-8 sm:leading-10 lg:leading-14 text-[#454648] w-full">
              <span className='text-[#454648]'>
                An Expert {isMobile ? <></> : <br />} Team for Digital
              </span>{' '}&<br />
              Tech Solutions
            </h2>

            {/* Description */}
            <p className="mt-2 sm:mt-4 mont text-sm sm:text-base lg:text-lg font-medium text-[#454648]">
              At Hifah Technologies, we deliver innovative, scalable, and high-performance digital solutions tailored to modern business needs. Since 2022, we have helped startups, enterprises, and growing businesses build, launch, and grow through web, app, custom software, and digital services.
            </p>

            {/* Stats row */}
            <div className='flex items-center justify-between gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-12'>
              <div>
                <h2 className='text-[#4AC3D5] roboto text-xl sm:text-[28px] lg:text-[36px] font-semibold'>
                  <CountUp start={0} end={350} duration={2} enableScrollSpy scrollSpyOnce />+
                </h2>
                <p className='text-[#333333CC] text-sm sm:text-base font-semibold'>
                  {isMobile ? '' : 'Projects'} completed
                </p>
              </div>
              <div>
                <h2 className='text-[#4AC3D5] roboto text-xl sm:text-[28px] lg:text-[36px] font-semibold'>
                  <CountUp start={0} end={9} duration={2} enableScrollSpy scrollSpyOnce />+
                </h2>
                <p className='text-[#333333CC] text-sm sm:text-base font-semibold'>
                  {isMobile ? 'Users' : 'Industries Served'}
                </p>
              </div>
              <div>
                <h2 className='text-[#4AC3D5] roboto text-xl sm:text-[28px] lg:text-[36px] font-semibold'>
                  <CountUp start={0} end={100} duration={2} enableScrollSpy scrollSpyOnce />+
                </h2>
                <p className='text-[#333333CC] text-sm sm:text-base font-semibold'>
                  {isMobile ? 'Reviews' : '5-star reviews'}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='mt-6 sm:mt-8 lg:mt-12 flex gap-4 sm:gap-6 lg:gap-10 mont'>
              <button
                onClick={() => navigate('/about')}
                className="relative px-4 py-2.5 w-full sm:w-auto rounded-full font-semibold bg-[#4AC3D5] transition-colors duration-300"
              >
                <span className="relative z-10 text-white text-sm sm:text-base flex items-center justify-center gap-3">
                  Explore More
                  <img src={arrow} alt="arrow" />
                </span>
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="relative px-2 sm:px-4 py-2.5 w-full sm:w-auto rounded-full font-semibold bg-[#4AC3D5] transition-colors duration-300"
              >
                <span className="relative z-10 text-white text-sm sm:text-base flex items-center justify-center gap-3">
                  Contact Us
                  <img src={arrow} alt="arrow" />
                </span>
              </button>
            </div>

            <motion.div
              ref={ref}
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 relative gap-8"
            />

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowWroks