import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = ({ hero }) => {
      
  const navigate = useNavigate();

  const Icon = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 -3.91654e-07 10 -8.74228e-07C4.48 -1.3568e-06 1.3568e-06 4.48 8.74228e-07 10C3.91654e-07 15.52 4.48 20 10 20ZM6.5 9.25L11.69 9.25L9.97 7.53C9.68 7.24 9.68 6.76 9.97 6.47C10.12 6.32 10.31 6.25 10.5 6.25C10.69 6.25 10.88 6.32 11.03 6.47L14.03 9.47C14.32 9.76 14.32 10.24 14.03 10.53L11.03 13.53C10.74 13.82 10.26 13.82 9.97 13.53C9.68 13.24 9.68 12.76 9.97 12.47L11.69 10.75L6.5 10.75C6.09 10.75 5.75 10.41 5.75 10C5.75 9.59 6.09 9.25 6.5 9.25Z" fill="#4AC3D5"/>
      </svg>
    )
  }
      
  return (
    <>
      <section className='bg-[#121212] from-[#000000] to-[#000000cc] w-full relative h-[75vh] sm:h-screen overflow-hidden'>
        <div className="bg-[#32E2FAB2] w-[40px] sm:w-[100px] blur-[130px] -rotate-30 h-[60px] sm:h-[360px] rounded-full absolute -top-20 z-2 left-0" />
        <div className="bg-[#32E2FAB2] w-[40px] sm:w-[100px] blur-[130px] rotate-30 h-[60px] sm:h-[360px] rounded-full absolute -top-20 z-10 right-0" />

        <div className="absolute -bottom-20 blur-[74px] left-[30%] sm:left-[45%] rounded-full w-[272px] h-[100px] sm:h-[172px] bg-gradient-to-r z-1 from-[#28B5C8] to-[#000000]" />
        
        <div className='h-[70vh] sm:h-[100vh] flex items-start sm:items-center bg-no-repeat mont'>
          <div className='mx-4 lg:mx-14 text-center relative w-full z-10 mt-13 sm:-mt-12'>
            
            <motion.p
              className='text-sm sm:text-sm text-[#4AC3D5] bg-[#4AC3D529] rounded-full px-5 py-2 font-semibold mb-3 mt-14 w-fit mx-auto capitalize'
            >
              {hero.tag}
            </motion.p>
            
            <motion.h1
              className="text-white sm:h-[90px] w-full pt-2   text-[26px] sm:text-3xl md:text-[40px] lg:text-[48px] font-semibold whitespace-pre-line"
            >
              {hero.title}  <span className="text-[#4AC3D5]"><br/>{hero.colorTitle}</span>
            </motion.h1>
            
            <motion.p
              className='font-  font-[370] mt-4 sm:mt-8 sm:font-[350] text-[#ffffff] lg:mt-12 text-sm sm:text-base mont sm:text-xl w-full sm:w-[70%] mx-auto'
            >
              {hero.description}
            </motion.p>
            
            <motion.div
              className='flex items-center justify-center gap-4 sm:gap-10 mt-6 sm:mt-10 '
            >
              <button 
                onClick={() => navigate('/contact')}
                className="relative px-4 py-2 w-full sm:w-auto rounded-full font-semibold bg-transparent text-[#4AC3D5] border border-[#4AC3D5] transition-colors duration-300"
              >
                <span className="relative z-10 text-sm sm:text-base flex items-center justify-center gap-3">
                  Get Started
                  <Icon/>
                </span> 
              </button>
              
              <button 
                onClick={() => navigate('/about')}
                className="relative px-4 py-2 w-full sm:w-auto rounded-full text-[#4AC3D5] font-semibold bg-[#4AC3D533] transition-colors duration-300"
              >
                <span className="relative z- text-sm sm:text-base flex items-center justify-center gap-3">
                  About Us
                  <Icon/>
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero;