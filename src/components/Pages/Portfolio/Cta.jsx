import React from 'react'
import { motion as MOTION } from 'framer-motion'

const Cta = () => {
    const zoomIn = {
      hidden: {
        opacity: 0,
        scale: 0.15,
        y: 60,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      },
    };
  return (
    
    <div className='w-full bg-white my-10 sm:my-16 py-10  arch'>
        <div className='w-[92%] bg-[#017aff] sm:w-[80%] m-auto py-[64px] rounded-2xl'>
             <MOTION.h1
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[#fff] leading-14 text-[32px] sm:text-[44px] text-center w-full font-semibold"
      >
        Have an idea or project?
      </MOTION.h1>
      <MOTION.p
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="text-[#fff] mt-5 text-base sm:text-lg px-2 sm:px-0 text-center poppins font-regular"
      >
        Build the Apps and Websites Your Users Will Love
      </MOTION.p>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-8 mt-10 poppins text-base font-semibold'>
        <a href={`mailto:hifzakanwal.official@gmail.com?subject=${encodeURIComponent('Project Discussion')}&body=${encodeURIComponent('Hi, I want to discuss about a project \n Tell me about your availability.')}`} target="_blank" rel="noopener noreferrer">
       <button className="relative overflow-hidden rounded-full py-3 px-8 border border-[#fff] bg-[#017aff] text-[#fff] group">
        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#017aff]">
            Send an Email
        </span>

        {/* curved wave */}
        <span
        className="absolute left-1/2 bottom-0 bg-[#fff]
            w-[120%] h-[45%]
            -translate-x-1/2 translate-y-full
            rounded-t-[100%] rounded-b-none
            transition-all duration-500 ease-out
            group-hover:h-[160%]
            group-hover:translate-y-0"
        />
        </button>
        </a>

        <a href={`http://wa.me/923281223062?text=${encodeURIComponent('Hi, I want to discuss about a project \n Tell me about your availability.')}`} target="_blank" rel="noopener noreferrer">
        <button className="relative overflow-hidden rounded-full py-3 px-8 bg-[#fff] text-[#017aff] border border-transparent group">
        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#fff]">
            Chat on WhatsApp
        </span>

        {/* curved fill */}
        {/* curved wave */}
        <span
        className="absolute left-1/2 bottom-0 bg-[#017aff]
            w-[120%] h-[45%]
            -translate-x-1/2 translate-y-full
            rounded-t-[100%] rounded-b-none
            transition-all duration-500 ease-out
            group-hover:h-[160%]
            group-hover:translate-y-0"
        />
        </button>
        </a>
      </div>
        </div>
    </div>
  )
}

export default Cta