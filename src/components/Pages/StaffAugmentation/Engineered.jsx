import React from 'react'
import getstarted from '../../../assets/images/getstarted.jpg'
import { Activity, Calendar, ClockCheck, Gauge, Metronome, ParkingMeter, RefreshCcw, RefreshCw, Repeat, Search, ShieldCheck, Speaker, TrendingUp, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Engineered = ({fadeUp, fadeLeft, fadeRight}) => {
    const steps =[
        {
            id: 1,
            icon: (<svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5625 14.375C11.0625 14.875 11.7083 15.1198 12.5 15.1094C13.2917 15.099 13.875 14.8125 14.25 14.25L21.25 3.75L10.75 10.75C10.1875 11.125 9.89062 11.6979 9.85938 12.4688C9.82812 13.2396 10.0625 13.875 10.5625 14.375ZM12.5 0C13.7292 0 14.9115 0.171875 16.0469 0.515625C17.1823 0.859375 18.25 1.375 19.25 2.0625L16.875 3.5625C16.1875 3.20833 15.474 2.94271 14.7344 2.76562C13.9948 2.58854 13.25 2.5 12.5 2.5C9.72917 2.5 7.36979 3.47396 5.42188 5.42188C3.47396 7.36979 2.5 9.72917 2.5 12.5C2.5 13.375 2.61979 14.2396 2.85938 15.0938C3.09896 15.9479 3.4375 16.75 3.875 17.5H21.125C21.6042 16.7083 21.9531 15.8854 22.1719 15.0312C22.3906 14.1771 22.5 13.2917 22.5 12.375C22.5 11.625 22.4115 10.8958 22.2344 10.1875C22.0573 9.47917 21.7917 8.79167 21.4375 8.125L22.9375 5.75C23.5625 6.72917 24.0573 7.77083 24.4219 8.875C24.7865 9.97917 24.9792 11.125 25 12.3125C25.0208 13.5 24.8854 14.6354 24.5938 15.7188C24.3021 16.8021 23.875 17.8333 23.3125 18.8125C23.0833 19.1875 22.7708 19.4792 22.375 19.6875C21.9792 19.8958 21.5625 20 21.125 20H3.875C3.4375 20 3.02083 19.8958 2.625 19.6875C2.22917 19.4792 1.91667 19.1875 1.6875 18.8125C1.14583 17.875 0.729167 16.8802 0.4375 15.8281C0.145833 14.776 0 13.6667 0 12.5C0 10.7708 0.328125 9.15104 0.984375 7.64062C1.64062 6.13021 2.53646 4.80729 3.67188 3.67188C4.80729 2.53646 6.13542 1.64062 7.65625 0.984375C9.17708 0.328125 10.7917 0 12.5 0Z" fill="#4AC3D5"/>
</svg>
),
            title: 'Fast Hiring',
            desc: 'Onboard top-tier engineers in as little as 48 hours, keeping your product roadmap on schedule.'
        },
        {
            id: 1,
            icon: (<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 20V2.5C2.5 2.5 2.5 2.96354 2.5 3.89062C2.5 4.81771 2.5 6.02083 2.5 7.5V15C2.5 16.4792 2.5 17.6823 2.5 18.6094C2.5 19.5365 2.5 20 2.5 20ZM2.5 22.5C1.8125 22.5 1.22396 22.2552 0.734375 21.7656C0.244792 21.276 0 20.6875 0 20V2.5C0 1.8125 0.244792 1.22396 0.734375 0.734375C1.22396 0.244792 1.8125 0 2.5 0H20C20.6875 0 21.276 0.244792 21.7656 0.734375C22.2552 1.22396 22.5 1.8125 22.5 2.5V5.625H20V2.5H2.5V20H20V16.875H22.5V20C22.5 20.6875 22.2552 21.276 21.7656 21.7656C21.276 22.2552 20.6875 22.5 20 22.5H2.5ZM12.5 17.5C11.8125 17.5 11.224 17.2552 10.7344 16.7656C10.2448 16.276 10 15.6875 10 15V7.5C10 6.8125 10.2448 6.22396 10.7344 5.73438C11.224 5.24479 11.8125 5 12.5 5H21.25C21.9375 5 22.526 5.24479 23.0156 5.73438C23.5052 6.22396 23.75 6.8125 23.75 7.5V15C23.75 15.6875 23.5052 16.276 23.0156 16.7656C22.526 17.2552 21.9375 17.5 21.25 17.5H12.5ZM21.25 15V7.5H12.5V15H21.25ZM16.25 13.125C16.7708 13.125 17.2135 12.9427 17.5781 12.5781C17.9427 12.2135 18.125 11.7708 18.125 11.25C18.125 10.7292 17.9427 10.2865 17.5781 9.92188C17.2135 9.55729 16.7708 9.375 16.25 9.375C15.7292 9.375 15.2865 9.55729 14.9219 9.92188C14.5573 10.2865 14.375 10.7292 14.375 11.25C14.375 11.7708 14.5573 12.2135 14.9219 12.5781C15.2865 12.9427 15.7292 13.125 16.25 13.125Z" fill="#4AC3D5"/>
</svg>
),
            title: 'Cost-Effective',
            desc: 'Save up to 40% on operational costs compared to local full-time hiring without sacrificing quality.'
        },
        {
            id: 1,
            icon: <TrendingUp className='w-5 h-5 sm:w-6 sm:h-6 text-[#4AC3D5]' />,
            title: 'Flexible Scaling',
            desc: 'Easily ramp up or down based on your project requirements and budget constraints.'
        },
        {
            id: 1,
            icon: (<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 11.1875L10.6875 5.375C10.9792 5.25 11.276 5.15625 11.5781 5.09375C11.8802 5.03125 12.1875 5 12.5 5C13.7292 5 14.7656 5.42188 15.6094 6.26562C16.4531 7.10938 16.875 8.14583 16.875 9.375C16.875 9.6875 16.8438 9.99479 16.7812 10.2969C16.7188 10.599 16.625 10.8958 16.5 11.1875ZM4.8125 18.875C5.875 18.0625 7.0625 17.4219 8.375 16.9531C9.6875 16.4844 11.0625 16.25 12.5 16.25C12.875 16.25 13.2344 16.2656 13.5781 16.2969C13.9219 16.3281 14.2812 16.375 14.6562 16.4375L11.9062 13.6875C10.9271 13.5625 10.0885 13.151 9.39062 12.4531C8.69271 11.7552 8.28125 10.9167 8.15625 9.9375L4.59375 6.375C3.92708 7.22917 3.41146 8.17188 3.04688 9.20312C2.68229 10.2344 2.5 11.3333 2.5 12.5C2.5 13.7292 2.70312 14.8854 3.10938 15.9688C3.51562 17.0521 4.08333 18.0208 4.8125 18.875ZM20.375 18.625C21.0417 17.7708 21.5625 16.8281 21.9375 15.7969C22.3125 14.7656 22.5 13.6667 22.5 12.5C22.5 9.72917 21.526 7.36979 19.5781 5.42188C17.6302 3.47396 15.2708 2.5 12.5 2.5C11.3333 2.5 10.2344 2.6875 9.20312 3.0625C8.17188 3.4375 7.22917 3.95833 6.375 4.625L20.375 18.625ZM12.5156 25C10.7969 25 9.17708 24.6719 7.65625 24.0156C6.13542 23.3594 4.80729 22.4635 3.67188 21.3281C2.53646 20.1927 1.64062 18.8646 0.984375 17.3438C0.328125 15.8229 0 14.2031 0 12.4844C0 10.7656 0.328125 9.15104 0.984375 7.64062C1.64062 6.13021 2.53646 4.80729 3.67188 3.67188C4.80729 2.53646 6.13542 1.64062 7.65625 0.984375C9.17708 0.328125 10.7969 0 12.5156 0C14.2344 0 15.849 0.328125 17.3594 0.984375C18.8698 1.64062 20.1927 2.53646 21.3281 3.67188C22.4635 4.80729 23.3594 6.13021 24.0156 7.64062C24.6719 9.15104 25 10.7656 25 12.4844C25 14.2031 24.6719 15.8229 24.0156 17.3438C23.3594 18.8646 22.4635 20.1927 21.3281 21.3281C20.1927 22.4635 18.8698 23.3594 17.3594 24.0156C15.849 24.6719 14.2344 25 12.5156 25ZM12.5 22.5C13.6042 22.5 14.6458 22.3385 15.625 22.0156C16.6042 21.6927 17.5 21.2292 18.3125 20.625C17.5 20.0208 16.6042 19.5573 15.625 19.2344C14.6458 18.9115 13.6042 18.75 12.5 18.75C11.3958 18.75 10.3542 18.9115 9.375 19.2344C8.39583 19.5573 7.5 20.0208 6.6875 20.625C7.5 21.2292 8.39583 21.6927 9.375 22.0156C10.3542 22.3385 11.3958 22.5 12.5 22.5Z" fill="#4AC3D5"/>
                </svg>
                ),
            title: 'No Long-Term Commitment',
            desc: 'Focus on results with month-to-month contracts designed  for modern, agile startups.'
        },
        {
            id: 1,
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6 text-[#4AC3D5]' />,
            title: 'Vetted Talent',
            desc: 'Only the top 3% of applicants pass our rigorous technical and communication assessments.'
        },
        {
            id: 1,
            icon: <Repeat className='w-5 h-5 sm:w-6 sm:h-6 text-[#4AC3D5]' />,
            title: 'Seamless Integration',
            desc: 'Our engineers align with your time zone, tools, and company culture from day one.'
        },
    ]
      const navigate = useNavigate();

    const Icon = ({text}) => {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 -3.91654e-07 10 -8.74228e-07C4.48 -1.3568e-06 1.3568e-06 4.48 8.74228e-07 10C3.91654e-07 15.52 4.48 20 10 20ZM6.5 9.25L11.69 9.25L9.97 7.53C9.68 7.24 9.68 6.76 9.97 6.47C10.12 6.32 10.31 6.25 10.5 6.25C10.69 6.25 10.88 6.32 11.03 6.47L14.03 9.47C14.32 9.76 14.32 10.24 14.03 10.53L11.03 13.53C10.74 13.82 10.26 13.82 9.97 13.53C9.68 13.24 9.68 12.76 9.97 12.47L11.69 10.75L6.5 10.75C6.09 10.75 5.75 10.41 5.75 10C5.75 9.59 6.09 9.25 6.5 9.25Z" fill={text} />
        </svg>
      )
    }
      
  return (
    <>
    <div className='my-24 text-[#333] mx-auto w-[90%] sm:w-[90%]'>
        <motion.h1 {...fadeUp(0.14)}  className='font-semibold text-2xl sm:text-[44px] mb-6'>Engineered for Efficiency</motion.h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7'>
        {steps.map((s, idx) => (
            <>
            <motion.div {...fadeUp((0.20 + idx * 0.07))} key={idx} className='rounded-2xl px-4 py-5 hover:border-t-4 border hover:border-[#4AC3D5] border-[#0000001F] transition-all duration-300 cursor-pointer'>
                <div className='bg-[#4AC3D514] rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center'>
                {s.icon}

                </div>
                <h2 className='font-semibold  text-[#333333] text-lg sm:text-xl pt-4 sm:pt-7 pb-1 sm:pb-2'>{s.title}</h2>
                <p className='font-medium text-[#45464D] text-sm sm:text-base'>{s.desc}</p>
            </motion.div>
            </>
        ))}
        </div>
    </div>

    
  <div className='my-9 sm:my-0 flex flex-col xl:flex-row gap-6 items-center px-6 sm:px-20'>
 
  {/* Left: text + button */}
  <motion.div {...fadeLeft(0.24)} className='w-full xl:w-[40%]'>
    <h1 className='font-semibold text-2xl sm:text-[44px] leading-tight'>Let's Get Started</h1>
    <p className='font-medium text-[#45464D] text-sm sm:text-lg mt-3 w-full xl:w-[90%]'>
      If you have questions about global staffing solutions or our processes, we have answers.
      Book a consultation to discuss your needs and how we can help!
    </p>
    <button
      onClick={() => navigate('/contact')}
      className="mt-6 sm:mt-8 px-6 py-2.5 w-fit rounded-full text-white font-semibold bg-[#4AC3D5] transition-colors duration-300"
    >
      <span className="text-sm sm:text-base flex items-center justify-center gap-3">
        Book a Call Now
        <Icon text="#fff" />
      </span>
    </button>
  </motion.div>
 
  {/* Right: image */}
  <motion.div {...fadeRight(0.24)} className='w-full  mt-8 xl:w-[60%] relative hidden sm:block'>
    <div className="pointer-events-none absolute left-0 top-0 h-full w-50 z-10 bg-gradient-to-r from-white to-transparent" />
    <img src={getstarted} className='w-full' alt="media" />
  </motion.div>
 
</div>
    </>
  )
}

export default Engineered