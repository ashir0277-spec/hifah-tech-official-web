import React from 'react'
import { MapPin, Clock } from 'lucide-react'

const positions = [
  {
    title: 'Product Designer',
    tag: 'Design',
    tagColor: 'text-[#175CD3] bg-[#EFF8FF]',
    dotColor: 'bg-[#2E90FA]',
    desc: "We're looking for a mid-level product designer to join our team.",
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Engineering Manager',
    tag: 'Software Development',
    tagColor: 'text-[#C11574] bg-[#FDF2FA]',
    dotColor: 'bg-[#EE46BC]',
    desc: "We're looking for an experienced engineering manager to join our team.",
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Customer Success Manager',
    tag: 'Careers',
    tagColor: 'text-[#027A48] bg-[#ECFDF3]',
    dotColor: 'bg-[#12B76A]',
    desc: "We're looking for a customer success manager to join our team.",
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Account Executive',
    tag: 'Sales',
    tagColor: 'text-[#3538CD] bg-[#EEF4FF]',
    dotColor: 'bg-[#6172F3]',
    desc: "We're looking for an account executive to join our team.",
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'SEO Marketing Manager',
    tag: 'Marketing',
    tagColor: 'text-[#B93815] bg-[#FFF4ED]',
    dotColor: 'bg-[#EF6820]',
    desc: "We're looking for an experienced SEO marketing manager to join our team.",
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'UX Researcher',
    tag: 'Design',
    tagColor: 'text-[#175CD3] bg-[#EFF8FF]',
    dotColor: 'bg-[#2E90FA]',
    desc: "We're looking for a senior user researcher to join our team.",
    location: 'Remote',
    type: 'Full-time',
  },
]

const OpenPositions = () => {
  return (
    <div className='w-[88%] sm:w-[88%] m-auto py-16 sm:py-20 mont'>

      {/* Top Label */}
      <p className='text-[#333] font-semibold text-[14px] sm:text-[15px] mb-3'>
        Open positions
      </p>

      {/* Heading */}
      <h1 className='text-[#111] font-semibold text-[28px] sm:text-[36px] md:text-[44px] leading-tight'>
        We're looking for talented people
      </h1>

      {/* Subtext */}
      <p className='text-[#474747] font-medium text-[15px] sm:text-[17px] mt-3'>
        We're a 100% remote team spread all across the world. Join us!
      </p>

      {/* Divider */}
      {/* <div className='border-t border-[#e5e7eb] mt-10' /> */}

      {/* Positions Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {positions.map((pos, i) => {
          const isRightCol = i % 2 === 1
          const isLastRow = i >= positions.length - 2
          const isLastOdd = positions.length % 2 !== 0 && i === positions.length - 1

          return (
            <div
              key={i}
              className={`
                py-8 sm:py-10 px-5 sm:px-8 mr-8
                ${isRightCol ? 'md:pl-10 ' : 'md:pr-10'}
                ${!isLastRow ? 'border-b border-[#e5e7eb]' : ''}
                ${isLastOdd ? 'md:col-span-2' : ''}
              `}
            >
              {/* Title + Tag */}
              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                <h2 className='text-[#111] font-semibold text-[16px] sm:text-[18px]'>
                  {pos.title}
                </h2>
                <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-0.5 rounded-[16px] ${pos.tagColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${pos.dotColor}`} />
                  {pos.tag}
                </span>
              </div>

              {/* Description */}
              <p className='text-[#474747] font-medium text-[14px] sm:text-[15px] mt-2 leading-relaxed max-w-sm'>
                {pos.desc}
              </p>

              {/* Meta — location + type */}
              <div className='flex items-center gap-5 mt-4'>
                <span className='flex items-center gap-1.5 text-[#555] font-medium text-[13px] sm:text-[14px]'>
                  <MapPin size={14} className='text-[#888]' />
                  {pos.location}
                </span>
                <span className='flex items-center gap-1.5 text-[#555] font-medium text-[13px] sm:text-[14px]'>
                  <Clock size={14} className='text-[#888]' />
                  {pos.type}
                </span>
              </div>
            </div>
          )
        })}
      </div>


    </div>
  )
}

export default OpenPositions