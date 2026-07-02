import React from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const mission = 'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749628938/hifahtechnology/lunch/hifah-lunch-21.webp'
const vision = 'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749628938/hifahtechnology/lunch/hifah-lunch-5.webp'

const Mission = () => {
  return (
    <div className='my-20 w-[88%] sm:w-[88%] sm:w-[85%] mx-auto'>
        
        {/* Mission Section */}
        <div className='flex flex-col lg:flex-row items-center gap-10 sm:gap-20'>
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className='w-full lg:w-[50%]'
            >
                <img 
                    className='w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[420px] object-cover rounded-2xl' 
                    src={mission} 
                    alt="mission" 
                    loading="lazy"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className='w-full lg:w-[42%]'
            >
                <p className='font-extrabold text-[#4AC3D5] text-base sm:text-lg'>01</p>
                <h2 className='font-semibold text-[#333] text-[26px] sm:text-[40px]'>Our Mission</h2>
                <p className='font-medium text-base sm:text-xl text-[#333333cc]'>
                    At Hifah Technologies, our mission is to empower businesses through innovative and reliable digital solutions. We transform ideas into scalable products that create real value and measurable impact. With a focus on quality, creativity, and modern technology, we deliver solutions that help businesses grow in a competitive digital world. We are committed to building long-term partnerships by understanding client needs and providing tailored services.
                </p>
            </motion.div>
        </div>

        {/* Vision Section */}
        <div className='flex flex-col lg:flex-row items-center gap-10 sm:gap-20 mt-20'>
            
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className='w-full lg:w-[50%] order-2 lg:order-1'
            >
                <p className='font-extrabold text-[#4AC3D5] text-lg'>02</p>
                <h2 className='font-semibold text-[#333] text-[26px] sm:text-[40px]'>Our Vision</h2>
                <p className='font-medium text-base sm:text-xl text-[#333333cc] w-[90%]'>
                    At Hifah Technologies, our vision is to become a leading global technology partner delivering innovative and scalable digital solutions. We aim to drive digital transformation by helping businesses adapt, grow, and succeed in an ever-evolving tech landscape. Our focus is to create impactful products that combine creativity, performance, and reliability. We strive to build a future where technology empowers every business to reach its full potential.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className='w-full lg:w-[50%] order-1 lg:order-2'
            >
                <img 
                    className='w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[420px] object-cover rounded-2xl' 
                    src={vision} 
                    alt="vision" 
                    loading="lazy"
                />
            </motion.div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mt-10'>
            <div className='bg-white rounded-[10px] shadow-[0_20px_50px_0_#E3EBFC] p-6'>
                <p className='text-[#4AC3D5] font-semibold text-[28px]'>
                    <CountUp start={0} end={400} duration={2} enableScrollSpy scrollSpyOnce />+
                </p>
                <p className='text-[#333333CC] font-semibold text-base'>Projects completed</p>
            </div>
            <div className='bg-white rounded-[10px] shadow-[0_20px_50px_0_#E3EBFC] p-6'>
                <p className='text-[#4AC3D5] font-semibold text-[28px]'>
                    <CountUp start={0} end={600} duration={2} enableScrollSpy scrollSpyOnce />%
                </p>
                <p className='text-[#333333CC] font-semibold text-base'>Return on investment</p>
            </div>
            <div className='bg-white rounded-[10px] shadow-[0_20px_50px_0_#E3EBFC] p-6'>
                <p className='text-[#4AC3D5] font-semibold text-[28px]'>
                    <CountUp start={0} end={10} duration={3} enableScrollSpy scrollSpyOnce />k
                </p>
                <p className='text-[#333333CC] font-semibold text-base'>Global downloads</p>
            </div>
            <div className='bg-white rounded-[10px] shadow-[0_20px_50px_0_#E3EBFC] p-6'>
                <p className='text-[#4AC3D5] font-semibold text-[28px]'>
                    <CountUp start={0} end={200} duration={2} enableScrollSpy scrollSpyOnce />+
                </p>
                <p className='text-[#333333CC] font-semibold text-base'>5-star reviews</p>
            </div>
        </div>
    </div>
  )
}

export default Mission