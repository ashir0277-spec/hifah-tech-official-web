import React from 'react'
import careerbg from '../../../assets/images/careerbg.png'

const CareerHero = () => {
  return (
    <div className='w-full min-h-[220px] sm:min-h-[260px] md:min-h-[400px] flex items-center justify-center relative overflow-hidden mont'
      style={{
        background: `url(${careerbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'cover',
      }}
    >
      {/* Decorative blobs */}
      <div className='absolute top-0 left-0 w-40 h-40 rounded-full opacity-20'
        style={{ background: 'radial-gradient(circle, #DFCAF699 0%, transparent 70%)' }}
      />
      <div className='absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-20'
        style={{ background: 'radial-gradient(circle, #FDF3DC 0%, transparent 70%)' }}
      />
      {/* Dot grid top-right */}
      <div className='absolute top-4 right-6 opacity-20'
        style={{
          backgroundImage: 'radial-gradient(circle, #aaa 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          width: '80px',
          height: '60px',
        }}
      />

      {/* Content */}
      <div className='text-center px-6 py-14 sm:py-16 z-10 relative'>
        <h1 className='text-[#fff] font-semibold text-[28px] sm:text-[36px] md:text-[40px] leading-tight'>
          Career &amp; Opportunities
        </h1>
        <p className='text-[#fff] font-medium text-[15px]  md:text-[16px] mt-4  w-[80%] lg:w-2xl mx-auto leading-relaxed'>
          Join Hifah Technologies and become part of a dynamic team dedicated to
          creating innovative digital solutions for businesses worldwide.
        </p>
      </div>
    </div>
  )
}

export default CareerHero