import React from 'react'
import { Banknote, MapPin, BookOpen, GraduationCap, Users, Globe, ShieldCheck } from 'lucide-react'

const stats = [
  { icon: <ShieldCheck size={20} />, value: '90%', label: 'Employee Satisfaction' },
  { icon: <Globe size={20} />, value: 'Global', label: 'Team Reach' },
]

const benefits = [
  { icon: <Banknote size={18} />, label: 'Competitive Salary Packages' },
  { icon: <MapPin size={18} />, label: 'Remote Work Options' },
  { icon: <BookOpen size={18} />, label: 'Unlimited Learning Resources' },
  { icon: <GraduationCap size={18} />, label: 'Personal Skill Development Budget' },
  { icon: <Users size={18} />, label: 'Supportive & Collaborative Team' },
]

const WorkCulture = () => {
  return (
    <div className='w-[88%] sm:w-[88%] m-auto py-16 sm:py-20 mont'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>

        {/* ── LEFT: Our Work Culture ── */}
        <div>
          <h2 className='text-[#333333] font-semibold text-[24px]  md:text-[32px] leading-tight'>
            Our Work Culture
          </h2>

          <p className='text-[#474747] font-medium text-[15px] sm:text-[18px] mt-5 leading-relaxed'>
            At Hifah Technologies, we don't just build apps; we foster an
            environment of <span className='font-bold text-[#111]'>innovation</span>,{' '}
            <span className='font-bold text-[#111]'>teamwork</span>, and{' '}
            <span className='font-bold text-[#111]'>continuous improvement.</span>
          </p>

          <p className='text-[#474747] font-medium text-[15px] sm:text-[18px] mt-3 leading-relaxed'>
            We believe in radical transparency, extreme ownership, and
            the idea that the best idea wins, regardless of hierarchy.
          </p>

          {/* Stats */}
          <div className='grid grid-cols-2 gap-4 mt-8'>
            {stats.map((stat, i) => (
              <div
                key={i}
                  className='rounded-xl px-4 py-3 border border-[#0000001F]'
                // style={{ backgroundColor: '#4AC3D5' }}
              >
                  <div className='flex items-center mb-2 sm:mb-3 justify-center text-[#64748B] bg-[#64748b15] rounded-full w-7 h-7 sm:w-10 sm:h-10'>
                  {stat.icon}
                  </div>
                  <div className='text-black'>
                  </div>
                <p className='text-[#333] font-bold text-[18px] leading-tight'>
                  {stat.value}
                </p>
                <p className='text-[#333] font-medium text-[14px] mt-1 opacity-90'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Employee Benefits ── */}
        <div>
          <h2 className='text-[#333333] font-semibold text-[24px]  md:text-[32px] leading-tight'>
            Employee Benefits
          </h2>

          <div className='flex flex-col gap-3 mt-6'>
            {benefits.map((item, i) => (
              <div
                key={i}
                className='flex items-center gap-3 px-4 py-3.5 rounded-[8px] border border-[#33415529] bg-white'
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <span style={{ color: '#333' }} className='flex-shrink-0'>
                  {item.icon}
                </span>
                <span className='text-[#333] font-medium text-[14px] sm:text-[15px]'>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default WorkCulture