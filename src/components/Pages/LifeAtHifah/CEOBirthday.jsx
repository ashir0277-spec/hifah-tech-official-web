import React from 'react'
import birthday1 from '../../../assets/media/birthday/birthday (1).png'
import birthday2 from '../../../assets/media/birthday/birthday (2).png'
import birthday3 from '../../../assets/media/birthday/birthday (3).png'
import birthday4 from '../../../assets/media/birthday/birthday (4).png'
import quote from '../../../assets/media/hidden-hill/quotes.svg'
import ImageSlider from '../../Sections/ImageSlider/ImageSlider'
import { motion } from 'framer-motion'

const CEOBirthday = ({fadeUp}) => {
  const imagesbirthday = [birthday1, birthday2, birthday3, birthday4]
  return (
    <div className='w-[88%] sm:w-[88%] m-auto py-10 mont'>

      {/* Heading */}
      <motion.h1 {...fadeUp(0.24)} className='text-[#333] font-semibold text-[22px] sm:text-[44px] leading-tight'>
        A professional CEO Birthday Celebration
      </motion.h1>

      {/* Description */}
      <motion.p {...fadeUp(0.34)} className='text-[#474747] font-medium text-sm sm:text-[18px] mt-4 w-full'>
        It was more than just a celebration; it was a moment to appreciate leadership, vision, and dedication. The team gathered over lunch, where we had the chance to connect and turn a meal into meaningful conversations.
      </motion.p>
      <motion.p {...fadeUp(0.40)} className='text-[#474747] font-medium text-sm sm:text-[18px] mt-3 w-full'>
        The room was filled with smiles, heartfelt wishes, and a sense of unity that reflects who we are.
      </motion.p>

<motion.div {...fadeUp(0.24)} className='block sm:hidden'>
            <ImageSlider images={imagesbirthday} />
        </motion.div>
        <div className='hidden sm:block'>
      {/* Row 1 — Two equal columns */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10'>
        <img
          src={birthday1}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="CEO Birthday celebration with team"
        />
        <img
          src={birthday2}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="Team dining at CEO Birthday"
        />
      </div>

      {/* Row 2 — Smaller left (1fr) + Wider right (2fr) */}
      <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 sm:gap-6 mt-4 sm:mt-6'>
        <img
          src={birthday3}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="Team gathering"
        />
        <img
          src={birthday4}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="CEO Birthday cake moment"
        />
      </div>
      </div>

      {/* Quote Box */}
      <motion.div {...fadeUp(0.24)} className='border border-[#A5D283] rounded-xl mt-12 p-4 sm:p-6 relative'>
        <div className='absolute -top-4 right-3 sm:right-0'>
          <img className='w-8 h-8' src={quote} alt="quote" />
        </div>
        <p className='text-[#474747] font-medium text-sm sm:text-[20px]'>
          <span className='font-bold'>Hifah Technologies</span> gives me the opportunity to collaborate with passionate people and work on ideas that truly matter.
        </p>
      </motion.div>

    </div>
  )
}

export default CEOBirthday