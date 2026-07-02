import React, { useEffect, useState } from 'react'
import ellipse from '../../../assets/portfolio/ellipse.svg'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link, useNavigate, useParams } from 'react-router-dom'

    const BaseUrl = 'http://localhost:8000/api';


const PortfolioContentDynamic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${BaseUrl}/get-single-portfolio/${id}`);
        const data = await res.json();
        setPortfolio(data.portfolio);
        setRelatedProjects(data.relatedProjects || []);
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [id]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const leftCardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  const topLabelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
    },
  };

  const bottomLabelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.7 },
    },
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!portfolio) return <div className="flex justify-center items-center min-h-screen">Project not found.</div>;

  // ─── Distribute features into left (even indices), right (odd indices), bottom (last if 7th) ───
  const allFeatures = portfolio.features || [];
  const leftFeatures = [];
  const rightFeatures = [];
  let bottomFeature = null;

  allFeatures.forEach((feature, idx) => {
    if (idx === allFeatures.length - 1 && allFeatures.length % 2 === 1) {
      // Last feature goes to bottom center if total count is odd
      bottomFeature = feature;
    } else if (idx % 2 === 0) {
      leftFeatures.push(feature);
    } else {
      rightFeatures.push(feature);
    }
  });

  return (
    <div>
      {/* Hero Image */}
      <img           src={portfolio.heroImage?.trim() ? portfolio.heroImage : portfolio.image}
 className=' h-auto lg:min-h-screen w-full' alt={portfolio.title} />

      <div className='my-20 w-[88%] mx-auto relative'>

        {/* Features Section Header */}
        <h1 className='text-center font-semibold text-[#333] text-2xl sm:text-[44px]'>Main features</h1>
        <p className='text-center font-regular text-[#333333E5] text-sm sm:text-[20px] w-full sm:w-[50%] mx-auto'>
          Unified features designed to deliver seamless performance, efficiency, and control across all types of applications.
        </p>

        {/* Features Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-7 pt-20 relative"
        >
          {/* Ellipse background */}
          <img src={ellipse} className='absolute top-0 left-[20%] z-0 w-[60%]' alt="ellipse" />

          {/* Left Features */}
          <div className="flex flex-col gap-4 h-full justify-between relative z-10">
            {leftFeatures.map((feature, idx) => (
              <motion.div
                key={feature._id}
                custom={idx}
                variants={leftCardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 relative z-4"
              >
                <h3 className="font-semibold text-[#333333] text-sm sm:text-base">{feature.featureTitle}</h3>
                <h3 className="font-normal text-[#333333E5] text-sm sm:text-base mt-3">{feature.featureDescription}</h3>
              </motion.div>
            ))}
          </div>

          {/* Center - Feature Section Image */}
          <div className="flex justify-center z-3">
            <div className='w-full z-10 h-[210px] bg-linear-to-b from-[#FFFFFF00] to-[#FFFFFF] absolute bottom-0'></div>
            <motion.img
              src={portfolio.featureSectionImage}
              className="w-[80%]"
              alt={portfolio.title}
              variants={imageVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />

            {/* Top Label */}
            <motion.div
              className="hidden sm:block absolute top-[35%] left-[20%]"
              variants={topLabelVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* {leftFeatures[0] && (
                <p className="bg-[#333] rounded-md w-fit ml-0 mb-2 py-2 px-1.5 font-normal text-white text-sm sm:text-[12px]">
                  {leftFeatures[0].featureTitle}
                </p>
              )} */}
              <svg width="232" height="16" viewBox="0 0 232 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="-1.74846e-07" y1="8" x2="232" y2="7.99998" stroke="url(#paint0_linear_2177_40916)" strokeWidth="4" />
                <circle cx="216" cy="8" r="7.5" fill="#333" stroke="url(#paint1_linear_2177_40916)" />
                <defs>
                  <linearGradient id="paint0_linear_2177_40916" x1="4.37114e-08" y1="10.5" x2="232" y2="10.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#333" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_2177_40916" x1="208" y1="8" x2="224" y2="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#333" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Bottom Label */}
            <motion.div
              className="hidden sm:block absolute bottom-[24%] right-[20.5%]"
              variants={bottomLabelVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* {rightFeatures[0] && (
                <p className="bg-[#333] rounded-md w-fit mb-2 ml-2 py-2 px-2.5 font-normal text-white text-sm sm:text-base">
                  {rightFeatures[0].featureTitle}
                </p>
              )} */}
              <svg width="210" height="16" viewBox="0 0 210 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="8" x2="210" y2="8" stroke="url(#paint0_linear_2177_40919)" strokeWidth="4" />
                <circle cx="16" cy="8" r="7.5" fill="#333" stroke="url(#paint1_linear_2177_40916)" />
                <defs>
                  <linearGradient id="paint0_linear_2177_40919" x1="0" y1="10.5" x2="210" y2="10.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#333" />
                    <stop offset="1" stopColor="#FAFAFA" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_2177_40919" x1="8" y1="8" x2="24" y2="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#72DE54" />
                    <stop offset="1" stopColor="#FAFAFA" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Right Features */}
          <div className="flex flex-col gap-4 h-full justify-between relative z-3">
            {rightFeatures.map((feature, idx) => (
              <motion.div
                key={feature._id}
                custom={idx}
                variants={rightCardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 relative z-4"
              >
                <h3 className="font-semibold text-[#333333] text-sm sm:text-base">{feature.featureTitle}</h3>
                <h3 className="font-normal text-[#333333E5] text-sm sm:text-base mt-3">{feature.featureDescription}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Center Feature */}
        {bottomFeature && (
          <div className='flex justify-center mt-4 sm:mt-9 relative z-3'>
            <div className='bg-[#FAFAFA] w-full sm:w-[29%] border border-[#EEEEEE] rounded-xl p-4'>
              <h3 className='text-center font-semibold text-[#333333] text-sm sm:text-base'>{bottomFeature.featureTitle}</h3>
              <h3 className='text-center font-regular text-[#333333E5] text-sm sm:text-base mt-3'>{bottomFeature.featureDescription}</h3>
            </div>
          </div>
        )}

        {/* Paragraphs / 1-on-1 Mockups */}
        {portfolio.paragraphs?.map((detail, idx) => (
          <div
            key={detail._id}
            className={`flex flex-col sm:flex-row justify-between items-start gap-0 sm:gap-10 my-5 sm:my-0`}
          >
            {/* TEXT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.2 }}
              className={`
                w-full py-[10px] sm:py-[70px] mt-20 sm:w-[55%] flex flex-col relative justify-center
                order-2
                ${idx % 2 === 0 ? 'sm:order-1' : 'sm:order-2'}
              `}
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, x: -100, rotate: -3 },
                  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="font-semibold leading-9 text-[#333333] text-[24px] sm:text-[44px] sm:leading-15 pb-2 sm:pb-4"
              >
                {detail.paragraphTitle}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, x: 100, rotate: 3 },
                  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className='font-regular text-[#333333E5] text-[18px] sm:text-[24px]'
              >
                {detail.paragraphDescription}
              </motion.p>

              {/* Linking border line */}
            <div
              className={`
                ${idx === 0 ? 'w-[81%] ml-73' : idx === 2 ? 'w-[88%]' : 'w-[81%]'}
                hidden sm:block
                border border-[#3333333D]
                absolute
                ${idx === 0 ? 'top-[125%]' : idx === 1 ? 'top-[100%]' : idx === 2 ? 'top-[15%]' : 'top-[125%]'}
                ${idx === 2 ? 'h-[295px]' : 'h-[375px]'}
                border-b-transparent
                ${idx % 2 === 0 ? 'border-r-transparent' : 'border-l-transparent -ml-35'}
                bottom-0
              `}
            />            </motion.div>

            {/* IMAGE */}
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
              viewport={{ once: true, amount: 0.5 }}
              className={`
                w-full sm:w-[45%] flex justify-start items-center rounded-2xl
                pt-0 sm:pt-10 py-2 sm:py-6 px-5 relative overflow-hidden
                order-1
                ${idx % 2 === 0 ? 'sm:order-2' : 'sm:order-1'}
              `}
            >
              
              <motion.div className="flex relative items-start justify-center py-10 px-3 sm:px-7 w-full">
                {idx % 2 === 0 && (
                  <div className="h-[stretch] mt-10 ml-4 w-7 border border-r-transparent border-[#3333333D]"></div>
                )}
                {idx !== 0 && (
                  <div className="w-[45%] h-7 hidden sm:block absolute -top-10 mt-10 ml-4 border border-b-transparent border-[#3333333D]"></div>
                )}
                <motion.img
                  className="pl-0 sm:pl-5 mb-[-2rem] w-[70%] relative z-4"
                  src={detail.paragraphImage}
                  alt={detail.paragraphTitle}
                  variants={{
                    hidden: { opacity: 0, y: 220, x: 180, rotate: 45 },
                    visible: {
                      opacity: 1, y: 0, x: 0, rotate: 0,
                      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                />
                {idx % 2 !== 0 && (
                  <div className="mt-10 w-7 border border-l-transparent ml-4 h-[stretch] border-[#3333333D]"></div>
                )}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Similar Projects */}
      <div className='py-10 w-[92%] mx-auto'>
        <h1 className='font-semibold text-3xl sm:text-[48px] pb-4 sm:pb-8 text-[#333]'>Similar Projects</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {relatedProjects.map((p) => (
            <Link to={`/portfolio/${p._id}`} key={p._id}>
              <div>
                <img src={p.image} className='hover:scale-103 transition-all duration-200' alt={p.title} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioContentDynamic;