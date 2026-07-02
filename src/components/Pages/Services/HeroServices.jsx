import React, { useEffect, useState } from 'react'
import { ArrowUpRight, BrainCircuit, ChevronRight, Cloud, Code2, Database, Figma, Funnel, LineChart, Megaphone, Palette, ShoppingCart, Smartphone, User2, Users } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Experties = () => {

 const tools = { 
    'Web Development': [
      
      
      {
        id: 'app-development',
        icon: <Smartphone className='w-5.5 h-5.5' />,
        title: "App Development",
        w: 38,
        text: "We develop user-friendly, responsive mobile apps for Android and iOS with seamless performance and usability."
      },
      {
        id: 'web-development',
        icon: <Code2 className='w-5.5 h-5.5' />,
        title: "Web Development",
        w: 60,
        text: "We build Custom-designed, WordPress websites, CRM, ERP & HRMS systems that are fast, secure, and scalable."
      },
      {
        id:"ui-ux-designing",
        icon: <Palette className='w-5.5 h-5.5' />,
        title: "UI/UX Designing",
        w: 32,
        text: "We create custom UI/UX designs with clean layouts, smooth navigation, and attractive interfaces for web and mobile platforms."
      },
      {
        id: 'digital-marketing',
        icon: <Megaphone className='w-5.5 h-5.5' />,
        title: "Digital Marketing",
        w: 32,
        text: "We grow your business using SEO, social media, paid ads, branding, and ASO to boost online presence."
      },
      {
        id: 'ai-solutions',
        icon: <BrainCircuit className='w-5.5 h-5.5' />,
        title: "AI & Machine Learning",
        w: 32,
        text: "We deliver AI & ML solutions to automate processes, build smart systems, and enable data-driven decision making."
      }, 
      {
        id: 'video-editing',
        color: '#FB923C1F',
        icon: <LineChart className='w-5.5 h-5.5' />,
        title: "Video Editing",
        text: "We create professional video edits for YouTube, reels, and social media with smooth transitions and engaging visuals."
      }, 
    ],
};

const [activeCategory, setActiveCategory] = useState(
        Object.keys(tools)[0] 
    );

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

    const items = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

       const container2 = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardZoom = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const navigate = useNavigate();

  const [showLink, setShowLink] = useState(true)

  const location = useLocation();
  useEffect(() => {
    if(location.pathname === '/services') {
      setShowLink(false)
    } else {
      setShowLink(true)
    }
  }, [location.pathname])

    const isMobile = typeof window !== "undefined" && window.innerWidth <440;

    const tools2 = ["figma", "photoshop", "illustrator"]

  return (
     <section className="py-12 sm:py-20">
    <div className="mx-auto w-[88%] sm:w-[88%]">
    <div className="mont">
      
    <p className='text-sm sm:text-lg text-[#24A7BB] relative z-10 font-semibold mb-4'>Services</p>
    <h2 className="mont text-xl font-semibold tracking-tight leading-8 sm:leading-13 text-[#333] sm:text-[48px]">Our Exclusive <br/> Premium Service </h2>
    <div className='block sm:flex items-end justify-between'>
    <p className="mt-1 text-sm sm:text-lg font-medium text-[#454648] w-full lg:w-[55%]">Transform ideas into reality with expert services and<br/> tailored solutions for your success and growth today.
    </p>
{/* hidden on services page */}
    {showLink && (
    <div onClick={() => navigate('/services')} className='hidden sm:flex items-center gap-3 cursor-pointer mt-4 sm:mt-0'>
      <p className='text-sm sm:text-base text-[#24A7BB] font-semibold hover:underline'>View Our All Services</p>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.13243 11.3409C0.389989 8.56076 1.10931 5.47146 3.29039 3.29039C6.54476 0.0360171 11.8211 0.0360171 15.0755 3.29039C18.3299 6.54476 18.3299 11.8211 15.0755 15.0755C12.8944 17.2566 9.80512 17.9759 7.02498 17.2335M11.6831 11.683V6.68303M11.6831 6.68303H6.68306M11.6831 6.68303L3.34957 15.0163" stroke="#24A7BB" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    )}
    </div>
    </div>

      {/* tools cards */}
        <motion.div 
            variants={container2}
            key={activeCategory}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-14 mt-10">
            {tools[activeCategory].map((course, index) => (
                <motion.div 
                  variants={cardZoom}
                  onClick={() => navigate(`/services/${course.id}`)}
                  // style={{width : ` ${isMobile ? 100 : course.w}%`}}
                    className="bg-[#fff] group hover:border-t-4 border hover:border-[#4AC3D5] border-[#0000001F] transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2 p-3 sm:p-5 rounded-2xl text-[#454648] group-hover:text-black" key={index}>
                      {/* hover:scale-110 transition-all duration-400 */}
                      <div>
                      <div className='flex items-center justify-center text-[#fff]   bg-[#4AC3D5] rounded-lg w-10 h-10 sm:w-10 sm:h-10'>
                        {course.icon}
                      </div>
                  <h3 className='font-semibold text-[#454648] text-base sm:text-lg sm:text-[22px] mont mt-4 sm:mt-3'>{course.title}</h3>
                <p className='font-medium text-[#454648E5] mont text-sm sm:text-[17px] mt-1 sm:mt-2'>{course.text}</p>
                </div>
                {course?.id === 1 ? 
                  <div className='flex items-center gap-2 mt-5'>
                  {tools2.map((t) => (
                      <div className='bg-[#4ac2d50a] mont py-1.5 px-2 sm:px-4 text-[10px] sm:text-xs font-bold text-[#4AC3D5] uppercase rounded-full'>{t}</div>
                  ))}
                  </div>
                  : 
                    <div className='flex items-center gap-2 mt-8'>
                      <div className='w-8 h-8 bg-[#64748b09] flex items-center justify-center rounded-md'>
                          <Database className='w-5 h-5 text-[#64748B]' />
                      </div>
                      <div className='w-8 h-8 bg-[#64748b09] flex items-center justify-center rounded-md'>
                          <Cloud className='w-5 h-5 text-[#64748B]' />
                      </div>
                      <div className='w-8 h-8 bg-[#64748b09] flex items-center justify-center rounded-md'>
                          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.61667 17.4 10.9667 16.4125 12.05 14.9375C13.1333 13.4625 13.7667 11.8167 13.95 10H8V2.125L2 4.375V9.1C2 9.28333 2 9.43333 2 9.55C2 9.66667 2.01667 9.81667 2.05 10H8V17.9Z" fill="#64748B"/>
                          </svg>
                      </div>
                      </div>
                  }
                </motion.div>
            ))}
        </motion.div>

        {showLink && (
    <div onClick={() => navigate('/services')} className='flex sm:hidden bg-[#4AC3D5] hover:bg-[#36b1c4] transition-colors duration-250 w-fit sm:w-fit mx-auto px-9 py-2.5 rounded-full items-center justify-center gap-3 cursor-pointer mt-7 sm:mt-0'>
      <p className='text-sm sm:text-base text-[#fff] font-semibold hover:underline'>View Our All Services</p>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.13243 11.3409C0.389989 8.56076 1.10931 5.47146 3.29039 3.29039C6.54476 0.0360171 11.8211 0.0360171 15.0755 3.29039C18.3299 6.54476 18.3299 11.8211 15.0755 15.0755C12.8944 17.2566 9.80512 17.9759 7.02498 17.2335M11.6831 11.683V6.68303M11.6831 6.68303H6.68306M11.6831 6.68303L3.34957 15.0163" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
    )}
    </div>
    </section>
  )
}

export default Experties