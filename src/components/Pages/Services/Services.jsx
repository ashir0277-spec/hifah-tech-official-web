import React from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import HeroServices from './HeroServices'
import Testimonials from '../StaffAugmentation/Testimonials'
import Cta from '../HomePage/Cta'
import Experties from '../HomePage/Experties'
// import TechStack from '../HomePage/TechStack'
import WhyPartner from '../../Sections/WhyPartner/WhyPartner'
import DevProcess from '../../Sections/DevProcess/DevProcess'
import Process from '../HomePage/Process'
import SimilarProjects from '../Portfolio/SimilarProjects'
import grid from '../../../assets/media/grid.svg'



const Services = () => {
  return (
    <div className='relative'>
      <Navbar/>
      <div className='mt-18'>
        <img src={grid} className='absolute w-full top-0' alt="grid" />
      </div>
      {/* <Experties/> */}
      <HeroServices/>
      <Process/>
      {/* <DevProcess/> */}
      <div className='mt-14'>
      <TechStack/>

      </div>
      <Cta/>
      <Testimonials/>
      <WhyPartner/>
      <SimilarProjects/>
      <div className='overflow-hidden'>
        <Footer/>
      </div>
    </div>
  )
}

export default Services