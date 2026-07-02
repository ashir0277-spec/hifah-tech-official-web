import React, {useEffect, useRef, useState} from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import Hero from '../../Sections/Hero/Hero'
import Faqs from '../../Sections/Faqs/Faqs'
import Clients from './Clients'
import AboutUs from './AboutUs'
import Experties from './Experties'
// import Testimonials from './Testimonials'
import Cta from './Cta'
import Process from './Process'
// import Portfolio from './Portfolio'
import NewPorfolio from './NewPortfolio'
import CoreValues from './CoreValues'
import TechStack from './TechStack'
import TeamMembers from '../../Sections/TeamMembers/TeamMembers'
import Engagement from '../../Sections/Engagement/Engagement'
import WhyPartner from '../../Sections/WhyPartner/WhyPartner'
import Map from '../../Sections/Map/Map'
import Gallery from '../../Sections/Gallery'
import Events from '../../Sections/Events'
import HifahBlog from './Blogs'
import NewsLetter from '../../Sections/NewsLetter/NewsLetter'
import { ChevronUp } from 'lucide-react'
import Testimonials from '../StaffAugmentation/Testimonials'
import Portfoliopage from './NewPortfolio'

const HomePage = () => {
  const [showForm, setShowForm] = useState(false)

   const registrationRef = useRef(null)
    const [showBtn, setShowBtn] = useState(false)
  
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
  
    useEffect(() => {
      const handleScroll = () => {
        if (!registrationRef.current) return
        if (isIOS) return
  
        const rect = registrationRef.current.getBoundingClientRect()
        // when Registration section top goes above viewport
        setShowBtn(rect.top <= 0)
      }
  
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

  return (
    <div className='relative roboto ' style={{scrollbarWidth: 'none'}}>
      <div className='overflow-hidden'>
        <Navbar setShowForm={setShowForm} showForm={showForm} />

      </div>
        <div className='pt-0 bg-[#121212] overflow-hidden'>
          <Hero />
        </div>
        <div className='mt-0 sm:mt-0'>
          <Clients/>

        </div>
        <div className='overflow-hidden'>
          <AboutUs/>

        </div>
          <Experties/> 
          <div className='hidde sm:block'>
          {/* <CoreValues/> */}

          </div>
          {/* <Portfolio/> */}
        <Portfoliopage/>

          <Process/>

          <TechStack/>
          <TeamMembers/>
          <div ref={registrationRef} className='overflow-hidden'>
          <Engagement/>
          </div>
          {showBtn && (
        <div className="fixed bottom-[1.4rem] sm:bottom-[1.5rem] right-[50%] sm:right-[50%] z-50">
          <div
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="cursor-pointer rounded-full p-2 flex items-center justify-center bg-[#34bbcf]"
          >
            <ChevronUp className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        </div>
      )}
          <Map/>
          {/* <Events/> */}
          <div className='overflow-hidden'>
          <Gallery/>
          </div>
          <WhyPartner />
          <div className='overflow-hidden'>
            <Testimonials />
          </div>
          <Cta/>
          {/* <Faqs /> */}
          <HifahBlog/>
          <NewsLetter/>
          <div className='overflow-hidden'>
          <Footer/>
          </div>
       
    </div>
  )
}

export default HomePage