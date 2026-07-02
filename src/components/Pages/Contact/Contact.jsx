import React from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import HeroContact from './HeroContact'
import Footer from '../../Sections/Footer/Footer'
import ContactForm from './ContactForm'
import CtaWhite from '../../Sections/CtaWhite/CtaWhite'

const Contact = () => {
  return (
    <div className='bg-[#F4F4F4]'>
        <Navbar/>
        <div className='pt-18'>
            <HeroContact/>
        </div>
        <ContactForm/>
        <CtaWhite/>
        <div className='overflow-hidden'>
            <Footer/>
        </div>
    </div>
  )
}

export default Contact