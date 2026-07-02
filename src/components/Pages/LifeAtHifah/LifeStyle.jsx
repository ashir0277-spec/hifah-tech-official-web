import React from 'react'
// import banner1 from '../../../assets/media/hidden-hill/hidden-hill (1).png'
// import banner2 from '../../../assets/media/hidden-hill/hidden-hill (2).png'
// import banner3 from '../../../assets/media/hidden-hill/hidden-hill (3).png'
// import banner4 from '../../../assets/media/hidden-hill/hidden-hill (4).png'
// import banner5 from '../../../assets/media/hidden-hill/hidden-hill (5).png'
// import banner6 from '../../../assets/media/hidden-hill/hidden-hill (6).png'
import quote from '../../../assets/media/hidden-hill/quotes.svg'
// import birthday1 from '../../../assets/media/birthday/birthday (1).png'
// import birthday2 from '../../../assets/media/birthday/birthday (2).png'
// import birthday3 from '../../../assets/media/birthday/birthday (3).png'
// import birthday4 from '../../../assets/media/birthday/birthday (4).png'
import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ImageSlider from '../../Sections/ImageSlider/ImageSlider'


let  banner1 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749631615/hifahtechnology/ceo-birthday-25/birthdayevent1.webp'
let  banner2 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749629351/hifahtechnology/lunch/hifah-lunch-14.webp'
let  banner3 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749628938/hifahtechnology/lunch/hifah-lunch-5_2.webp'
let  banner4 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749627475/hifahtechnology/hiddenhills-group-slider/hifah-lunch-12.JPG.jpg'
let  banner5 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749627476/hifahtechnology/hiddenhills-group-slider/hifah-lunch-20.JPG.jpg'
let  banner6 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749627475/hifahtechnology/hiddenhills-group-slider/hifah-lunch-3.JPG.jpg'



let  birthday1 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749631644/hifahtechnology/ceo-birthday-25/birthdayevent23.webp'
let  birthday2 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749631582/hifahtechnology/ceo-birthday-25/birthdayevent2.webp'
let  birthday3 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749632936/hifahtechnology/Opening-ceremony/opening1.webp'
let  birthday4 =  'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749631615/hifahtechnology/ceo-birthday-25/birthdayevent1.webp'


const LifeStyle = ({fadeUp}) => {
    const images = [banner1, banner3, banner5, banner2, banner4, banner6];
    const imagesRibon = [birthday1, birthday2, birthday3, birthday4];
    const imagesAwards = [banner1, banner3, banner5, banner2, banner4, banner6];
  return (
    <>
    {/* life style */}
    <div className='w-[92%] m-auto py-20 mont'>
        <motion.h1
        {...fadeUp(0.24)}
        className='text-[#333] font-semibold text-[22px] sm:text-[44px]'>Our Lifestyle at Hifah Technologies</motion.h1>
        <motion.p
         {...fadeUp(0.24)}
         className='text-[#474747] font-medium text-sm sm:text-[18px]'>
            “At <span className='font-bold'>Hifah Technologies</span>, creativity, collaboration, and cutting-edge innovation drive us to build solutions that transform industries and empower growth. We are committed to leveraging the latest technologies to solve complex challenges, streamline processes, and unlock new opportunities for our clients. <br/> <br/>
           <span className='hidden sm:block'>
            Our team thrives on curiosity and forward-thinking, turning ideas into impactful products that redefine what’s possible. By fostering a culture of continuous learning and inclusive collaboration, we ensure that every project not only meets but exceeds expectations, creating lasting value for businesses and communities alike.”
            </span>
        </motion.p>
        <motion.div {...fadeUp(0.24)} className='block sm:hidden'>
            <ImageSlider images={images} />
        </motion.div>
        <div className='hidden sm:block'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
            <motion.img {...fadeUp(0.14)} src={banner1} className='w-full rounded-[14px]' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.34)} src={banner2} className='w-full rounded-[14px]' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.54)} src={banner3} className='w-full rounded-[14px]' alt="hidden hills lunch" />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
            <motion.img {...fadeUp(0.24)} src={banner4} className='w-full rounded-[14px]' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.34)} src={banner5} className='w-full rounded-[14px]' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.54)} src={banner6} className='w-full rounded-[14px]' alt="hidden hills lunch" />
        </div>
        </div>
        <motion.div {...fadeUp(0.24)} className='border border-[#A5D283] rounded-xl mt-12 p-4 relative'>
            <div className='absolute -top-4 right-3 sm:right-0'>
           <img className='w-8 h-8' src={quote} alt="quote" />

            </div>

            <p className='text-[#474747] font-medium text-sm sm:text-[20px]'>At <span className='font-bold'>Hifah Technologies</span>, the opportunity to work on innovative and impactful ideas inspires me and keeps me motivated every day.</p>
        </motion.div>
    </div>


    {/* grand opening */}

   <div className='w-[92%] m-auto mont'>
        <motion.h1 {...fadeUp(0.24)} className='text-[#333] font-semibold text-[22px] sm:text-[44px]'>Grand Opening<br/> Ribbon-Cutting Ceremony</motion.h1>
        <motion.p {...fadeUp(0.24)} className='text-[#474747] font-medium text-sm sm:text-[18px]'>
           In <span className='font-bold'>April 2025, Hifah Technologies</span> marked a significant milestone with the inauguration of our new office. Our team gathered to commemorate this achievement with warm reflections, joyful celebrations, and a shared sense of accomplishment.<br/><br/>
           <span className='hidden sm:block'>
The ribbon-cutting was performed by the founder's parents, a meaningful tribute that highlights the values and heritage at the core of our organization.</span>
        </motion.p>
        <motion.div {...fadeUp(0.24)} className='block sm:hidden'>
            <ImageSlider images={imagesRibon} />
        </motion.div>
        <div className='hidden sm:block'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10'>
            <motion.img {...fadeUp(0.24)} src={birthday1} className='w-full h-[400px] object-cover rounded-md' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.44)} src={birthday2} className='w-full h-[400px] object-cover rounded-md' alt="hidden hills lunch" />
        </div>
        <div className='flex flex-col sm:flex-row mt-6 gap-6'>
            <motion.img {...fadeUp(0.24)} src={birthday3} className='w-full sm:w-[40%] h-[400px] object-cover rounded-md' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.44)} src={birthday4} className='w-full sm:w-[60%] h-[400px] object-cover rounded-md' alt="hidden hills lunch" />
        </div>
        </div>
        <motion.div {...fadeUp(0.54)} className='border border-[#A5D283] rounded-xl mt-12 p-4 relative'>
            <div className='absolute -top-4 right-3 sm:right-0'>
           <img className='w-8 h-8' src={quote} alt="quote" />
            </div>
            <p className='text-[#474747] font-medium text-sm sm:text-[20px]'>Being part of <span className='font-bold'>Hifah Technologies</span> energizes me. The opportunity to work on innovative solutions and impactful ideas inspires me to stay motivated and creative every day.</p>
        </motion.div>
    </div>




    {/* cattering */}
    <div className='w-[92%] m-auto py-20 mont'>
        <motion.h1 {...fadeUp(0.24)} className='text-[#333] font-semibold text-[22px] sm:text-[44px]'>Performance Awards Ceremony</motion.h1>
        <motion.p {...fadeUp(0.24)} className='text-[#474747] font-medium text-sm sm:text-[18px]'>
            At <span className='font-bold'>Hifah Technologies</span>, we believe that excellence is achieved through creativity, collaboration, and a commitment to innovation. Today, we gather to recognize and celebrate the outstanding performance, dedication, and achievements that continue to drive our organization forward. <br/> <br/>
           <span className='hidden sm:block'>
Our success is built on individuals who embrace challenges, think beyond boundaries, and consistently deliver impactful results. By leveraging cutting-edge technologies and fostering a culture of continuous learning, we empower our teams to transform ideas into meaningful solutions that create value for our clients and communities.</span>
        </motion.p>
        <motion.div {...fadeUp(0.24)} className='block sm:hidden'>
            <ImageSlider images={imagesAwards} />
        </motion.div>
        <div className='hidden sm:block'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
            <motion.img {...fadeUp(0.24)} src={banner1} className='w-full' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.44)} src={banner2} className='w-full' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.54)} src={banner3} className='w-full' alt="hidden hills lunch" />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
            <motion.img {...fadeUp(0.24)} src={banner4} className='w-full' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.44)} src={banner5} className='w-full' alt="hidden hills lunch" />
            <motion.img {...fadeUp(0.54)} src={banner6} className='w-full' alt="hidden hills lunch" />
        </div>
        </div>
        <motion.div {...fadeUp(0.34)} className='border border-[#A5D283] rounded-xl mt-12 p-4 relative'>
            <div className='absolute -top-4 right-3 sm:right-0'>
           <img className='w-8 h-8' src={quote} alt="quote" />

            </div>

            <p className='text-[#474747] font-medium text-sm sm:text-[20px]'>At <span className='font-bold'>Hifah Technologies</span>, the opportunity to work on innovative and impactful ideas inspires me and keeps me motivated every day.</p>
        </motion.div>
    </div>
    </>
  )
}

export default LifeStyle