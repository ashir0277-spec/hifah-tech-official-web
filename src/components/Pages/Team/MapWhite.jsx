import React, { useState } from 'react'
import map from '../../../assets/images/mapWhite.svg'
import pk from '../../../assets/icons/PK.svg'
import jp from '../../../assets/icons/JP.svg'
import us from '../../../assets/icons/US.svg'
import au from '../../../assets/icons/AU.svg'
import { motion } from 'framer-motion'
const Map = () => {
    const locations = [
        {
            flag: pk,
            country: 'Pakistan',
            address : 'Jadoon Plaza Phase 2, Abbottabad',
        },
        {
            flag: jp,
            country: 'Japan',
            address : '8502 Preston Rd. Inglewood, Maine 98380',
        },
        {
            flag: us,
            country: 'United States',
            address : '8502 Preston Rd. Inglewood, Maine 98380',
        },
        {
            flag: au,
            country: 'Australia',
            address : '8502 Preston Rd. Inglewood, Maine 98380',
        },
    ]

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
  return (
    <div className='bg-[#fff] py-8 sm:py-18'>
        <div className='w-[88%] sm:w-[88%] mx-auto'>
        <p className='text-sm sm:text-base text-[#31BBD0] rounded-full px-3 py-1 mx-auto w-fit text-center font-semibold mb-3'>Offices</p>
        <h2 className="mont text-2xl font-semibold tracking-tight text-[#333] sm:text-[36px] text-center">We’re a distributed team</h2>
        <p className="mt-4 font-medium text-base sm:text-xl text-[#333333cc] text-center w-full sm:w-[62%] mx-auto">Our team operates across multiple locations, bringing together diverse expertise to deliver seamless collaboration and consistent, high-quality results worldwide.</p>
        <div className="flex justify-center mt-10 relative">
<motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    viewport={{ once: true }}
>

  <img src={map} className='relative w-[90%]' alt="map" />

  {/* Dot */}
  <div onClick={() => setIsOpen1(!isOpen1)} className="absolute top-9 sm:top-26 left-[50%] sm:left-[49.5%] group flex items-center justify-center">
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-40 animate-ping"></span>
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-30 animate-pulse [animation-delay:1.8s]"></span>
    {/* inner solid dot */}
    <span className="relative w-2 h-2 bg-[#31BBD0] rounded-full cursor-pointer"></span>
    {/* tooltip */}
    <div className={` ${isOpen1 ? "opacity-100" : ""} absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#FFFFFF33] backdrop-blur-[44px] text-[#344054] text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap rounded-lg px-3 py-4 text-center text-[#344054]`}>
    <div className='flex justify-center'>
        <img className='w-5 h-5' src={us} alt="pk" />
    </div>
    <p className='text-sm font-semibold mt-2'>London, UK</p>
    <p className='text-xs font-regular text-[#475467] mt-1'>100 Smith Street <br/>London VIC 3066 UK</p>
      <svg className='absolute -bottom-2 left-[45%]' width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1433 0.000913928C14.0342 0.000913928 14.4804 1.07806 13.8504 1.70802L7.77937 7.7791C7.38885 8.16962 6.75568 8.16962 6.36516 7.7791L0.294097 1.70802C-0.335867 1.07806 0.1103 0.00091435 1.0012 0.00091435L13.1433 0.000913928Z" fill="white"/>
</svg>

    </div>
  </div>
  {/* Dot */}
  <div onClick={() => setIsOpen2(!isOpen2)} className="absolute top-15 sm:top-52 left-[52%] sm:left-[53%] group flex items-center justify-center">
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-40 animate-ping"></span>
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-30 animate-pulse [animation-delay:1.8s]"></span>
    {/* inner solid dot */}
    <span className="relative w-2 h-2 bg-[#31BBD0] rounded-full cursor-pointer"></span>
    {/* tooltip */}
    <div className={` ${isOpen2 ? "opacity-100" : ""} absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#FFFFFF33] backdrop-blur-[44px] text-[#344054] text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap rounded-lg px-3 py-4 text-center text-[#344054]`}>
    <div className='flex justify-center'>
        <img className='w-5 h-5 rounded-full' src='https://flagcdn.com/w80/ae.png' alt="pk" />
    </div>
    <p className='text-sm font-semibold mt-2'>Dubai, UAE</p>
    <p className='text-xs font-regular text-[#475467] mt-1'>456 Business Bay,<br/>Dubai UAE</p>
      <svg className='absolute -bottom-2 left-[45%]' width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1433 0.000913928C14.0342 0.000913928 14.4804 1.07806 13.8504 1.70802L7.77937 7.7791C7.38885 8.16962 6.75568 8.16962 6.36516 7.7791L0.294097 1.70802C-0.335867 1.07806 0.1103 0.00091435 1.0012 0.00091435L13.1433 0.000913928Z" fill="white"/>
</svg>

    </div>
  </div>
  {/* Dot */}
  <div onClick={() => setIsOpen3(!isOpen3)} className="absolute top-16 sm:top-48 left-[59%] sm:left-[57%] group flex items-center justify-center">
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-40 animate-ping"></span>
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-30 animate-pulse [animation-delay:1.8s]"></span>
    {/* inner solid dot */}
    <span className="relative w-2 h-2 bg-[#31BBD0] rounded-full cursor-pointer"></span>
    {/* tooltip */}
   <div className={` ${isOpen3 ? "opacity-100" : ""} absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#FFFFFF33] backdrop-blur-[44px] text-[#344054] text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap rounded-lg px-3 py-4 text-center text-[#344054]`}>
    <div className='flex justify-center'>
        <img className='w-5 h-5' src={pk} alt="pk" />
    </div>
    <p className='text-sm font-semibold mt-2'>Abbottabad, PAK</p>
    <p className='text-xs font-regular text-[#475467] mt-1'>Jadoon Plaza<br/>Phase 2, Abbottabad</p>
      <svg className='absolute -bottom-2 left-[45%]' width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1433 0.000913928C14.0342 0.000913928 14.4804 1.07806 13.8504 1.70802L7.77937 7.7791C7.38885 8.16962 6.75568 8.16962 6.36516 7.7791L0.294097 1.70802C-0.335867 1.07806 0.1103 0.00091435 1.0012 0.00091435L13.1433 0.000913928Z" fill="white"/>
</svg>

    </div>
  </div>
  {/* Dot */}
  <div onClick={() => setIsOpen4(!isOpen4)} className="absolute bottom-8 sm:bottom-18 right-22 sm:right-[30%] group flex items-center justify-center">
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-40 animate-ping"></span>
    <span className="absolute w-6 h-6 rounded-full bg-[#31BBD0] opacity-30 animate-pulse [animation-delay:1.8s]"></span>
    {/* inner solid dot */}
    <span className="relative w-2 h-2 bg-[#31BBD0] rounded-full cursor-pointer"></span>
    {/* tooltip */}
    <div className={` ${isOpen4 ? "opacity-100" : ""} absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#FFFFFF33] backdrop-blur-[44px] text-[#344054] text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap rounded-lg px-3 py-4 text-center text-[#344054]`}>
    <div className='flex justify-center'>
        <img className='w-5 h-5' src={au} alt="jp" />
    </div>
    <p className='text-sm font-semibold mt-2'>Sydney, AU</p>
    <p className='text-xs font-regular text-[#475467] mt-1'>100 Smith Street <br/>Collingwood VIC 3066 AU</p>
      <svg className='absolute -bottom-2 left-[45%]' width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1433 0.000913928C14.0342 0.000913928 14.4804 1.07806 13.8504 1.70802L7.77937 7.7791C7.38885 8.16962 6.75568 8.16962 6.36516 7.7791L0.294097 1.70802C-0.335867 1.07806 0.1103 0.00091435 1.0012 0.00091435L13.1433 0.000913928Z" fill="white"/>
</svg>

    </div>
  </div>
</motion.div>
</div>
    </div>
    </div>
  )
}

export default Map