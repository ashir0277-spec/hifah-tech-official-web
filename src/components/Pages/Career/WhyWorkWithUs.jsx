import React from 'react'
import { Globe, Sparkles, Layers, TrendingUp } from 'lucide-react'

const cards = [
  {
    icon: <Globe className='w-5 h-5 sm:w-6 sm:h-6 text-white' />,
    title: 'Innovative Projects',
    desc: 'Work on creative, modern and cutting-edge solutions that challenge your skills.',
  },
  {
    icon: <Sparkles className='w-5 h-5 sm:w-6 sm:h-6 text-white' />,
    title: 'Learning & Growth',
    desc: 'Gain continuous learning opportunities to improve and grow professionally.',
  },
  {
    icon: <Layers className='w-5 h-5 sm:w-6 sm:h-6 text-white' />,
    title: 'Friendly Environment',
    desc: 'Enjoy a supportive, positive and collaborative workplace culture with teamwork.',
  },
  {
    icon: <TrendingUp className='w-5 h-5 sm:w-6 sm:h-6 text-white' />,
    title: 'Career Development',
    desc: 'Build a strong career path with clear growth and advancement opportunities.',
  },
]

const WhyWorkWithUs = () => {
  return (
    <div
      className='w-full py-16 bg-[#091114] sm:py-20 md:py-24 mont'
    >
      <div className='w-[88%] sm:w-[88%] m-auto'>

        {/* Heading */}
        <div className='text-center mb-7 sm:mb-10'>
          <h1 className='text-white font-semibold text-[24px] sm:text-[34px] md:text-[44px] leading-tight'>
            Why Work With Us
          </h1>
          <p className='text-[#aaaaaa] font-medium text-[16px] sm:text-[18px] mt-2 sm:mt-4 max-w-lg mx-auto leading-relaxed'>
            We offer a growth-driven environment where innovation, learning, and collaboration come together.
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'>
          {cards.map((card, i) => (
            <div
              key={i}
              className='rounded-[16px] p-5 sm:p-6 flex flex-col gap-6 bg-[#FFFFFF1A]'
            >
              {/* Icon circle */}
              <div
                className='w-10 h-10 rounded-full flex items-center justify-center text-white'
                style={{ backgroundColor: '#1e2d32' }}
              >
                {card.icon}
              </div>

              {/* Text */}
              <div>
                <p className='text-white font-semibold text-[16px] sm:text-[20px] leading-snug'>
                  {card.title}
                </p>
                <p className='text-[#8a9a9e] font-medium text-[14px] sm:text-[15px] mt-2 leading-relaxed'>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default WhyWorkWithUs