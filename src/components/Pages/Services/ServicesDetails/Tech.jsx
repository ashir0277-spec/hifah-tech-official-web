import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';

const Tech = ({tools, fadeUp}) => {
    const { id } = useParams();
    const [uiUx, setUiUx] = useState(false)
    useEffect(() => {
        if (id === 'ui-ux-designing') {
            setUiUx(true)
        }
    }, [id])
    
    // const tools = ["HTML5", "CSS", "JavaScript", "React", "Next.js", "Node.js"];
  return (
    <div className='bg-[#121314] '>
        <div className='flex flex-col lg:flex-row gap-3 items-center justify-between w-[90%] mx-auto py-20'>
            <div>
            <motion.h1 {...fadeUp(0.24)} className='text-2xl sm:text-[30px] font-bold text-white'>Tools & Technologies</motion.h1>
            <motion.p {...fadeUp(0.34)} className='text-sm sm:text-lg font-regular text-[#FFFFFFCC] mt-3'>We use industry-leading tools to build<br/> reliable, high- performance applications.</motion.p>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 mt-5 sm:mt-0'>
                {tools.map((t, idx) => (
                    <motion.div {...fadeUp((0.20 + idx * 0.17))} className='bg-[#4AC3D514] text-[#4AC3D5] font-semibold text-sm sm:text-base text-center py-6 px-9 rounded-lg'>{t}</motion.div>

                ))}
            </div>
        </div>
    </div>
  )
}

export default Tech