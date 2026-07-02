import React, { useEffect, useState } from 'react'
import { BrainCircuit, Cloud, Code2, Database, Megaphone, Palette, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Experties = () => {

  const tools = [
    {
      id: 'app-development',
      icon: <Smartphone className='w-5 h-5' />,
      title: "Mobile App Development",
      lgWidth: "lg:w-[60%] lg:flex-none",
      text: "We develop high-quality, user-friendly mobile applications for Android and iOS with custom design, responsive UI, and smooth performance. Our apps are fully tested, optimized, and deployed for a seamless user experience."
    },
    {
      id: 'web-development',
      icon: <Code2 className='w-5 h-5' />,
      title: "Website Development",
      lgWidth: "lg:w-[38%] lg:flex-none",
      text: "We build Custom-designed, WordPress websites, CRM, ERP & HRMS systems that are fast, secure, and scalable."
    },
  ];

  const tools3 = [
    {
      id: "ui-ux-designing",
      icon: <Palette className='w-5 h-5' />,
      title: "UI/UX Designing",
      text: "We create custom UI/UX designs with clean layouts, smooth navigation, and attractive interfaces for web and mobile platforms."
    },
    {
      id: 'digital-marketing',
      icon: <Megaphone className='w-5 h-5' />,
      title: "Digital Marketing",
      text: "We help grow businesses with strategies, including personal branding, SMM, SEO, paid ads, and ASO to boost your online presence."
    },
    {
      id: 'ai-solutions',
      icon: <BrainCircuit className='w-5 h-5' />,
      title: "AI & Machine Learning",
      text: "We provide AI & ML solutions to build smart systems, and deliver data-driven insights for better decision-making."
    },
  ];

  const container2 = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardZoom = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const navigate = useNavigate();
  const [showLink, setShowLink] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowLink(location.pathname !== '/services');
  }, [location.pathname]);

  const ShieldIcon = () => (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.61667 17.4 10.9667 16.4125 12.05 14.9375C13.1333 13.4625 13.7667 11.8167 13.95 10H8V2.125L2 4.375V9.1C2 9.28333 2 9.43333 2 9.55C2 9.66667 2.01667 9.81667 2.05 10H8V17.9Z" fill="#A5D283"/>
    </svg>
  );

  const ArrowIcon = ({ color = "#a5d283" }) => (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.13243 11.3409C0.389989 8.56076 1.10931 5.47146 3.29039 3.29039C6.54476 0.0360171 11.8211 0.0360171 15.0755 3.29039C18.3299 6.54476 18.3299 11.8211 15.0755 15.0755C12.8944 17.2566 9.80512 17.9759 7.02498 17.2335M11.6831 11.683V6.68303M11.6831 6.68303H6.68306M11.6831 6.68303L3.34957 15.0163" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CardIcons = () => (
    <div className='flex items-center gap-2 mt-6 sm:mt-8'>
      <div className='w-8 h-8 bg-[#4AC3D514] flex items-center justify-center rounded-md'>
        <Database className='w-5 h-5 text-[#A5D283]' />
      </div>
      <div className='w-8 h-8 bg-[#4AC3D514] flex items-center justify-center rounded-md'>
        <Cloud className='w-5 h-5 text-[#A5D283]' />
      </div>
      <div className='w-8 h-8 bg-[#4AC3D514] flex items-center justify-center rounded-md'>
        <ShieldIcon />
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-20 bg-[#091114]">
      <div className="mx-auto w-[88%]">
        <div className="mont">
          <p className='text-sm sm:text-lg text-[#a5d283] relative z-10 font-semibold mb-4'>Services</p>
          <h2 className="mont text-xl font-semibold leading-8 sm:leading-14 tracking-tight text-[#fff] sm:text-[48px]">
            Our Exclusive <br /> Premium Service
          </h2>
          <div className='block sm:flex items-end justify-between'>
            <p className="mt-1 text-sm sm:text-lg font-medium text-[#FFFFFFE5]">
              Transform ideas into reality with expert services and<br className="hidden sm:block" /> tailored solutions for your success and growth today.
            </p>

            {showLink && (
              <div
                onClick={() => navigate('/services')}
                className='hidden sm:flex items-center gap-3 cursor-pointer mt-4 sm:mt-0'
              >
                <p className='text-sm sm:text-base text-[#a5d283] font-semibold hover:underline'>
                  View Our All Services
                </p>
                <ArrowIcon />
              </div>
            )}
          </div>
        </div>

        {/* First Row — mobile: stacked, tablet: equal halves, desktop: 60% / 38% */}
        <motion.div
          variants={container2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row gap-3 sm:gap-6 mt-10 w-full"
        >
          {tools.map((course, index) => (
            <motion.div
              key={index}
              variants={cardZoom}
              onClick={() => navigate(`/services/${course.id}`)}
              className={`bg-[#FFFFFF1A] group shadow-[0px_20px_40px_0px_#0064990F]
                         hover:bg-[#a5d28325] hover:border-[#A5D28380] border-[#FFFFFF24] border
                         transition-all duration-300 cursor-pointer flex flex-col justify-between
                         gap-2 p-4 sm:p-5 rounded-2xl
                         w-full md:flex-1 ${course.lgWidth}`}
            >
              <div>
                <div className='flex items-center justify-center text-[#fff] bg-[#FFFFFF1A] rounded-lg w-10 h-10 sm:w-12 sm:h-12'>
                  {course.icon}
                </div>
                <h3 className='font-semibold text-[#fff] text-base sm:text-[22px] mont mt-4 sm:mt-3'>
                  {course.title}
                </h3>
                <p className='font-medium text-[#ffffffcc] mont text-sm sm:text-[17px] mt-1 sm:mt-2'>
                  {course.text}
                </p>
              </div>
              <CardIcons />
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row — 1 col mobile, 2 col tablet, 3 col desktop (unchanged) */}
        <motion.div
          variants={container2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mt-3 sm:mt-6 mb-4 sm:mb-14 w-full"
        >
          {tools3.map((course, index) => (
            <motion.div
              key={index}
              variants={cardZoom}
              onClick={() => navigate(`/services/${course.id}`)}
              className="bg-[#FFFFFF1A] group shadow-[0px_20px_40px_0px_#0064990F]
                         hover:bg-[#a5d28325] hover:border-[#A5D28380] border-[#FFFFFF24] border
                         transition-all duration-300 cursor-pointer flex flex-col justify-between
                         gap-2 p-4 sm:p-5 rounded-2xl w-full"
            >
              <div>
                <div className='flex items-center justify-center text-[#fff] bg-[#FFFFFF1A] rounded-lg w-10 h-10 sm:w-12 sm:h-12'>
                  {course.icon}
                </div>
                <h3 className='font-semibold text-[#fff] text-base sm:text-[22px] mont mt-4 sm:mt-3'>
                  {course.title}
                </h3>
                <p className='font-medium text-[#ffffffcc] mont text-sm sm:text-[17px] mt-1 sm:mt-2'>
                  {course.text}
                </p>
              </div>
              <CardIcons />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile — View All Services button */}
        {showLink && (
          <div
            onClick={() => navigate('/services')}
            className='flex sm:hidden bg-[#4AC3D5] hover:bg-[#36b1c4] transition-colors duration-250 w-fit mx-auto px-9 py-2.5 rounded-full items-center justify-center gap-3 cursor-pointer mt-7'
          >
            <p className='text-sm text-[#fff] font-semibold'>View Our All Services</p>
            <ArrowIcon color="#fff" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Experties;