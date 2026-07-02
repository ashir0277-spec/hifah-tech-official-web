import React from 'react'
import TestimonialSlider from '../../Sections/TestomonialCards';
const Testimonials = () => {
  return (
    <section className="py-14 sm:py-30 overflow-hidden">
    <div className=" px-4 lg:px-20">
    <div className="">
    <h2 className="mont text-2xl font-semibold tracking-tight text-center text-[#333] sm:text-4xl">Success Stories With <br/><span className='text-[#4AC3D5]'>Hifah Technologies</span></h2>
    </div>
    <TestimonialSlider/>
    </div>
    </section>
  )
}

export default Testimonials