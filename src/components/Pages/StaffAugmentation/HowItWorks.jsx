import { Calendar, ClockCheck, Search, Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const HowItWorks = ({ fadeUp }) => {
    const steps = [
        {
            icon: <Search className='w-6 h-6 text-[#4AC3D5]' />,
            title: 'Define What You Need?',
            desc: 'We will have a discovery call with you to review your requirements.'
        },
        {
            icon: <Users className='w-6 h-6 text-[#4AC3D5]' />,
            title: 'Mix & Match',
            desc: 'We ll provide you with professionals with the right skill set.'
        },
        {
            icon: <Calendar className='w-6 h-6 text-[#4AC3D5]' />,
            title: 'Choose your schedule',
            desc: 'Decide how many hours you need and when.'
        },
        {
            icon: <ClockCheck className='w-6 h-6 text-[#4AC3D5]' />,
            title: 'Work Together',
            desc: 'Collaborate directly with your expert team to complete your tasks.'
        },
    ]

    return (
        <div className='my-24 text-[#333]'>
            <motion.h1 {...fadeUp(0.14)} className='font-semibold text-2xl mb-4 sm:text-[44px]'>
                How It Work
            </motion.h1>
          

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 '>
                {steps.map((s, idx) => (
                    <motion.div
                        {...fadeUp(0.20 + idx * 0.07)}
                        key={idx}
                        className='relative'
                    >
                        {/* ── Top row: badge + connector line ── */}
                        <div className='flex items-center mb-6 '>
                            {/* Numbered badge */}
                            <div className='w-10 h-10 rounded-full bg-[#4AC3D5] flex items-center justify-center text-white text-sm font-semibold shrink-0'>
                                0{idx + 1}
                            </div>
                            {/* Horizontal line — bleeds across column gap so it's seamless */}
                            {idx < steps.length - 1 && (
                                <div className='hidden lg:block flex-1 h-[1px] bg-[#CCCCCCB2] mr-[-20px]' />
                            )}
                        </div>

                        {/* ── Card ── */}
                        <div className='border border-[#D9D9D9] rounded-xl px-5 py-4 h-[200px]'>
                            {/* Icon */}
                            <div className='mb-4'>
                                {s.icon}
                            </div>
                            <h2 className='font-semibold text-lg sm:text-xl pb-2 leading-snug'>
                                {s.title}
                            </h2>
                            <p className='text-sm sm:text-base text-[#333333] font-medium leading-relaxed'>
                                {s.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default HowItWorks