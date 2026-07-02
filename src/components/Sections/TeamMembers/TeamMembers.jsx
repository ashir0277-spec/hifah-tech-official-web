import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, UserPlus } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const TeamMembers = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0,           // ✅ fire as soon as even 1px enters viewport
        rootMargin: '0px 0px -50px 0px', // ✅ trigger slightly before it fully enters
    });

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const items = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const navigate = useNavigate();

    const [team, setTeam] = useState([]);
    const [ceo, setCeo] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://hifah-technology-official-backend-production.up.railway.app/api/get-all-member");
                const data = await res.json();

                if (data.members && data.members.length > 0) {
                    const reversedMembers = data.members.slice().reverse();
                    setCeo(reversedMembers[0]);
                    setTeam(reversedMembers.slice(1));
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 440;

    return (
        <section className='bg-[#091114] mont overflow-hidden'>
            <div className='w-[88%] sm:w-[88%] mx-auto py-16 pt-14 sm:pt-24'>
                <h2 className="mont text-2xl font-semibold tracking-tight text-[#FFFFFFE5] sm:text-[40px]">
                    Executive Leadership <br />
                    <span className='text-[#A5D283]'>Team Members</span> with role
                </h2>

                <div className='flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center'>
                    <p className="mt-1 sm:mt-4 text-sm sm:text-lg mont font-regular text-[#ffffff95] w-full sm:w-[60%]">
                        Meet our executive leadership and team members, each playing {isMobile ? <></> : <br />}
                        a key role in driving strategy, innovation, and delivering impactful results.
                    </p>
                    <button
                        onClick={() => navigate('/our-team')}
                        className='text-[#A5D283] hidden sm:flex text-sm sm:text-base font-medium items-center gap-2'
                    >
                        See all Members <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5' />
                    </button>
                </div>

                {/* Main Layout: Stack on mobile & tablet, side-by-side on desktop */}
                <div className='flex flex-col lg:flex-row items-center justify-between mt-6 lg:mt-14 gap-8 lg:gap-0'>

                    {/* CEO Card - Full width on mobile & tablet */}
                    {ceo && (
                        <motion.div
                            initial={isMobile ? false : { opacity: 0, x: -60 }}
                            animate={isMobile ? {} : (inView ? { opacity: 1, x: 0 } : {})}
                            transition={isMobile ? { duration: 0 } : { duration: 1.1 }}
                            className='bg-[#A5D28314] text-center w-full lg:w-[35%] rounded-2xl border border-dashed p-6 border-[#A5D28333]'
                        >
                            <div className='flex justify-center'>
                                <div className='w-[180px] h-[180px] sm:w-[221px] sm:h-[221px] rounded-full overflow-hidden flex-shrink-0'>
                                    <img
                                        className='w-full h-full object-cover object-center'
                                        src={ceo.imageUrl}
                                        alt={`${ceo.name} ${ceo.lname}`}
                                    />
                                </div>
                            </div>
                            <p className='font-semibold text-sm sm:text-base text-white mt-4 sm:mt-9'>
                                {ceo.name} {ceo.lname}
                            </p>
                            <p className='font-medium text-xs sm:text-base text-[#FFFFFFB2] mt-3'>
                                {ceo.role}
                            </p>
                            <div className='flex justify-center'>
                                <button
                                    onClick={() => navigate('/hire-developers')}
                                    className='text-[#A5D283] my-0 sm:my-14 mt-6 bg-[#A5D2831F] border border-[#A5D283] rounded-full py-2 px-5 text-sm sm:text-base font-medium flex items-center gap-4'
                                >
                                    <UserPlus className='w-4 h-4 sm:w-5 sm:h-5' /> Hire any team member
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Team Members Grid */}
                    <div className='w-full'>
                        <div className='overflow-x-auto sm:overflow-visible' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <style>{`.team-scroll::-webkit-scrollbar{display:none}`}</style>
                            <motion.div
                                ref={ref}
                                variants={container}
                                initial={isMobile ? false : "hidden"}
                                animate={isMobile ? "visible" : inView ? "visible" : "hidden"}
                                className='team-scroll flex gap-4 sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 mt-7 lg:mt-0'
                            >
                                {team.map((t, idx) => (
                                    <motion.div
                                        variants={items}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        key={idx}
                                        className='text-center w-full min-w-[160px] sm:min-w-0'
                                    >
                                        <div className='flex justify-center'>
                                            <div className='w-[120px] h-[120px] sm:w-[131px] sm:h-[131px] lg:w-[151px] lg:h-[151px] rounded-full overflow-hidden flex-shrink-0'>
                                                <img
                                                    className='w-full h-full object-cover object-center'
                                                    src={t.imageUrl}
                                                    alt={t.name}
                                                />
                                            </div>
                                        </div>
                                        <p className='font-semibold text-sm sm:text-base text-white mt-3'>
                                            {t.name} {t.lname}
                                        </p>
                                        <p className='font-regular text-xs sm:text-sm text-[#FFFFFFB2]'>
                                            {t.role}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/our-team')}
                    className='text-[#A5D283] flex sm:hidden mx-auto mt-7 text-sm sm:text-base font-medium items-center gap-2'
                >
                    See all Members <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5' />
                </button>
            </div>
        </section>
    )
}

export default TeamMembers