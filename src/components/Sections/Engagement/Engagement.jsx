import React, { useState } from 'react'
import dedicatedTeam from '../../../assets/images/dedicated-team.png'
import engr from '../../../assets/images/engr.png'
import agile from '../../../assets/images/agile.png'
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Engagement = () => {
    const models = {
        "Dedicated Team": [
            {
                dir: 'left',
                img: engr,
                key: 'engr',
                tag: 'Scalable Growth',
                title: 'Accelerated Engineering Capacity',
                desc: 'Hire a dedicated team of experts that works as an extension of your company to build and scale your product efficiently. We integrate directly with your workflows (Slack, Jira, GitHub), remove hiring delays, reduce overhead, and focus on fast, consistent delivery aligned with your goals and roadmap.',
                bullets: ["Budget Certainty", "Defined Milestones", "Agreed Deliverables", "Risk Mitigation"]
            },
        ],
        "Flexed Price Project": [
            {
                dir: 'left',
                img: dedicatedTeam,
                tag: 'Defined Scope, Guaranteed Results',
                title: 'Project-Based Excellence',
                desc: 'Hire a dedicated team on a fixed-price model for your project with complete budget clarity and well-defined deliverables. We ensure quality execution within agreed timelines and requirements, delivering reliable results with minimal risk and maximum value.',
                bullets: ["Budget Certainty", "Defined Milestones", "Agreed Deliverables", "Risk Mitigation"]
            },
        ],
        "Time & Material": [
            {
                dir: 'left',
                img: agile,
                tag: 'Flexiblity For Evolving Needs',
                title: 'Agile Resource Allocation',
                desc: 'Our Time & Material model is designed for dynamic projects that require flexibility and rapid pivots. Benefit from iterative development cycles, complete transparency in billing, and the ability to scale resources up or down as your product roadmap evolves.',
                bullets: ["Maximum Flexibility", "Transparent Billing", "Adaptive Scaling", "Iterative Development"]
            }
        ]
    };

    const [activeCategory, setActiveCategory] = useState(Object.keys(models)[0]);
    const navigate = useNavigate();

    return (
        <div className='w-[88%] mx-auto py-14 sm:py-26 mont'>
            <div className="text-left">
                <p className='text-sm sm:text-lg text-[#4AC3D5] roboto font-medium mb-1 sm:mb-3'>Scalable Growth</p>
                <h2 className="mont text-2xl font-semibold tracking-tight text-[#454648] sm:text-4xl">
                    Flexible Engagement Models
                </h2>

                {/* Tabs */}
                <div className='flex justify-start mt-4 sm:mt-4 roboto'>
                    <div className='overflow-auto' style={{ scrollbarWidth: 'none' }}>
                        <div className="text-white py-4 w-full overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
                            <div className="flex gap-3 sm:gap-4 min-w-max">
                                {Object.keys(models).map((category) => (
                                    <button
                                        key={category}
                                        className={`mont rounded-full py-3 px-5 text-xs sm:text-base sm:px-7 font-semibold cursor-pointer transition-all ${
                                            activeCategory === category
                                                ? "text-[#fff] bg-[#31BBD0]"
                                                : "text-[#333333B2] bg-[#F7F7F7]"
                                        }`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Border Line */}
            <svg className='mt-7 hidden md:block' width="1320" height="2" viewBox="0 0 1300 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="1" x2="1350" y2="1" stroke="#E0E0E0" strokeWidth="2" strokeDasharray="8 8" />
            </svg>

            <motion.div className='w-full'>
                {models[activeCategory].map((course) => (
                    <motion.div
                        key={activeCategory}
                        className='flex flex-col md:flex-row h-full gap-6 items-start mt-7'
                    >
                        {course.dir === 'left' ? (
                            <>
                                {/* Image Section - Mobile + MD stays stacked */}
                                <motion.div
                                    initial={{ opacity: 0, x: -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className='w-full md:w-[70%] block md:flex gap-5'
                                >
                                    <img
                                        className='w-full h-auto md:h-[320px] object-cover'
                                        src={course.img}
                                        alt="media"
                                    />
                                    <svg width="22" className='hidden md:block' height="308" viewBox="0 0 2 408" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="1" y1="-4.37114e-08" x2="1.00002" y2="408" stroke="#E0E0E0" strokeWidth="2" strokeDasharray="8 8" />
                                    </svg>
                                </motion.div>

                                {/* Content Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: 60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className='w-full flex flex-col justify-between text-left'
                                >
                                    <div className='h-full'>
                                        <h2 className="text-xl font-semibold tracking-tight text-[#454648] mt-2 md:text-4xl">
                                            {course.title}
                                        </h2>
                                        <p className="mt-1 sm:mt-4 text-sm sm:text-base text-[#454648] font-medium w-full md:w-[80%] mb-3 sm:mb-6">
                                            {course.desc}
                                        </p>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => navigate('/contact')}
                                            className="relative mt-4 w-fit md:w-auto mb-4 md:mt-0 px-4 py-2.5 rounded-full font-semibold bg-[#4AC3D5] transition-colors duration-300"
                                        >
                                            <span className="relative z-10 text-white text-sm sm:text-base flex items-center justify-center gap-3">
                                                Hire Now
                                                <ArrowRight className='w-6 h-6 text-[#4AC3D5] bg-white rounded-full p-1' />
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        ) : (
                            // Right image version (if needed in future)
                            <></>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default Engagement