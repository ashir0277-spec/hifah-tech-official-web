import React from 'react'
import group from '../../../assets/career/Group 1321315491.png'

const BuildCareer = () => {
  return (
    <div className='w-full px-4 lg:w-[72%] m-auto py-16 sm:py-20 mont'>

      {/* Heading with left cyan border */}
      <div className='border-l-4 border-[#4AC3D5] pl-4'>
        <h1 className='text-[#333] font-semibold text-[24px] sm:text-[36px] md:text-[44px] leading-tight'>
          Build your Career
        </h1>
        <h1 className='text-[#333] font-semibold text-[24px] sm:text-[36px] md:text-[44px] leading-tight'>
          With Hifah Technologies
        </h1>
      </div>

      {/* Single Group Image — full width, responsive */}
      <div className='mt-10 w-full'>
        <img
          src={group}
          className='w-full h-auto object-contain'
          alt="Build your career with Hifah Technologies"
        />
      </div>

      {/* Bottom Text */}
      <div className='mt-10 sm:mt-12'>
        <p className='text-[#333] font-semibold text-[16px] sm:text-[18px]'>
          Empowering Innovation, Together
        </p>
        <p className='text-[#474747] font-medium text-[15px] sm:text-[17px] mt-2 w-full leading-relaxed'>
          We turn ideas into impactful digital solutions through creativity and smart execution, ensuring every concept becomes a real-world success. Our team focuses on building innovative products that solve real-world problems with efficiency and purpose. Together, we grow, create, and deliver excellence in every project with passion and dedication.
        </p>
      </div>

    </div>
  )
}

export default BuildCareer