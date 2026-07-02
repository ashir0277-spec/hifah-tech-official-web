import React from 'react'
import { motion } from 'framer-motion'

const CoreFunctions = ({ experties, fadeUp }) => {
  return (
    <div className='py-20'>
      <div className='text-center'>
        <motion.h2
          {...fadeUp(0.24)}
          className="mont text-xl font-semibold tracking-tight text-[#333] md:text-[36px] lg:text-[48px]"
        >
          Core Expertise
        </motion.h2>
        <motion.p
          {...fadeUp(0.34)}
          className="mt-1 text-sm md:text-base lg:text-lg font-medium text-[#333333E5]"
        >
          Tailored Solutions for Your Success, Elevate Your Experience<br />
          with our Exceptional and Comprehensive Services Today
        </motion.p>
      </div>

      {/* 
        Mobile  (< 768px):  1 column  — col-span-12
        Tablet  (768–1023): 2 columns — col-span-6 / col-span-6
        Desktop (1024px+):  original layout — 6/3/3 then 6/6 or 4/4/4
      */}
      <div className='grid grid-cols-12 gap-3 md:gap-4 lg:gap-5 mt-10 px-4 sm:px-12 w-full'>
        {experties.map((s, idx) => {
          const spanClass =
            idx === 0
              ? 'col-span-12 md:col-span-6  lg:col-span-6'
              : idx === 1
              ? 'col-span-12 md:col-span-6  lg:col-span-3'
              : idx === 2
              ? 'col-span-12 md:col-span-6  lg:col-span-3'
              : experties.length === 5
              ? 'col-span-12 md:col-span-6  lg:col-span-6'
              : 'col-span-12 md:col-span-6  lg:col-span-4'

          return (
            <motion.div
              {...fadeUp(0.20 + idx * 0.10)}
              key={idx}
              className={`${spanClass} shadow-[0px_20px_40px_0px_#0064990F] rounded-xl px-4 py-5 md:px-5 md:py-6 lg:px-4 lg:py-5`}
            >
              <div className='rounded-full text-[#4AC3D5] w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 flex items-center justify-center text-sm md:text-lg lg:text-lg font-semibold'>
                {s.icon}
              </div>
              <h2 className='font-semibold text-lg md:text-xl lg:text-2xl pt-3 pb-1 md:pb-2'>{s.title}</h2>
              <p className='font-medium text-sm md:text-sm lg:text-base'>{s.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default CoreFunctions