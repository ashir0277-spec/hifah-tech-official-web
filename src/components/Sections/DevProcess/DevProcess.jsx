import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import AnimatedArrows from './AnimatedArrow';
import { motion } from 'framer-motion';
const DevProcess = () => {
    const steps = [
        {
            title: "Requirements",
            desc: "Analysis & Discovery"
        },
        {
            title: "Planning",
            desc: "Strategy & Architecture"
        },
        {
            title: "Design",
            desc: "UI/UX Prototyping"
        },
        {
            title: "Development",
            desc: "Agile Coding & Build"
        },
        {
            title: "Testing",
            desc: "Quality Assurance"
        },
        {
            title: "Support",
            desc: "Deployment & Maintenance"
        },
    ]

     const { ref, inView } = useInView({
                triggerOnce: true, // animate only first time (optional)
                threshold: 0.1,    // 20% of the section visible = trigger
            });
        
            const container = {
                hidden: {},
                visible: {
                    transition: {
                    staggerChildren: 0.1, // gap between cards
                    },
                },
            };
        
            const item = {
                hidden: { y: 60, opacity: 0 },
                visible: { y: 0, opacity: 1 },
            };
    
         const lineref = useRef(null)
        const [animate, setAnimate] = useState(false)
        
        useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setAnimate(false)
                requestAnimationFrame(() => setAnimate(true))
              }
            },
            { threshold: 0.3 }
          )
        
          if (lineref.current) observer.observe(lineref.current)
          return () => observer.disconnect()
        }, [])

  return (
    <div className='w-[88%] sm:w-[88%] mx-auto pb-10 sm:pb-20'>
        <div className='text-center'>
            <p className='text-base sm:text-lg text-[#4AC3D5] font-semibold mb-3'>How we Work</p>
            <h2 className="mont text-3xl font-semibold tracking-tight text-[#454648] sm:text-4xl">Our Development Process</h2>
            <p className="mt-4 text-base text-[#454648] w-full sm:w-[50%] mx-auto">We select world-class tools to build resilient, scalable, and delightful digital experiences. Our stack is modern, battle-tested, and future-proof</p>
        </div>

         <motion.div
     ref={ref}
    variants={container}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    className="grid grid-cols-1 md:grid-cols-6 relative gap-3">
        {/* <div className='hidden sm:block absolute left-0 top-0'>
           
           <AnimatedArrows/>
        </div>
        <div className='hidden sm:block absolute left-104 top-0'>
           
           <AnimatedArrows />
        </div> */}
        <svg className='absolute hidden sm:block top-14 left-36' width="1091" height="12" viewBox="0 0 1091 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4.7735L5.04736e-07 -4.29153e-06L-5.04736e-07 11.547L10 6.7735L10 4.7735ZM1081 6.77359L1091 11.5471L1091 9.10867e-05L1081 4.77359L1081 6.77359ZM9 5.7735L9 6.7735L1082 6.77359L1082 5.77359L1082 4.77359L9 4.7735L9 5.7735Z" fill="#4AC3D5"/>
</svg>


        {steps.map((st, idx) => (
            <motion.div 
             ref={ref}
            variants={item}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative text-center p-4 sm:p-4 hover:border-primary/50 duration-300">
            {/* <div className="absolute top-6 right-6 text-6xl font-semibold text-black/15 ">0{idx+1}</div> */}
            <div className="mb-2 sm:mb-6 inline-flex w-15 h-15 bg-[#4AC3D5] border-[#FFFFFF] border-2 shadow-[0_6px_20px_0_#3889FA52] items-center justify-center rounded-full text-primary">
            <span className="material-symbols-outlined font-semibold text-white text-[20px]">0{idx+1}</span>
            </div>
            <h3 className="text-xl font-semibold mont text-[#171A1F] mb-2">{st.title}</h3>
            <p className="text-[#757B88] text-base mont font-medium leading-relaxed">{st.desc}</p>
            </motion.div>

        ))}
    </motion.div>
    </div>
  )
}

export default DevProcess