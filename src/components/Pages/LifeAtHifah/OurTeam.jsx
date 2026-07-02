import React from 'react'
import team1 from '../../../assets/media/team (1).png'
import team2 from '../../../assets/media/team (2).png'
import team3 from '../../../assets/media/team (3).png'
import quote from '../../../assets/media/hidden-hill/quotes.svg'
import { motion } from 'framer-motion'
import ImageSlider from '../../Sections/ImageSlider/ImageSlider'

const OurTeam = ({fadeUp}) => {
  const imagesteam = [team1, team2, team3]
  return (
    <div className='w-[88%] sm:w-[88%] m-auto py-20 mont'>

      {/* Heading */}
      <motion.h1 {...fadeUp(0.24)} className='text-[#333] font-semibold text-[22px] sm:text-[44px] leading-tight'>
        We are "One Team"
      </motion.h1>

      {/* Description */}
      <motion.p {...fadeUp(0.34)} className='text-[#474747] font-medium text-sm sm:text-[18px] mt-4 max-w-full'>
        At <span className='font-bold'>Hifah Technologies</span>, we believe that great teams succeed by supporting and uplifting one another. Every team member brings unique skills, perspectives, and strengths that contribute to our collective success. By valuing diversity in talent and ideas, we build a stronger and more collaborative workplace.
      </motion.p>
      <motion.p {...fadeUp(0.44)} className='text-[#474747] font-medium text-sm sm:text-[18px] mt-3 max-w-full hidden sm:block'>
        Through our employee recognition and appreciation initiatives, we celebrate outstanding performance and acknowledge the contributions of every individual. We are committed to empowering our team members, recognizing their potential, and fostering an environment where everyone can grow and succeed.
      </motion.p>

      <motion.div {...fadeUp(0.24)} className='block sm:hidden'>
            <ImageSlider images={imagesteam} />
        </motion.div>
        <div className='hidden sm:block'>
      {/* Image Grid — 3 equal columns */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10'>
        <motion.img {...fadeUp(0.34)}
          src={team1}
          className='w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover rounded-lg'
          alt="Hifah Technologies team group photo"
        />
        <motion.img {...fadeUp(0.54)}
          src={team2}
          className='w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover rounded-lg'
          alt="Hifah Technologies team outdoors"
        />
        <motion.img {...fadeUp(0.74)}
          src={team3}
          className='w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover rounded-lg'
          alt="Hifah Technologies team gathering"
        />
      </div>
    </div>
      {/* Quote Box */}
      <motion.div {...fadeUp(0.84)} className='border border-[#A5D283] rounded-xl mt-12 p-4 sm:p-6 relative'>
        <div className='absolute -top-4 right-3 sm:right-0'>
          <img className='w-8 h-8' src={quote} alt="quote" />
        </div>
        <p className='text-[#474747] font-medium text-sm sm:text-[18px] sm:text-[20px]'>
          Working with <span className='font-bold'>Hifah Technologies</span> allows me to grow professionally while contributing to exciting and innovative projects.
        </p>
      </motion.div>

    </div>
  )
}

export default OurTeam