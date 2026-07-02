import React from 'react'
import calendar from '../../../assets/icons/calendarWhite.svg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Cta = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 440;
    const navigate = useNavigate();

    // ✅ Always scrolls to top whether on same page or navigating to new one
    const handleNavigate = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <section className="bg-white py-15 sm:pt-25 pb-35   sm:mb-0   overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true }}
                className='text-center px-4 relative z-10'
            >
                <h2 className="mont text-2xl font-semibold tracking-tight text-[#333] sm:text-[54px]">
                    Lets Build Something {isMobile ? <></> : <br />}
                    <span className='text-[#31BBD0]'>Amazing Together</span>
                </h2>
                <p className="mt-4 text-base sm:text-xl text-[#333333] font-medium w-full sm:w-[39%] mx-auto">
                    Ready to transform your idea into a product? Let's talk about your project and explore how we can help.
                </p>
                <div className='flex justify-center gap-4 w-full mt-5 sm:mt-12'>
                    <button
                        type="button"
                        onClick={() => handleNavigate('/contact')}
                        className='text-[#31BBD0] w-fit mt-4 text-sm sm:text-base sm:mt-0 font-semibold border-[1px] border-[#31BBD0] rounded-full py-2 px-4 flex items-center gap-3 cursor-pointer relative z-10'
                    >
                        <img className='hidden sm:block' src={calendar} alt="icon" />
                        Book Consultation
                    </button>
                    <button
                        type="button"
                        onClick={() => handleNavigate('/contact')}
                        className='text-[#fff] w-fit text-sm sm:text-base mt-4 sm:mt-0 font-semibold bg-[#31BBD0] backdrop-blur-[12px] rounded-full py-3 px-4 flex items-center gap-3 cursor-pointer relative z-10'
                    >
                        Start Project
                        <svg className='hidden sm:block' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM8.5 11.25L13.69 11.25L11.97 9.53C11.68 9.24 11.68 8.76 11.97 8.47C12.12 8.32 12.31 8.25 12.5 8.25C12.69 8.25 12.88 8.32 13.03 8.47L16.03 11.47C16.32 11.76 16.32 12.24 16.03 12.53L13.03 15.53C12.74 15.82 12.26 15.82 11.97 15.53C11.68 15.24 11.68 14.76 11.97 14.47L13.69 12.75L8.5 12.75C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </section>
    )
}

export default Cta