import { Building2, BuildingIcon, LucideBuilding, Palette, Search, ShieldCheck } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const Excellence = ({points, fadeUp}) => {
  return (
    <div className='mx-auto w-[90%] py-10 sm:py-24'>
    <div className='text-center'>
    <motion.h2{...fadeUp(0.24)}  className="mont text-xl font-semibold tracking-tight text-[#333] sm:text-[48px]">Engineered for Excellence </motion.h2>
    <motion.p {...fadeUp(0.24)} className="mt-1 text-sm sm:text-lg font-medium text-[#333333E5]">We don't just build websites; we build assets that perform under pressure.</motion.p>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center text-center justify-center gap-4 mt-10'>
        {points.map((p, idx) => (
            <motion.div {...fadeUp((0.20 +idx * 0.17))} key={idx} className='flex flex-col items-center text-center justify-center'>
                <div className='bg-[#4AC3D514] text-[#4AC3D5] rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center'>
                {p.icon}
                </div>
                <h2 className='font-semibold text-sm sm:text-base pt-4 sm:pt-7 pb-1 sm:pb-2'>{p.title}</h2>
                <p className='font-medium text-[#596064] text-sm sm:text-base'>{p.text}</p>
            </motion.div>
        ))}
    </div>
    </div>
  )
}

export default Excellence