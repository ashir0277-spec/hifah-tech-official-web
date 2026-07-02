import { ArrowRight, Calendar } from 'lucide-react'
import React from 'react'
import calendar from '../../../assets/icons/calendar.svg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Cta = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <440;

    const navigate = useNavigate();

  return (
    <section className="bg-[#091114] py-20 lg:py-24 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        viewport={{ once: true }}
      className='text-center px-4 mont'>
        
       <h2 className="mont text-2xl font-semibold tracking-tight text-[#fff] sm:text-[44px]">Lets Build Something <span className='text-[#A5D283]'>{isMobile ? <></> : <br/>} Amazing  Together</span></h2>
        <p className="mt-4 text-base text-[#FFFFFFCC] w-full sm:w-[40%] mx-auto">Ready to transform your idea into a product? Let’s talk about your project and explore how we can help.</p>
          <div className='flex flex-row justify-center gap-4 w-full mt-5 sm:mt-12'>
            <button onClick={() => navigate('/contact')} className='text-[#A5D283] text-sm sm:text-base w-fit mt-4 sm:mt-0 font-medium border border-[#A5D283] rounded-full py-2 sm:py-2 px-4 flex items-center gap-3'>
              <img className='hidden sm:block' src={calendar} alt="icon" />
               Book Consultation</button>
            <button onClick={() => navigate('/contact')} className='text-[#A5D283] text-sm sm:text-base w-fit mt-4 sm:mt-0 font-medium bg-[#A5D2831F] backdrop-blur-[12px] rounded-full py-2 sm:py-2 px-4 flex items-center gap-3'>Start Project

              <svg className='hidden sm:block' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM8.5 11.25L13.69 11.25L11.97 9.53C11.68 9.24 11.68 8.76 11.97 8.47C12.12 8.32 12.31 8.25 12.5 8.25C12.69 8.25 12.88 8.32 13.03 8.47L16.03 11.47C16.32 11.76 16.32 12.24 16.03 12.53L13.03 15.53C12.74 15.82 12.26 15.82 11.97 15.53C11.68 15.24 11.68 14.76 11.97 14.47L13.69 12.75L8.5 12.75C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25Z" fill="#A5D283"/>
</svg>

            </button>
          </div>
      </motion.div>

</section>
  )
}

export default Cta