import React, { useState } from 'react'
import wireframe from '../../../assets/mockups/m (1).jpeg'
import app from '../../../assets/mockups/m (2).jpeg'
import grid from '../../../assets/media/grid.svg'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

const HeroPortfolio = () => {
    const projects = [
        {
            id: '68e4a409ddd034f02c91b25c',
            image: wireframe,
            title: 'Blink Back',
            description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        },
        {
            id: '68ce9a68ddd034f02c9182d9',
            image: app,
            title: 'Zipzap Talk',
            description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        },
    ]

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,    
    });

    const container = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.3 },
        },
    };

    const items = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const [hovered, setHovered] = useState(false)
    const [hoverId, setHoverId] = useState('')

    return (
        <>
            <img src={grid} className='absolute top-0 w-full' alt="grid" />
            
            <div className='py-9 sm:py-16 w-[88%] sm:w-[88%] mx-auto relative'>
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    viewport={{ once: true }}
                    className='relative z-10'
                >
                    <p className='text-base sm:text-lg text-[#333] font-semibold'>Our Achievements</p>
                    <h2 className="mont text-2xl font-semibold tracking-tight text-[#454648] sm:text-[40px]">
                        Creative Portfolio Turning Ideas Into Reality
                    </h2>
                    <p className="mt-2 sm:mt-2 text-[15px] sm:text-lg mont font-medium text-[#454648] w-full sm:w-[50%]">
                        Have an idea you’re ready to bring to life? Let’s connect and discuss how we can turn it into a successful digital product.
                    </p>
                </motion.div>

                <motion.div 
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-7 mx-auto"
                >

                    {/* {projects.map((item, index) => (
                        <Link to={`/portfolio/${item.id}`} key={index}>
                            <motion.div
                                variants={items}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                onMouseEnter={() => {setHovered(true); setHoverId(item.id)}}
                                onMouseLeave={() => {setHovered(false); setHoverId('')}}
                                className="relative overflow-hidden transition-color duration-100 cursor-pointer rounded-lg"
                            >
                                <div className=" w-full h-[250px] sm:h-[370px] flex items-center justify-center overflow-hidden rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={`max-w-full max-h-full object-contain transition-transform duration-500 ${hovered && hoverId === item.id ? 'scale-105' : 'group-hover:scale-105'}`}
                                    />
                                </div>

                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 ${hovered && hoverId === item.id ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>

                                <div className={`absolute bottom-2 left-4 text-white opacity-0 ${hovered && hoverId === item.id ? 'opacity-100' : 'group-hover:opacity-100'} transition-all duration-300 ${hovered && hoverId === item.id ? 'translate-y-0' : 'translate-y-5'}`}>
                                    <h3 className="text-2xl font-semibold mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm mb-2">
                                        {item.description}
                                    </p>
                                    <a href={item.id} className="absolute inset-0">
                                        <span className="sr-only">View {item.title}</span>
                                    </a>
                                </div>
                            </motion.div>
                        </Link>
                    ))} */}
                </motion.div>
            </div>
        </>
    )
}

export default HeroPortfolio