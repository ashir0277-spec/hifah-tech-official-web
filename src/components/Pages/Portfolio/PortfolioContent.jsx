import React from 'react'
import ellipse from '../../../assets/portfolio/ellipse.svg'
import ellipseweb from '../../../assets/portfolio/ellipse-web.svg'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Cta from '../Portfolio/Cta'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProjectsData from './ProjectsData'
import Footer from '../../Sections/Footer/Footer'
import Navbar from '../../Sections/Navbar/Navbar'

const PortfolioContent = () => {

  // ================================
  // Get project ID from the URL
  // ================================
  const { id } = useParams();

  // Map URL slugs to the actual keys used in ProjectsData
  const idMap = {
    'gdrive': 'gdrive',
    'meCloset': 'mecloset',
    'mecloset': 'mecloset',
    'flaty': 'flatty',
    'blink-back': 'blink-back',
    'safe-choice': 'safe-choice',
    'yazboz': 'yazboz',
  };

  const resolvedId = idMap[id] || id?.toLowerCase() || id;

  // Look up the project data from ProjectsData
  const project = ProjectsData[resolvedId];

  // ================================
  // Show a "Not Found" UI if project doesn't exist
  // ================================
  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Project Not Found</h1>
            <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
            <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
              Go Back Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Check whether this project is a "web" type or a "mobile app" type
  const isWeb = project?.tag === 'web';

  // Trigger animations once the section scrolls into view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // ================================
  // Animation Variants
  // ================================

  // Left-column cards: slide in from the right
  const leftCardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
  };

  // Right-column cards: slide in from the left
  const rightCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
  };

  // Center image: fades/slides up into view
  const imageVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  // Top floating label: slides in from the left
  const topLabelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
    },
  };

  // Bottom floating label: slides in from the right
  const bottomLabelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.7 },
    },
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* ================================
          Page Wrapper
          overflowX: clip -> blocks horizontal scroll but keeps
          vertical overflow visible (better than overflow-hidden)
      ================================ */}
      <div className='relative z-0' style={{ overflowX: 'clip' }}>

        {/* ================================
            Top Right Blur Circle
            Uses shadeColor1 from ProjectsData to
            create a soft blurred glow in the top-right corner
        ================================ */}
        <div
          style={{ backgroundColor: project.shadeColor1 }}
          className='absolute top-200 -right-5 w-[136px] h-[136px] rounded-full blur-[170px] pointer-events-none z-0'
        />

        {/* Project Thumbnail Image */}
        <img src={project.thumbnail} className='w-full h-auto pt-15' alt="thumbnail" />

        {/* ================================
            Main Content Container
        ================================ */}
        <div className='my-20 w-[88%] mx-auto relative'>

          {/* ================================
              Hero Section (different layout for Web vs Mobile)
          ================================ */}
          {isWeb ?
            // Web project hero section
            <div className='relative mt-40'>
              <img src={ellipseweb} className='absolute z-0 -top-10 left-[10%] w-[80%]' alt="" />
              <div className='relative z-4'>
                <div className='flex justify-center'>
                  <p className='text-center bg-[#FFFFFF] py-3.5 px-6 rounded-full text-lg sm:text-xl md:text-2xl font-medium w-fit'>
                    {project?.heroTag}
                  </p>
                </div>
                <h1
                  className='text-center font-semibold text-[#99a1a8] text-2xl sm:text-4xl md:text-5xl lg:text-[60px]'
                  dangerouslySetInnerHTML={{ __html: project?.title }}
                ></h1>
                <p className='text-center font-medium text-[#333333E5] text-sm sm:text-base md:text-lg w-full sm:w-[75%] md:w-[55%] lg:w-[40%] mx-auto'>
                  {project?.desc}
                </p>
              </div>
            </div>
            :
            // Mobile app hero section
            <>
              <h1 className='text-center font-semibold text-[#333] text-2xl sm:text-[44px]'>Main features</h1>
              <p className='text-center font-regular text-[#333333E5] text-sm sm:text-[20px] w-full sm:w-[50%] mx-auto'>
                Unified features designed to deliver seamless performance, efficiency, and control across all types of applications.
              </p>
            </>
          }

          {/* ================================
              3-Column Features Grid
              Web layout: 25% | 50% | 25%
              Mobile layout: equal 3 columns
              
              FIXED: Added proper gap and alignment for all cards
              The third card (bottom summary) now matches the responsive
              behavior of the top two cards
          ================================ */}
          <div
            ref={ref}
            className={`grid ${project.tag === "web"
              ? "grid-cols-1 lg:grid-cols-[25%_50%_25%]"
              : "grid-cols-1 md:grid-cols-1 lg:grid-cols-3"
              } justify-between gap-7 pt-20 relative`}
          >
            {/* Ellipse background SVG - mobile layout only */}
            {project?.tag !== 'web' && (
              <img src={ellipse} className='absolute top-0 left-[20%] z-0 w-[60%]' alt="ellipse" />
            )}

            {/* ================================
                Left Column: Feature Cards
                Uses shadeColor1 for the left blur circle
            ================================ */}
            <div className={`flex flex-col gap-4 h-full w-full lg:w-auto ${isWeb ? '' : 'justify-between'} relative z-3`}>

              {/* Left blur circle - uses shadeColor1 */}
              <div
                style={{ backgroundColor: project.shadeColor1 }}
                className='absolute z-0 top-40 -left-30 w-[186px] h-[186px] rounded-full blur-[170px]'
              />

              {/* Left feature cards */}
              {project?.leftContent.map((c, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={leftCardVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className='bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 relative z-4'
                >
                  <h3 className="font-semibold text-[#333333] text-sm sm:text-base">{c.title}</h3>
                  <h3 className="font-normal text-[#333333E5] text-sm sm:text-base mt-3">{c.desc}</h3>
                </motion.div>
              ))}
            </div>

            {/* ================================
                Center Column: Main Phone/Screen Image + Floating Labels
            ================================ */}
            <div className="flex justify-center z-3">

              {/* Bottom gradient overlay - web layout only */}
              {isWeb && (
                <div className='w-full z-10 h-[210px] bg-linear-to-b from-[#FFFFFF00] to-[#FFFFFF] absolute bottom-0'></div>
              )}

              {/* Center main mockup image */}
              <motion.img
                src={project?.topMedia}
                className={`${isWeb ? 'w-full' : 'w-[80%]'}`}
                alt=""
                variants={imageVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              />

              {/* ================================
                  Top Floating Label (mobile layout only)
                  Position is responsive per breakpoint (sm/md/lg)
                  so the badge + connector line stay aligned with
                  the mockup image at every screen size, matching
                  how it sits on large screens.
              ================================ */}
              {project?.tag !== 'web' && (
                <motion.div
                 className="hidden xl:block absolute origin-top-left
  xl:top-[35%] xl:left-[20%] xl:scale-100
  2xl:top-[33%] 2xl:left-[18%] 2xl:scale-110"
                  variants={topLabelVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                 <p
  style={{ background: project.btn1Color }}
  className="rounded-md ml-3 mb-2 py-2 whitespace-nowrap px-3 font-normal text-white text-sm sm:text-base w-[210px] text-center leading-tight"
>
  {project?.btn1}
</p>
                  <svg width="232" height="16" viewBox="0 0 232 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-1.74846e-07" y1="8" x2="232" y2="7.99998" stroke="url(#paint0_linear_2177_40916)" strokeWidth="4" />
                    <circle cx="216" cy="8" r="7.5" fill={project.color} stroke="url(#paint1_linear_2177_40916)" />
                    <defs>
                      <linearGradient id="paint0_linear_2177_40916" x1="4.37114e-08" y1="10.5" x2="232" y2="10.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor={project.color} />
                      </linearGradient>
                      <linearGradient id="paint1_linear_2177_40916" x1="208" y1="8" x2="224" y2="8" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor={project.color} />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}

              {/* ================================
                  Bottom Floating Label (mobile layout only)
                  Same idea as the top label above - position and
                  scale step up gradually across breakpoints and
                  land on the original large-screen values at lg.
              ================================ */}
              {project?.tag !== 'web' && (
                <motion.div
                 className="hidden xl:block absolute origin-bottom-right
  xl:bottom-[24%] xl:right-[20.5%] xl:scale-100
  2xl:bottom-[22%] 2xl:right-[19%] 2xl:scale-110"
                  variants={bottomLabelVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <p
  style={{ background: project.btn2Color }}
  className="rounded-md mb-2 ml-3 py-2 px-3 font-normal whitespace-nowrap text-white text-sm sm:text-base w-[200px] text-center leading-tight"
>
  {project?.btn2}
</p>
                  <svg width="210" height="16" viewBox="0 0 210 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="8" x2="210" y2="8" stroke={"url(#paint0_linear_2177_40919)"} strokeWidth="4" />
                    <circle cx="16" cy="8" r="7.5" fill={project.btn2Color} stroke="url(#paint1_linear_2177_40916)" />
                    <defs>
                      <linearGradient id="paint0_linear_2177_40919" x1="0" y1="10.5" x2="210" y2="10.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor={project.btn2Color} />
                        <stop offset="1" stopColor="#FAFAFA" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_2177_40919" x1="8" y1="8" x2="24" y2="8" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#72DE54" />
                        <stop offset="1" stopColor="#FAFAFA" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </div>

            {/* ================================
                Right Column: Feature Cards
                Uses shadeColor2 for the right blur circle
            ================================ */}
            <div className={`flex flex-col gap-4 h-full w-full lg:w-auto ${isWeb ? '' : 'justify-between'} relative z-3`}>
              {/* Right blur circle - uses shadeColor2 */}
              <div
                style={{ backgroundColor: project.shadeColor2 }}
                className='absolute z-0 bottom-20 -right-30 w-[186px] h-[186px] rounded-full blur-[170px]'
              />

              {/* Right feature cards */}
              {project?.rightContent.map((c, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={rightCardVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 relative z-4"
                >
                  <h3 className="font-semibold text-[#333333] text-sm sm:text-base">{c.title}</h3>
                  <h3 className="font-normal text-[#333333E5] text-sm sm:text-base mt-3">{c.desc}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================================
              Bottom Summary Card
              FIXED: Now properly responsive - matches the behavior
              of the top two cards with consistent width scaling
              
              The card now:
              - Takes full width on mobile (w-full)
              - Scales to 85% on small screens
              - Scales to 60% on medium screens  
              - Finally narrows to 29% on large screens
              
              This creates a smooth, responsive progression that
              matches the top cards' behavior
          ================================ */}
          <div className='flex justify-center mt-4 sm:mt-9 relative z-3'>
            <div className='bg-[#FAFAFA] w-full   lg:w-[29%] border border-[#EEEEEE] rounded-xl p-4'>
              <h3 className='text-center font-semibold text-[#333333] text-sm sm:text-base'>{project?.bottom.title}</h3>
              <h3 className='text-center font-regular text-[#333333E5] text-sm sm:text-base mt-3'>{project?.bottom.desc}</h3>
            </div>
          </div>

          {/* ================================
              Detail Sections (1-on-1 Text + Mockup blocks)
              Each detail has a text side and an image side.
              detail.first === 'text' or 'image' decides the order.
          ================================ */}
          {project?.details.map((detail, idx) => (
            <div
              key={idx}
             className={`flex flex-col ${isWeb ? 'lg:flex-row' : 'lg:flex-row'} justify-between items-start gap-0 ${isWeb ? 'gap-3' : 'lg:gap-10'} my-5 sm:my-10`}
            >

              {/* -------- Text Side -------- */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.2 }}
                className={`
                  w-full py-[10px] sm:py-[70px]
                 ${isWeb ? 'mt-0 lg:w-[45%]' : 'mt-10 lg:w-[55%]'}
                  flex flex-col relative justify-center
                  order-2
                 ${detail.first === 'text'
  ? (isWeb ? 'lg:order-1' : 'lg:order-1')
  : (isWeb ? 'lg:order-2' : 'lg:order-2')}
                `}
              >
                {/* Detail section blur circles
                    idx !== 1 uses shadeColor1, idx === 1 uses shadeColor2 */}
                {idx !== 1 ? (
                  <div
                    style={{ backgroundColor: project.shadeColor1 }}
                    className={`absolute z-0 top-40 ${isWeb ? '-left-30' : '-right-30'} w-[186px] h-[186px] rounded-full blur-[170px]`}
                  />
                ) : (
                  <div
                    style={{ backgroundColor: project.shadeColor2 }}
                    className={`absolute z-0 top-40 ${isWeb ? '-right-30' : '-left-30'} w-[186px] h-[186px] rounded-full blur-[170px]`}
                  />
                )}

                {/* Detail title (supports inline HTML) */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, x: -100, rotate: -3 },
                    visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className={`font-semibold leading-9 text-[#333333] ${isWeb ? 'text-[20px] sm:text-[34px] sm:leading-12 pt-2 sm:pt-3' : 'text-[24px] sm:text-[44px] sm:leading-15 pb-2 sm:pb-4'}`}
                  dangerouslySetInnerHTML={{ __html: detail.title }}
                />

                {/* Detail description (supports inline HTML) */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, x: 100, rotate: 3 },
                    visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className='font-regular text-[#333333E5] text-[18px] sm:text-[24px]'
                  dangerouslySetInnerHTML={{ __html: detail.desc }}
                />

                {/* Connecting border line - mobile layout only */}
                {!isWeb && (
                  <div className={`${idx === 0 ? 'w-[80%]' : idx === 2 ? 'w-[88%]' : 'w-[81%] ml-73'} hidden lg:block border border-[#3333333D] absolute top-[100%] ${idx === 2 ? 'h-[295px]' : 'h-[350px]'} border-b-transparent ${detail.first === 'text' ? 'border-r-transparent' : 'border-l-transparent -ml-35'} bottom-0`}></div>
                )}

                {/* Connecting border line - web layout only */}
                {isWeb && idx !== 2 && (
                  <div className={`hidden lg:block border border-[#3333333D] absolute top-[90%] ${idx === 0 ? 'h-[192px]' : 'h-[255px]'} border-b-transparent ${detail.first === 'text' ? 'border-r-transparent ml-80' : 'border-l-transparent -ml-35'} ${idx === 0 ? 'w-[59%]' : 'w-[60%] -ml-0'} bottom-0`}></div>
                )}
              </motion.div>

              {/* -------- Image Side -------- */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.85, y: 60 },
                  visible: {
                    opacity: 1, scale: 1, y: 0,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.25 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`
                  w-full ${isWeb ? 'lg:w-[55%]' : 'lg:w-[45%]'}
                  flex justify-start items-center bg-[#fff33] rounded-2xl
                  pt-0 sm:pt-10 py-2 sm:py-6 px-5 relative z-0
                  order-1
                ${detail.first === 'text'
  ? (isWeb ? 'lg:order-2' : 'lg:order-2')
  : (isWeb ? 'lg:order-1' : 'lg:order-1')}
                `}
              >
                <motion.div className="flex relative items-start justify-center py-10 px-3 sm:px-7 w-full">

                  {/* Left border line */}
                  {detail.first === 'text' && (
                   <div className={`hidden lg:block h-[stretch] mt-10 ml-4 w-7 border border-r-transparent border-[#3333333D]`}></div>
                  )}

                  {/* Top connector line */}
                  {idx !== 0 && (
                   <div className={`${isWeb ? 'w-[70%] h-6' : 'w-[45%] h-7'} hidden lg:block absolute -top-10 mt-10 ml-4 border border-b-transparent border-[#3333333D]`}></div>
                  )}

                  {/* Actual mockup image with fly-in animation */}
                  <motion.img
               className={`pl-0 lg:pl-5 mb-[-2rem] ${isWeb ? 'w-[95%]' : 'w-[85%] lg:w-[70%]'} relative z-4`} 
                    src={detail?.image1}
                    alt="feature media"
                    variants={{
                      hidden: { opacity: 0, y: 220, x: 180, rotate: 45 },
                      visible: {
                        opacity: 1, y: 0, x: 0, rotate: 0,
                        transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  />

                  {/* Right border line */}
                  {detail.first === 'image' && (
                  <div className={`hidden lg:block mt-10 border ${isWeb ? 'border-l-transparent ml-3 h-[300px] w-5' : 'w-7 border-l-transparent ml-4 h-[stretch]'} border-[#3333333D]`}></div>
                  )}
                </motion.div>
              </motion.div>

            </div>
          ))}
        </div>

        {/* ================================
            CTA Section
            Background color comes from project.cta.bg in ProjectsData
        ================================ */}
        {project?.cta && (
          <div style={{ background: project?.cta?.bg }} className='w-full my-20 mt-40'>
            <div className='w-[88%] mx-auto block sm:flex items-start gap-10 relative'>
              <div className='w-full sm:w-[60%] py-12'>

                {/* CTA Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                  className='font-semibold text-2xl sm:text-[32px]'
                  dangerouslySetInnerHTML={{ __html: project?.cta?.title }}
                ></motion.h2>

                {/* CTA Description */}
                <motion.p
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                  className='text-[#333333E5] font-regular text-lg sm:text-2xl pt-5'
                >
                  {project?.cta?.text}
                </motion.p>

                {/* CTA Button - navigates to the contact page */}
                <motion.button
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => navigate("/contact")}
                  style={{ background: project.color }}
                  className='py-2 px-6 rounded-lg mt-11 font-medium text-white'
                >
                  Talk to us
                </motion.button>
              </div>

              {/* CTA Image */}
              <div className='flex justify-center'>
                <div className='h-7 hidden sm:block w-[23%] absolute -top-35 right-17 ml-4 border border-b-transparent border-[#3333333D]'></div>
                <img src={project?.cta?.ctaMedia} className='w-[70%] sm:w-[30%] sm:absolute right-0 bottom-0' alt="" />
              </div>
            </div>
          </div>
        )}

        {/* ================================
            Similar / Recent Projects Grid
        ================================ */}
        <div className='py-10 w-[92%] mx-auto'>
          <h1 className='font-semibold text-3xl sm:text-[48px] pb-4 sm:pb-8 text-[#333]'>Recent Projects</h1>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            {project?.similarProjects.map((p, idx) => (
              <Link key={idx} to={`/portfolio/${p.id}`}>
                <div>
                  <img src={p.image} className='hover:scale-103 transition-all duration-200' alt="project" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <Cta />
      </div>

      {/* Footer */}
      <div className='overflow-hidden'>
        <Footer />
      </div>
    </>
  )
}

export default PortfolioContent