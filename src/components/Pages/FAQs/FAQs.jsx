import React, {useState} from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import Faqs from '../../Sections/Faqs/Faqs'
// import HeroFeature from '../FeaturesPage/HeroFeature/HeroFeature'

const FAQs = () => {
  
  return (
    <div className='inter bg-[#F4F5F7]'>
        <Navbar />
        <div className='pt-10 sm:pt-24 mb-20'>
        </div>
            <Faqs />
        <Footer />
    </div>
  )
}

export default FAQs