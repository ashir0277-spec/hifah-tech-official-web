import React from 'react'
import gathering1 from '../../../assets/media/gathering/gathering (1).png'
import gathering2 from '../../../assets/media/gathering/gathering (2).png'
import gathering3 from '../../../assets/media/gathering/gathering (3).png'
import gathering4 from '../../../assets/media/gathering/gathering (4).png'
import quote from '../../../assets/media/hidden-hill/quotes.svg'
import { motion } from 'framer-motion'
import ImageSlider from '../../Sections/ImageSlider/ImageSlider'


// let  gathering1 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749631644/hifahtechnology/ceo-birthday-25/birthdayevent23.webp'
// let  gathering2 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749631582/hifahtechnology/ceo-birthday-25/birthdayevent2.webp'
// let  gathering3 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749632936/hifahtechnology/Opening-ceremony/opening1.webp'
// let  gathering4 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749631615/hifahtechnology/ceo-birthday-25/birthdayevent1.webp'


const Catering = ({fadeUp}) => {
  const imagesgathering = [gathering1, gathering2, gathering3,gathering4]
  return (
    <div className='w-[88%] sm:w-[88%] m-auto py-10 mont'>

      {/* Heading */}
      <motion.h1 {...fadeUp(0.24)} className='text-[#333] font-semibold text-[22px] sm:text-[44px] leading-tight'>
        Flexible gathering for any corporate occasion.
      </motion.h1>

      {/* Description */}
      <motion.p {...fadeUp(0.24)} className='text-[#474747] font-medium text-sm sm:text-[18px] mt-4 w-full'>
        At <span className='font-bold'>Hifah Technologies</span>, we believe that good food brings people together. That's why our lunch program is more than just a meal, it's a moment to connect, recharge, and share joy with colleagues.
      </motion.p>
      <motion.p {...fadeUp(0.34)} className='text-[#474747] font-medium text-sm sm:text-[18px] mt-3 w-full'>
        Every lunch is crafted with care, offering fresh, balanced options that nourish both body and mind.
      </motion.p>

      <motion.div {...fadeUp(0.24)} className='block sm:hidden'>
            <ImageSlider images={imagesgathering} />
        </motion.div>
        <div className='hidden sm:block'>

      {/* Image Grid — Row 1: two equal columns */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10'>
        <motion.img {...fadeUp(0.34)}
          src={gathering1}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="Corporate gathering lunch"
        />
        <motion.img {...fadeUp(0.54)}
          src={gathering2}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="Corporate gathering meeting"
        />
      </div>

      {/* Image Grid — Row 2: small left + large right */}
      <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 sm:gap-6 mt-4 sm:mt-6'>
        <motion.img {...fadeUp(0.34)}
          src={gathering3}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="gathering awards"
        />
        <motion.img {...fadeUp(0.54)}
          src={gathering4}
          className='w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover rounded-lg'
          alt="Corporate event seating"
        />
      </div>
      </div>

      {/* Quote Box */}
      <motion.div {...fadeUp(0.34)} className='border border-[#A5D283] rounded-xl mt-12 p-4 sm:p-6 relative'>
        <div className='absolute -top-4 right-3 sm:right-0'>
          <img className='w-8 h-8' src={quote} alt="quote" />
        </div>
        <p className='text-[#474747] font-medium text-sm sm:text-[20px]'>
          At <span className='font-bold'>Hifah Technologies</span>, every project challenges me to think creatively and deliver meaningful results.<br className='hidden sm:block' />
          Being part of such a dynamic environment at <span className='font-bold'>Hifah Technologies</span> pushes me to stay curious, innovative, and constantly improve.
        </p>
      </motion.div>

    </div>
  )
}

export default Catering