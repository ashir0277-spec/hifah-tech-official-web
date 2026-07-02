import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const Icon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 -3.91654e-07 10 -8.74228e-07C4.48 -1.3568e-06 1.3568e-06 4.48 8.74228e-07 10C3.91654e-07 15.52 4.48 20 10 20ZM6.5 9.25L11.69 9.25L9.97 7.53C9.68 7.24 9.68 6.76 9.97 6.47C10.12 6.32 10.31 6.25 10.5 6.25C10.69 6.25 10.88 6.32 11.03 6.47L14.03 9.47C14.32 9.76 14.32 10.24 14.03 10.53L11.03 13.53C10.74 13.82 10.26 13.82 9.97 13.53C9.68 13.24 9.68 12.76 9.97 12.47L11.69 10.75L6.5 10.75C6.09 10.75 5.75 10.41 5.75 10C5.75 9.59 6.09 9.25 6.5 9.25Z" fill="#4AC3D5"/>
    </svg>
  );

  return (
    <>
      <section className="bg-[#121212] w-full relative overflow-hidden min-h-[580px] sm:min-h-screen flex flex-col">

        {/* Top glow blobs */}
        <div className="bg-[#32E2FAB2] w-[40px] sm:w-[100px] blur-[130px] -rotate-30 h-[60px] sm:h-[360px] rounded-full absolute -top-20 z-[2] left-0 pointer-events-none" />
        <div className="bg-[#32E2FAB2] w-[40px] sm:w-[100px] blur-[130px] rotate-30 h-[60px] sm:h-[360px] rounded-full absolute -top-20 z-[2] right-0 pointer-events-none" />

        {/* Bottom decorative line */}
        <svg
          width="945"
          className="absolute -bottom-2 -left-70 sm:left-[20%] pointer-events-none"
          height="24"
          viewBox="0 0 945 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#paint0_diamond_1949_37136_clip_path)" data-figma-skip-parse="true">
            <g transform="matrix(0.4725 0 0 0.012 472.5 12)">
              <rect x="0" y="0" width="1002.12" height="1083.33" fill="url(#paint0_diamond_1949_37136)" opacity="1" shapeRendering="crispEdges"/>
              <rect x="0" y="0" width="1002.12" height="1083.33" transform="scale(1 -1)" fill="url(#paint0_diamond_1949_37136)" opacity="1" shapeRendering="crispEdges"/>
              <rect x="0" y="0" width="1002.12" height="1083.33" transform="scale(-1 1)" fill="url(#paint0_diamond_1949_37136)" opacity="1" shapeRendering="crispEdges"/>
              <rect x="0" y="0" width="1002.12" height="1083.33" transform="scale(-1)" fill="url(#paint0_diamond_1949_37136)" opacity="1" shapeRendering="crispEdges"/>
            </g>
          </g>
          <defs>
            <clipPath id="paint0_diamond_1949_37136_clip_path"><rect width="945" height="24"/></clipPath>
            <linearGradient id="paint0_diamond_1949_37136" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#28B5C8"/>
              <stop offset="1" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom glow blob */}
        <div className="absolute -bottom-20 blur-[74px] left-[30%] sm:left-[45%] rounded-full w-[272px] h-[100px] sm:h-[172px] bg-gradient-to-r z-[1] from-[#28B5C8] to-[#000000] pointer-events-none" />

        {/* Main content — flex-grow so it fills available space, centers vertically */}
        <div className="flex-1 flex items-center justify-center z-10 lato px-4 sm:px-14 py-24 sm:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center w-full max-w-5xl mx-auto"
          >
            {/* Subtitle */}
            <motion.p className="text-sm sm:text-xl text-white font-semibold mb-3">
              Welcome To Hifah Technologies
            </motion.p>

            {/* Main heading */}
            <motion.h1 className="text-white w-full text-[26px] sm:text-3xl md:text-3xl lg:text-[64px] font-semibold whitespace-pre-line leading-tight">
              Helping You {" "}
              <span className="text-[#4AC3D5]">Build &amp; Grow</span>{" "}
              with <br className="hidden sm:block" /> Expert Digital &amp; Tech Solutions
            </motion.h1>

            {/* Description */}
            <motion.p className="font-[370] sm:font-[350] mt-5 sm:mt-6 text-[#ffffff] text-sm sm:text-base sm:text-xl  w-full mx-auto leading-relaxed">
              We offer web &amp; app development, digital marketing, UI/UX design, and cloud &amp; deployment solutions to help you build, launch, and grow your business with confidence.
            </motion.p>

            {/* Buttons */}
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10 mt-8 sm:mt-10 w-full">
              <button
                onClick={() => navigate('/services')}
                className="relative px-6 py-3 w-full sm:w-auto rounded-full font-semibold bg-transparent text-[#4AC3D5] border border-[#4AC3D5] transition-colors duration-300"
              >
                <span className="relative z-10 text-sm sm:text-base flex items-center justify-center gap-3">
                  Our Services
                  <Icon />
                </span>
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="relative px-6 py-3 w-full sm:w-auto rounded-full text-[#4AC3D5] font-semibold bg-[#4AC3D533] transition-colors duration-300"
              >
                <span className="relative z-10 text-sm sm:text-base flex items-center justify-center gap-3">
                  Discuss {isMobile ? '' : 'Your'} Project
                  <Icon />
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>

      </section>
    </>
  );
};

export default Hero;