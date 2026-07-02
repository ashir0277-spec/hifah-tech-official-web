import React from "react";
import { motion } from "framer-motion";
import herobg from '../../../assets/images/hero-staff.png'
import { useNavigate } from "react-router-dom";

const HeroStaff = () => {
  const navigate = useNavigate();

  const Icon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20ZM6.5 9.25L11.69 9.25L9.97 7.53C9.68 7.24 9.68 6.76 9.97 6.47C10.12 6.32 10.31 6.25 10.5 6.25C10.69 6.25 10.88 6.32 11.03 6.47L14.03 9.47C14.32 9.76 14.32 10.24 14.03 10.53L11.03 13.53C10.74 13.82 10.26 13.82 9.97 13.53C9.68 13.24 9.68 12.76 9.97 12.47L11.69 10.75L6.5 10.75C6.09 10.75 5.75 10.41 5.75 10C5.75 9.59 6.09 9.25 6.5 9.25Z" fill={color} />
    </svg>
  );

  return (
    <section className='bg-[#121212] w-full relative overflow-hidden'>
      <div
        className='min-h-[65vh] sm:min-h-[97vh] flex items-center bg-no-repeat lato'
        style={{ backgroundImage: `url(${herobg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
      >
        {/* Dark overlay so text is always readable */}
        <div className='absolute inset-0 bg-black/40' />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='relative z-10 w-full text-center px-6 sm:px-14 py-16 sm:py-24 flex flex-col items-center gap-5'
        >
          {/* Badge */}
          <p className='text-sm sm:text-xl text-[#4AC3D5] font-semibold'>
            Hifah Technologies Expert
          </p>

          {/* Heading */}
          <h1 className="text-white text-[26px] sm:text-3xl lg:text-[54px] font-semibold leading-tight">
            Grow Your Business with<br /> Global Talent
          </h1>

          {/* Paragraph — no fixed height, wraps naturally */}
          <p className='font-medium text-white/90 text-sm sm:text-base lg:text-xl max-w-[90%] sm:max-w-[65%] lg:max-w-[55%] leading-relaxed'>
            Hifah Technologies has a team of skilled talent across accounting, marketing, IT, and e-commerce. You have a primary contact, plus access to the full team, to be able to draw the skill you need at any time.
          </p>

          {/* Buttons — always in a row, wrap if needed */}
          <div className='flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 w-full'>
            <button
              onClick={() => navigate('/about')}
              className="px-6 py-2.5 rounded-full font-semibold bg-transparent text-[#4AC3D5] border border-[#4AC3D5] transition-colors duration-300 whitespace-nowrap"
            >
              <span className="text-sm sm:text-base flex items-center justify-center gap-3">
                About us
                <Icon color="#4AC3D5" />
              </span>
            </button>

            <button
              onClick={() => navigate('/hire-developers')}
              className="px-6 py-2.5 rounded-full text-white font-semibold bg-[#4AC3D5] transition-colors duration-300 whitespace-nowrap"
            >
              <span className="text-sm sm:text-base flex items-center justify-center gap-3">
                Get a Team
                <Icon color="#fff" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroStaff;