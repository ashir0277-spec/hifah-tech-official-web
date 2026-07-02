import { Cloud, Database, Layers, Palette, Smartphone } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const Elite = ({ fadeUp }) => {
  const tools = ["react", "vue.js", "next.js"]
  const services = [
    {
      icon: <Smartphone />,
      title: 'Mobile Native',
      desc: 'Swift & Kotlin experts creating seamless, native experiences for iOS and Android platforms.'
    },
    {
      icon: <Palette />,
      title: 'UI/UX Design',
      desc: 'Editorial design thinkers who balance aesthetic beauty with functional precision.'
    },
    {
      icon: <Cloud />,
      title: 'A & DevOps',
      desc: 'Ensuring 99.9% uptime and zero-bug deployment cycles with automated testing.'
    },
  ]

  return (
    <div className='py-8 sm:py-24'>
      <motion.p {...fadeUp(0.14)} className='text-base sm:text-lg text-[#4AC3D5] font-semibold mb-2'>
        Meet Our Specialties
      </motion.p>
      <motion.h1 {...fadeUp(0.24)} className='font-semibold text-2xl sm:text-[44px] leading-tight'>
        Elite Expertise Across the Stack
      </motion.h1>
     

      {/*
        Cards row:
          mobile       → stacked (flex-col)
          tablet sm–lg → stacked (flex-col) to avoid squeeze
          desktop xl+  → side by side (flex-row)
      */}
      <div className='flex flex-col xl:flex-row items-stretch gap-6 my-8'>

        {/* Frontend card — full width when stacked, 70% on desktop */}
        <motion.div
          {...fadeUp(0.24)}
          className='bg-[#4AC3D5] text-white py-4 px-5 rounded-lg w-full xl:w-[70%]'
        >
          <div className='w-13 h-13 bg-[#FFFFFF3D] flex items-center justify-center rounded-full'>
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.4 20C1.74 20 1.175 19.7552 0.705 19.2656C0.235 18.776 0 18.1875 0 17.5V2.5C0 1.8125 0.235 1.22396 0.705 0.734375C1.175 0.244792 1.74 0 2.4 0H21.6C22.26 0 22.825 0.244792 23.295 0.734375C23.765 1.22396 24 1.8125 24 2.5V17.5C24 18.1875 23.765 18.776 23.295 19.2656C22.825 19.7552 22.26 20 21.6 20H2.4ZM2.4 17.5H21.6V5H2.4V17.5ZM6.6 16.25L4.92 14.5L8.01 11.25L4.89 8L6.6 6.25L11.4 11.25L6.6 16.25ZM12 16.25V13.75H19.2V16.25H12Z" fill="white" />
            </svg>
          </div>
          <h2 className='font-semibold text-2xl sm:text-[28px] py-3'>Frontend Architects</h2>
          <p className='font-medium text-sm sm:text-base'>
            Building high-performance, responsive interfaces that deliver world-class user experiences across every device.
          </p>
          {/* Tags — wrap on small screens */}
          <div className='flex flex-wrap items-center gap-2 mt-5'>
            {tools.map((t) => (
              <div key={t} className='bg-[#FFFFFF3D] py-1.5 px-4 text-sm font-bold text-white uppercase rounded-full'>
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Backend card — full width when stacked, 30% on desktop */}
        <motion.div
          {...fadeUp(0.44)}
          className='bg-[#4AC3D5] text-white py-4 px-5 rounded-lg w-full xl:w-[30%]'
        >
          <h1 className='font-semibold text-2xl sm:text-[28px] pb-3 pt-6'>Backend System</h1>
          <p className='font-medium text-sm sm:text-base'>
            Specialists in Node.js, Python, Go, and Java for scalable architectures.
          </p>
          <div className='flex items-center gap-2 mt-8'>
            <div className='w-10 h-10 bg-[#FFFFFF3D] flex items-center justify-center rounded-md'>
              <Database className='w-5 h-5 text-white' />
            </div>
            <div className='w-10 h-10 bg-[#FFFFFF3D] flex items-center justify-center rounded-md'>
              <Cloud className='w-5 h-5 text-white' />
            </div>
            <div className='w-10 h-10 bg-[#FFFFFF3D] flex items-center justify-center rounded-md'>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.61667 17.4 10.9667 16.4125 12.05 14.9375C13.1333 13.4625 13.7667 11.8167 13.95 10H8V2.125L2 4.375V9.1C2 9.28333 2 9.43333 2 9.55C2 9.66667 2.01667 9.81667 2.05 10H8V17.9Z" fill="white" />
              </svg>
            </div>
          </div>
        </motion.div>

      </div>

      {/*
        Services grid:
          mobile  → 1 col
          tablet  → 2 col
          desktop → 3 col
      */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7'>
        {services.map((s, idx) => (
          <motion.div
            {...fadeUp(0.20 + idx * 0.07)}
            key={idx}
            className='rounded-4xl px-6 py-5 bg-[#3333330A]'
          >
            <div className='flex items-center justify-center text-[#64748B] bg-[#64748b19] rounded-full w-10 h-10 sm:w-12 sm:h-12'>
              {s.icon}
            </div>
            <h2 className='font-semibold text-xl pt-4 pb-2'>{s.title}</h2>
            <p className='font-medium text-[#64748B] text-sm sm:text-base'>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Elite