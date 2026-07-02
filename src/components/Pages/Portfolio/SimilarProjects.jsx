import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react'
import p1 from '../../../assets/mockups/BlinkBack.png'
import p2 from '../../../assets/images/paktruck.png'
import p3 from '../../../assets/mockups/Zipzap talk.png'
import { useLocation, useNavigate } from 'react-router-dom';

const SimilarProjects = () => {
  let navigate = useNavigate();
  const [showBtn, setShowBtn] = useState(true)

  const path = useLocation();
  useEffect(() => {
    if (path.pathname === '/portfolio') {
      setShowBtn(false)
    }
  }, [path.pathname])

  const projects = [
    {
      id: '68e4a409ddd034f02c91b25c',
      image: p1,
      title: 'Blink Back',
      description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
      tags: ["5 Screens", "Mobile App", "Dark Theme"],
    },
    {
      id: '68ce9a68ddd034f02c9182d9',
      image: p3,
      title: 'Zipzap Talk',
      description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
      tags: ["5 Screens", "Mobile App", "Dark Theme"],
    },
    {
      id: '685132674446ea22b44bd30c',
      image: p2,
      title: 'Pak Truck',
      description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
      tags: ["5 Screens", "Mobile App", "Dark Theme"],
    },
  ]

  const [hoverId, setHoverId] = useState('')

  return (
    <div className='mx-auto w-[88%] py-10 sm:py-20'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className="mont text-2xl font-semibold tracking-tight text-[#454648] sm:text-[48px]">
          Featured Projects
        </h2>
      </div>

      {/*
        Grid layout:
          mobile  → 1 column
          tablet (sm–lg) → 1 column   (was sm:grid-cols-2, now kept at 1)
          desktop (lg+)  → 3 columns
      */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {projects.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: idx * 0.15 }}
            viewport={{ once: true }}
            className='group relative cursor-pointer rounded-xl overflow-hidden'
            onMouseEnter={() => setHoverId(item.id)}
            onMouseLeave={() => setHoverId('')}
            onClick={() => navigate(`/portfolio/${item.id}`)}
          >
            {/* Card height is driven by the image's natural dimensions */}
            <div className='relative w-full bg-[#F5F5F7]'>
              <img
                className='w-full h-auto block'
                src={item.image}
                alt={item.title}
              />

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent
                  transition-opacity duration-300
                  ${hoverId === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              />

              {/* Text overlay */}
              <div
                className={`absolute bottom-4 left-4 right-4 text-white
                  transition-all duration-300
                  ${hoverId === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0'}`}
              >
                <h3 className='text-xl font-semibold mb-1'>{item.title}</h3>
                <p className='text-xs leading-relaxed line-clamp-2 text-white/80'>{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showBtn && (
        <div
          onClick={() => navigate('/portfolio')}
          className='flex bg-[#4AC3D5] hover:bg-[#36b1c4] transition-colors duration-250
                     w-fit mx-auto px-9 py-2.5 rounded-full items-center justify-center gap-3
                     cursor-pointer mt-10'
        >
          <p className='text-sm sm:text-base text-white font-semibold hover:underline'>
            View Our All Projects
          </p>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.13243 11.3409C0.389989 8.56076 1.10931 5.47146 3.29039 3.29039C6.54476 0.0360171 11.8211 0.0360171 15.0755 3.29039C18.3299 6.54476 18.3299 11.8211 15.0755 15.0755C12.8944 17.2566 9.80512 17.9759 7.02498 17.2335M11.6831 11.683V6.68303M11.6831 6.68303H6.68306M11.6831 6.68303L3.34957 15.0163"
              stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default SimilarProjects