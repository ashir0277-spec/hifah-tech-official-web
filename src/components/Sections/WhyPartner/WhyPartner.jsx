import React from 'react'
import layers from '../../../assets/icons/layer.svg'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyPartner = () => {
    const points = [
        {
            icon: layers,
            title: "Expert Developers",
            desc: "A team of seasoned veterans in modern tech stacks."
        },
        {
            icon: layers,
            title: "Fast Delivery",
            desc: "Agile methodologies for rapid and reliable releases."
        },
        {
            icon: layers,
            title: "Secure Solutions",
            desc: "Enterprise-grade security standards integrated."
        },
        {
            icon: layers,
            title: "Affordable",
            desc: "Premium solutions at competitive market pricing."
        },
    ];

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,    
    });

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const items = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className='bg-[#091114] py-12 sm:py-20 mont'>
            <div className='w-[88%] mx-auto'>
                
                {/* Mobile + Tablet + LG: Stacked Layout */}
                <div className='block lg:flex items-start gap-10'>
                    
                    {/* Left Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className='w-full lg:w-[40%] flex flex-col justify-between'
                    >
                        <p className='text-sm sm:text-lg text-[#A5D283] font-semibold mb-4'>Why Partner With Us</p>
                        <h2 className="mont text-2xl font-semibold leading-8 tracking-tight sm:leading-14 text-[#fff] sm:text-4xl">
                            We Build Solutions That<br/> Scale <span className='text-[#A5D283]'>With Your Ambition</span>
                        </h2>
                        <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-[#FFFFFFCC] mont w-full lg:w-[84%]">
                            We combine expertise with efficiency, focusing not just on code but on solving real business problems with technical excellence.
                        </p>
                    </motion.div>

                    {/* Cards Grid */}
                    <motion.div
                        ref={ref}
                        variants={container}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className='w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mt-8 lg:mt-0'
                    >
                        {points.map((p, id) => (
                            <motion.div
                                variants={items}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                key={id} 
                                className='p-5 rounded-2xl bg-[#FFFFFF1A] backdrop-blur-[74px] relative'
                            >
                                <img className='w-6 h-6 sm:w-9 sm:h-9' src={p.icon} alt="layers" />
                                
                                <h2 className='text-white font-semibold text-base sm:text-xl mont mt-3 sm:mt-6'>
                                    {p.title}
                                </h2>
                                <p className='text-[#ffffffb2] font-medium text-sm sm:text-base mt-2'>
                                    {p.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default WhyPartner