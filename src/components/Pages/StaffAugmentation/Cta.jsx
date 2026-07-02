import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NewsLetter = () => {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();
  return (
    <div className='mb-20 py-8 sm:py-20 mont px-6'>
      <motion.div
      initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        viewport={{ once: true }}
      className='bg-black w-full sm:w-[80%] rounded-2xl mx-auto py-10 px-6'>
        <h1 className='text-[#fff] font-semibold text-2xl sm:text-[44px] text-center capitalize'>Ready to build your<br/> dream team?</h1>
        <p className='text-[#ffffffd6] font-medium text-base sm:text-[20px] text-center px-5 sm:px-0 mt-4 w-full sm:w-[65%] mx-auto'>Skip the recruitment headache and get started with elite engineers today</p>
        <div className='w-full mx-auto flex items-center justify-center mt-6 flex-col sm:flex-row'>
                <button onClick={() => navigate('/contact')} className='bg-[#fff] text-black py-2.5 px-4 rounded-full text-base font-semibold'>Book  A Free Consultation</button>
        </div>

      </motion.div>
    </div>
  )
}

export default NewsLetter