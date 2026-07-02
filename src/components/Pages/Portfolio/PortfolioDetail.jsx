import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import heroimg from '../../../assets/career/Rectangle 34626316.png'
import warn from '../../../assets/icons/alert.png'
import { FileWarningIcon } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProjectResultsBar from './ProjectResultsBar'
import Testimonials from '../StaffAugmentation/Testimonials'
import FeaturedProjects from './RelatedProjects'
import SimilarProjectCTA from './SimilarProjectCTA'
import Skeleton from 'react-loading-skeleton'

// ─── Replace with your actual asset imports ───────────────────────────────────
// import heroImg from '../../../assets/media/portfolio-mockup.png'
const HERO_IMG = heroimg

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})
const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})
const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})

// ─── Feature SVG Icons (inline, matches small square icons in Figma) ──────────
const IconShield = () => (
<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.55 8L13 4.45L14.425 3.05L16.55 5.175L20.8 0.925L22.2 2.35L16.55 8ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="#64748B"/>
</svg>
)

const IconBox = () => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 20C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V6.725C0.7 6.54167 0.458333 6.30417 0.275 6.0125C0.0916667 5.72083 0 5.38333 0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V5C20 5.38333 19.9083 5.72083 19.725 6.0125C19.5417 6.30417 19.3 6.54167 19 6.725V18C19 18.55 18.8042 19.0208 18.4125 19.4125C18.0208 19.8042 17.55 20 17 20H3ZM3 7V18H17V7H3ZM2 5H18V2H2V5ZM7 12H13V10H7V12Z" fill="#64748B"/>
</svg>
)

const IconCart = () => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18C4 17.45 4.19583 16.9792 4.5875 16.5875C4.97917 16.1958 5.45 16 6 16C6.55 16 7.02083 16.1958 7.4125 16.5875C7.80417 16.9792 8 17.45 8 18C8 18.55 7.80417 19.0208 7.4125 19.4125C7.02083 19.8042 6.55 20 6 20ZM16 20C15.45 20 14.9792 19.8042 14.5875 19.4125C14.1958 19.0208 14 18.55 14 18C14 17.45 14.1958 16.9792 14.5875 16.5875C14.9792 16.1958 15.45 16 16 16C16.55 16 17.0208 16.1958 17.4125 16.5875C17.8042 16.9792 18 17.45 18 18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20ZM5.15 4L7.55 9H14.55L17.3 4H5.15ZM4.2 2H18.95C19.3333 2 19.625 2.17083 19.825 2.5125C20.025 2.85417 20.0333 3.2 19.85 3.55L16.3 9.95C16.1167 10.2833 15.8708 10.5417 15.5625 10.725C15.2542 10.9083 14.9167 11 14.55 11H7.1L6 13H18V15H6C5.25 15 4.68333 14.6708 4.3 14.0125C3.91667 13.3542 3.9 12.7 4.25 12.05L5.6 9.6L2 2H0V0H3.25L4.2 2ZM7.55 9H14.55H7.55Z" fill="#64748B"/>
</svg>
)

const IconCard = () => (
<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 9C12.1667 9 11.4583 8.70833 10.875 8.125C10.2917 7.54167 10 6.83333 10 6C10 5.16667 10.2917 4.45833 10.875 3.875C11.4583 3.29167 12.1667 3 13 3C13.8333 3 14.5417 3.29167 15.125 3.875C15.7083 4.45833 16 5.16667 16 6C16 6.83333 15.7083 7.54167 15.125 8.125C14.5417 8.70833 13.8333 9 13 9ZM6 12C5.45 12 4.97917 11.8042 4.5875 11.4125C4.19583 11.0208 4 10.55 4 10V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V10C22 10.55 21.8042 11.0208 21.4125 11.4125C21.0208 11.8042 20.55 12 20 12H6ZM8 10H18C18 9.45 18.1958 8.97917 18.5875 8.5875C18.9792 8.19583 19.45 8 20 8V4C19.45 4 18.9792 3.80417 18.5875 3.4125C18.1958 3.02083 18 2.55 18 2H8C8 2.55 7.80417 3.02083 7.4125 3.4125C7.02083 3.80417 6.55 4 6 4V8C6.55 8 7.02083 8.19583 7.4125 8.5875C7.80417 8.97917 8 9.45 8 10ZM19 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V3H2V14H19V16ZM6 10V2V10Z" fill="#64748B"/>
</svg>

)

const IconTruck = () => (
<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16C4.16667 16 3.45833 15.7083 2.875 15.125C2.29167 14.5417 2 13.8333 2 13H0V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16V4H19L22 8V13H20C20 13.8333 19.7083 14.5417 19.125 15.125C18.5417 15.7083 17.8333 16 17 16C16.1667 16 15.4583 15.7083 14.875 15.125C14.2917 14.5417 14 13.8333 14 13H8C8 13.8333 7.70833 14.5417 7.125 15.125C6.54167 15.7083 5.83333 16 5 16V16M5 14C5.28333 14 5.52083 13.9042 5.7125 13.7125C5.90417 13.5208 6 13.2833 6 13C6 12.7167 5.90417 12.4792 5.7125 12.2875C5.52083 12.0958 5.28333 12 5 12C4.71667 12 4.47917 12.0958 4.2875 12.2875C4.09583 12.4792 4 12.7167 4 13C4 13.2833 4.09583 13.5208 4.2875 13.7125C4.47917 13.9042 4.71667 14 5 14V14M2 11H2.8C3.08333 10.7 3.40833 10.4583 3.775 10.275C4.14167 10.0917 4.55 10 5 10C5.45 10 5.85833 10.0917 6.225 10.275C6.59167 10.4583 6.91667 10.7 7.2 11H14V2H2V2V2V11V11M17 14C17.2833 14 17.5208 13.9042 17.7125 13.7125C17.9042 13.5208 18 13.2833 18 13C18 12.7167 17.9042 12.4792 17.7125 12.2875C17.5208 12.0958 17.2833 12 17 12C16.7167 12 16.4792 12.0958 16.2875 12.2875C16.0958 12.4792 16 12.7167 16 13C16 13.2833 16.0958 13.5208 16.2875 13.7125C16.4792 13.9042 16.7167 14 17 14V14M16 9H20.25L18 6H16V9V9M8 6.5V6.5V6.5V6.5V6.5V6.5V6.5V6.5V6.5V6.5V6.5V6.5V6.5" fill="#64748B"/>
</svg>
)

// ─── Key Feature Item ─────────────────────────────────────────────────────────
const FeatureItem = ({ IconComp, title, desc, delay }) => (
  <motion.div {...fadeRight(delay)} className="flex items-start gap-3">
    <div
      className="flex-shrink-0 w-10 h-10 rounded-md flex items-center bg-[#64748b11] rouned-[8px] justify-center"
    >
      <IconComp />
    </div>
    <div>
      <p className="mont text-[16px] font-semibold text-[#333333] leading-snug">{title}</p>
      <p className="mont font-medium text-[15px] text-[#333333cc] mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
)

// ─── Portfolio Detail Page ────────────────────────────────────────────────────
const PortfolioDetail = ({ project }) => {

  // https://hifah-technology-official-backend-production.up.railway.app/api/get-single-portfolio/68e4b452ddd034f02c91b83f

  
    const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

 const CurveLines = () => {
  const lines = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "-20%" }}
          animate={{ x: "120%" }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.2,
          }}
          className="absolute w-[200%]"
          style={{
            top: `${15 + i * 12}%`,
          }}
        >
          <svg
            width="100%"
            height="120"
            viewBox="0 0 1200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={`M0 ${60 + (i % 2 === 0 ? -20 : 20)} 
                  C 300 ${i % 2 === 0 ? 0 : 120}, 
                    900 ${i % 2 === 0 ? 120 : 0}, 
                    1200 ${60 + (i % 2 === 0 ? -20 : 20)}`}
              stroke="#00bad6"
              strokeWidth="2"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
  
    const navigate = useNavigate();
  
    const [projectdetails, setProject] = useState([])

    const [loading, setLoading] = useState(false)

    const {id} = useParams();

    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BaseUrl}/get-single-portfolio/${id}`, {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch portfolios');
        }
  
        const data = await response.json();
       setProject(data || {});
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch portfolios
      useEffect(() => {
        fetchPortfolios();
      }, []);

  const meta = [
    { label: 'CLIENT',     value: 'TrendyShop' },
    { label: 'CATEGORY',   value: 'Web Development' },
    { label: 'DURATION',   value: '2 Months' },
    { label: 'TECH STACK', value: 'React, Node.js, Tailwind' },
  ]

  const features = [
    { IconComp: IconShield, title: 'User Authentication',  desc: 'Seamless sign-up & profile management' },
    { IconComp: IconBox,    title: 'Product Management',   desc: 'Dynamic catalog with advanced filters' },
    { IconComp: IconCart,   title: 'Advanced Cart',         desc: 'Seamless checkout with mini-cart' },
    { IconComp: IconCard,   title: 'Multi-gate Payments',  desc: 'Secure payment gateway integrations' },
    { IconComp: IconTruck,  title: 'Order Tracking',        desc: 'Real-time shipping & status updates' },
  ]

  const problems = [
    'No online presence or sales channel',
    'Manual order tracking & entry system',
    'High bounce rates on mobile',
  ]

  const solutions = [
    'Custom scalable e-commerce website',
    'Automated inventory & orders',
    'Fully responsive mobile-first design',
  ]

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] roboto overflow-hidden">

      {/* ════════════════════════════════════════════
          HERO — grey bg, padded, rounded mockup
      ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {loading && (
            <div className="flex items-center bg-black justify-center h-screen text-slate-400">
                <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
            )}
        <div className="w-[92%] sm:w-[100%] mx-auto py-4 sm:py-4 bg-white sm:bg-black relative"> 
        {/* <div className='w-full absolute blur-2xl h-full' />  */}
        {/* <CurveLines /> */}
        <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.97 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 1.2, 
        ease: [0.22, 1, 0.36, 1], delay: 0.15 }} 
        className="overflow-hidden rounded-2xl" > 
        <img src={projectdetails?.portfolio?.image } alt={projectdetails?.portfolio?.title} className="w-full object-contain" 
        style={{ maxHeight: '640px' }} />
         </motion.div> 
        
        </div>
      </motion.div>

      

      {/* ════════════════════════════════════════════
          MAIN CONTENT — white bg below hero
      ════════════════════════════════════════════ */}
      <div className="w-[90%]  mx-auto pt-10 sm:pt-16 pb-6 sm:pb-15">

        {/* ── Title + Subtitle ── */}
        <motion.div {...fadeUp(0.1)} className="mb-5">
          <h1 className="mont text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#1A1A2E] leading-tight mb-2.5">
            {projectdetails?.portfolio?.title}
          </h1>
          <p className="mont font-medium text-sm sm:text-lg text-[#333333E5] leading-relaxed max-w-6xl">
            {projectdetails?.portfolio?.description}
            
          </p>
        </motion.div>

        {/* ── Meta Row ── */}
        <motion.div
          {...fadeUp(0.16)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 py-5 mb-2 sm:mb-6"
        >
          {meta.map((m, i) => (
            <div key={i}>
              <p className="mont text-[16px] sm:text-[18px] font-bold text-[#333333] tracking-widest uppercase mb-1">
                {m.label}
              </p>
              <p className="mont text-[14px] sm:text-[16px] font-semibold text-[#64748B] leading-snug">{m.value}</p>
            </div>
          ))}
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center gap-3 mb-16">
          <button
            className="mont text-sm font-semibold px-5 py-2.5 rounded-lg border border-[#4AC3D5] text-[#4AC3D5] hover:border-[#53C1CE]  hover:text-[#53C1CE] transition-all duration-200 bg-white"
          >
            Case Study PDF
          </button>
          <button
            className="mont text-sm font-semibold px-5 py-2.5 rounded-lg bg-[#4AC3D5] text-white transition-opacity duration-200 hover:opacity-90 active:opacity-80"
          >
            View Live Project
          </button>
        </motion.div>

        {/* ════════════════════════════════════════════
            PROJECT OVERVIEW — 2 col layout
        ════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 mb-14">

          {/* Left: Overview text */}
          <div className="flex-1 min-w-0">
            <motion.h2 {...fadeUp(0.08)} className="mont text-[25px] font-bold text-[#1A1A2E] mb-1">
              Project Overview
            </motion.h2>
            <motion.p {...fadeLeft(0.14)} className="mont font-medium text-base sm:text-[18px] text-[#333333E5] leading-[1.8]">
              Hifah Technologies partnered with TrendyShop to overhaul their digital presence. We delivered a high-performance, custom-built e-commerce solution focused on conversion optimization and user engagement. Our team built a robust backend capable of handling thousands of concurrent users while maintaining lightning-fast load times.
            </motion.p>

              {/* ════════════════════════════════════════════
            PROBLEM VS. SOLUTION
        ════════════════════════════════════════════ */}
        <motion.h2 {...fadeUp(0.08)} className="mont text-[25px] font-bold text-[#1A1A2E] mb-3 my-5">
          Problem vs Solution
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Problem Card */}
          <motion.div
            {...fadeLeft(0.14)}
            className="rounded-[12px] p-5 bg-[#EF444414]  border border-[#EF444433]"
          >
            <div className="flex-col  items-center mb-3">
              {/* Circle-X icon */}
              {/* <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#EF4444" strokeWidth="1.3"/>
                <path d="M5 5l5 5M10 5l-5 5" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round"/>
              </svg> */}
              <img src={warn} alt="Warning" />
              <p className="mont mt-2 text-[18px] font-bold text-[#EF4444] tracking-relaxed capitalize">
                The Problem
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-3 w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  <span className="mont font-medium text-base sm:text-[18px] text-[#333333] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Card */}
          <motion.div
            {...fadeRight(0.17)}
            className="rounded-[12px] bg-[#4AC3D514] border border-[#4AC3D5] p-5"
          >
            <div className="flex-col items-center gap-2 mb-3">
              {/* Checkmark-circle icon */}
              <svg width="28" height="28" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#53C1CE" strokeWidth="1.3"/>
                <path d="M4.5 7.5l2 2 4-4" stroke="#53C1CE" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="mont mt-2 text-[18px] font-bold text-[#4AC3D5] tracking-relaxed capitalize">
                The Solution
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-3 w-1.5 h-1.5 rounded-full bg-[#4AC3D5]" />
                  <span className="mont font-medium  text-base sm:text-[18px] leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
          </div>

          {/* Right: Key Features */}
          <div className="w-full lg:w-[382px] flex-shrink-0 p-6 rounded-[16px] border border-[#33333327]" >
            <motion.p {...fadeRight(0.08)} className="mont text-[20px] font-semibold text-[#333333] mb-4">
              Key Features
            </motion.p>
            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <FeatureItem key={i} {...f} delay={0.10 + i * 0.07} />
              ))}
            </div>
          </div>

        </div>

        <h1 className='text-[#333] mont mt-4 sm:mt-20 pt-10 font-semibold text-[38px] sm:text-[44px] text-left sm:text-center'>Features</h1>
            <p className='text-[#5c5c5c] mont font-medium text-base sm:text-base text-left sm:text-center'>Innovation Solutions built for performance and user experience.</p>


            {projectdetails?.portfolio?.paragraphs?.map((detail, idx) => {
                const isTextFirst = idx % 2 === 0; // even = text first, odd = image first

              return (
          <div key={idx} className="flex flex-col sm:flex-row justify-between mont gap-0 sm:gap-10 my-5 sm:mt-4">

            {/* TEXT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.2 }}
              className={`
                w-full sm:w-[50%] py-[10px] sm:py-[40px] flex flex-col justify-center
                order-2
                ${isTextFirst ? 'sm:order-1' : 'sm:order-2'}
              `}
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, x: -100, rotate: -3 },
                  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className='font-semibold sm:font-bold leading-9 text-[#333333] text-[24px] sm:text-[34px]'
              >
                {detail.paragraphTitle}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, x: 100, rotate: 3 },
                  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
                }}
                className='font-medium text-[#333333CC] text-[16px] sm:text-[17px] pt-2 sm:pt-6'
              >
                {detail.paragraphDescription}
              </motion.p>
            </motion.div>

            {/* IMAGE (UNCHANGED ANIMATIONS) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 60 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.25 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className={`
                w-full sm:w-[50%] flex justify-start items-center bg-[#fff33] rounded-[16px]
                pt-0 sm:pt-10 py-2 sm:py-6 px-5 relative overflow-hidden w-full md:w-1/2
                order-1
                ${detail.first === 'text' ? 'sm:order-2' : 'sm:order-1'}
              `}
            >
              <motion.div className="flex relative items-start justify-center py-10 px-3 sm:px-7 w-full ">
                <motion.img
                  className={`pl-0 sm:pl-5 mb-[-2rem]  
                    
                  relative z-4`}
                  src={detail?.paragraphImage}
                //   style={{ width: `${detail?.w}%` }}
                style={{ width: `${detail?.w}%` }}
                  alt="feature media"
                  variants={{
                    hidden: { opacity: 0, y: 220, x: 180, rotate: 45 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      rotate: 0,
                      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                />

                
              </motion.div>
            </motion.div>

          </div>
              )
        })}
      

      </div>
      <ProjectResultsBar/>
        <div className='overflow-hidden'>
          <Testimonials/>
        </div>
        <FeaturedProjects relatedProject={projectdetails?.relatedProjects?.slice(1)} />
        <SimilarProjectCTA/>
    </div>
  )
}

export default PortfolioDetail