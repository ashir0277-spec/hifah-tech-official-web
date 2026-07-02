import React from 'react'

const ResumeBanner = () => {
  const email = 'careers@hifahtechnology.com'
  const mailto = 'mailto:careers@hifahtechnology.com'

  return (
    <div className='w-[82%] m-auto py-6 sm:py-20 mont'>
      <div
        className='w-full rounded-2xl px-6 py-10 sm:py-12 flex flex-col items-center justify-center text-center gap-2'
        style={{ backgroundColor: '#F2F2F2E5' }}
      >
        <p className='text-[#101828B2] font-semibold text-[15px] sm:text-[16px]'>
          Don&apos;t See a role that fits?
        </p>
        <p className='text-[#333333] font-semibold text-[16px] sm:text-[18px]'>
          Send Your Resume to&nbsp;
          <a href={mailto} style={{ color: '#4AC3D5', fontWeight: 600 }}>{email}</a>
        </p>
      </div>
    </div>
  )
}

export default ResumeBanner