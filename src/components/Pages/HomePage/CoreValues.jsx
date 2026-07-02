import { CodeSquare, CodeXmlIcon, Sparkles } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const  CoreValues = () => {
    const values = [
        {
            icon: <CodeXmlIcon className='w-5 h-5 sm:w-6 sm:h-6 text-white' />,
            title: "Innovation",
            desc: "We embrace creativity and new ideas to deliver smart, modern solutions."
        },
        {
            icon: <Sparkles className='w-5 h-5 sm:w-6 sm:h-6 text-white' />,
           title: "Transparency",
            desc: "We maintain clear, honest communication and accountability."
        },
        {
            icon: (
            <svg  className='w-5 h-5 sm:w-6 sm:h-6' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1414 4.07461L11.2581 1.89961C10.5414 1.58294 9.45807 1.58294 8.74141 1.89961L3.85807 4.07461C2.62474 4.62461 2.44141 5.37461 2.44141 5.77461C2.44141 6.17461 2.62474 6.92461 3.85807 7.47461L8.74141 9.64961C9.09974 9.80794 9.54974 9.89128 9.99974 9.89128C10.4497 9.89128 10.8997 9.80794 11.2581 9.64961L16.1414 7.47461C17.3747 6.92461 17.5581 6.17461 17.5581 5.77461C17.5581 5.37461 17.3831 4.62461 16.1414 4.07461Z" fill="white"/>
                <path d="M10.0003 14.1993C9.68359 14.1993 9.36693 14.1327 9.07526 14.0077L3.45859 11.5077C2.60026 11.1243 1.93359 10.0993 1.93359 9.15768C1.93359 8.81602 2.20859 8.54102 2.55026 8.54102C2.89193 8.54102 3.16693 8.81602 3.16693 9.15768C3.16693 9.60768 3.54193 10.191 3.95859 10.3743L9.57526 12.8743C9.84193 12.991 10.1503 12.991 10.4169 12.8743L16.0336 10.3743C16.4503 10.191 16.8253 9.61602 16.8253 9.15768C16.8253 8.81602 17.1003 8.54102 17.4419 8.54102C17.7836 8.54102 18.0586 8.81602 18.0586 9.15768C18.0586 10.091 17.3919 11.1243 16.5336 11.5077L10.9169 14.0077C10.6336 14.1327 10.3169 14.1993 10.0003 14.1993Z" fill="white"/>
                <path d="M10.0003 18.3341C9.68359 18.3341 9.36693 18.2674 9.07526 18.1424L3.45859 15.6424C2.53359 15.2341 1.93359 14.3091 1.93359 13.2924C1.93359 12.9508 2.20859 12.6758 2.55026 12.6758C2.89193 12.6758 3.16693 12.9508 3.16693 13.2924C3.16693 13.8174 3.47526 14.2924 3.95859 14.5091L9.57526 17.0091C9.84193 17.1258 10.1503 17.1258 10.4169 17.0091L16.0336 14.5091C16.5086 14.3008 16.8253 13.8174 16.8253 13.2924C16.8253 12.9508 17.1003 12.6758 17.4419 12.6758C17.7836 12.6758 18.0586 12.9508 18.0586 13.2924C18.0586 14.3091 17.4586 15.2258 16.5336 15.6424L10.9169 18.1424C10.6336 18.2674 10.3169 18.3341 10.0003 18.3341Z" fill="white"/>
            </svg>

            ),
            title: "Quality",
             desc: "We focus on delivering high-standard, reliable work with excellence."
        },
        {
            icon: (
            <svg className='w-5 h-5 sm:w-6 sm:h-6'  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1414 4.07461L11.2581 1.89961C10.5414 1.58294 9.45807 1.58294 8.74141 1.89961L3.85807 4.07461C2.62474 4.62461 2.44141 5.37461 2.44141 5.77461C2.44141 6.17461 2.62474 6.92461 3.85807 7.47461L8.74141 9.64961C9.09974 9.80794 9.54974 9.89128 9.99974 9.89128C10.4497 9.89128 10.8997 9.80794 11.2581 9.64961L16.1414 7.47461C17.3747 6.92461 17.5581 6.17461 17.5581 5.77461C17.5581 5.37461 17.3831 4.62461 16.1414 4.07461Z" fill="white"/>
                <path d="M10.0003 14.1993C9.68359 14.1993 9.36693 14.1327 9.07526 14.0077L3.45859 11.5077C2.60026 11.1243 1.93359 10.0993 1.93359 9.15768C1.93359 8.81602 2.20859 8.54102 2.55026 8.54102C2.89193 8.54102 3.16693 8.81602 3.16693 9.15768C3.16693 9.60768 3.54193 10.191 3.95859 10.3743L9.57526 12.8743C9.84193 12.991 10.1503 12.991 10.4169 12.8743L16.0336 10.3743C16.4503 10.191 16.8253 9.61602 16.8253 9.15768C16.8253 8.81602 17.1003 8.54102 17.4419 8.54102C17.7836 8.54102 18.0586 8.81602 18.0586 9.15768C18.0586 10.091 17.3919 11.1243 16.5336 11.5077L10.9169 14.0077C10.6336 14.1327 10.3169 14.1993 10.0003 14.1993Z" fill="white"/>
                <path d="M10.0003 18.3341C9.68359 18.3341 9.36693 18.2674 9.07526 18.1424L3.45859 15.6424C2.53359 15.2341 1.93359 14.3091 1.93359 13.2924C1.93359 12.9508 2.20859 12.6758 2.55026 12.6758C2.89193 12.6758 3.16693 12.9508 3.16693 13.2924C3.16693 13.8174 3.47526 14.2924 3.95859 14.5091L9.57526 17.0091C9.84193 17.1258 10.1503 17.1258 10.4169 17.0091L16.0336 14.5091C16.5086 14.3008 16.8253 13.8174 16.8253 13.2924C16.8253 12.9508 17.1003 12.6758 17.4419 12.6758C17.7836 12.6758 18.0586 12.9508 18.0586 13.2924C18.0586 14.3091 17.4586 15.2258 16.5336 15.6424L10.9169 18.1424C10.6336 18.2674 10.3169 18.3341 10.0003 18.3341Z" fill="white"/>
            </svg>

            ),
            title: "Collaboration",
            desc: "We believe in teamwork and strong partnerships to achieve the best results."
        },
    ]
     const { ref, inView } = useInView({
            triggerOnce: true, // animate only first time (optional)
            threshold: 0.2,    // 20% of the section visible = trigger
        });
    
        const container = {
            hidden: {},
            visible: {
                transition: {
                staggerChildren: 0.3, // gap between cards
                },
            },
        };
    
        const item = {
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1 },
        };
  return (
    <div className='bg-[#091114] w-full mont'>
        <div className='w-[88%] sm:w-[88%] m-auto py-13 sm:py-20'>
            <h2 className="mont text-2xl font-semibold tracking-tight text-center text-[#fff] sm:text-[44px]">Our Core Values</h2>
            <p className="mt-1 text-base sm:text-lg text-[#FFFFFF] mont text-center">The princeples that guide our work and<br/> relationships every day.</p>
            <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className='mt-4 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8'>
                {values.map((v, idx) => (
                    <motion.div
                    ref={ref}
                    variants={item}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    key={idx} className='bg-[#FFFFFF1A] rounded-xl py-3 sm:py-5 px-3 sm:px-5 group relative overflow-hidden'>
                         {/* Overlay */}
                        <span className="overlay absolute inset-0 rounded-xl"></span>

                        <div className="relative z-10">
                            <div className="bg-[#FFFFFF14] rounded-full w-10 h-10 sm:w-13 sm:h-13 flex items-center justify-center">
                            {v.icon}
                            </div>

                            <h1 className="text-base font-semibold tracking-tight mt-3 sm:mt-5 text-white sm:text-[20px]">
                            {v.title}
                            </h1>

                            <p className="mt-2 text-sm sm:text-[17px] text-[#FFFFFFB2] font-medium">
                            {v.desc}
                            </p>
                            </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </div>
  )
}

export default CoreValues