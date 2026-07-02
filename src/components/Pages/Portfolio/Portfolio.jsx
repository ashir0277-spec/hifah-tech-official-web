import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import HeroPortfolio from './HeroPortfolio'
import OurProjects from './OurProjects'
import TechStack from '../HomePage/TechStack'
import Cta from '../../Sections/CtaWhite/CtaWhite'
import SimilarProjects from './SimilarProjects'
import Process from '../HomePage/Process'
import { ChevronUp } from 'lucide-react'
import Portfoliopage from '../HomePage/NewPortfolio'

const Portfolio = () => {

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
    <div className='relative'>
        <Navbar/>
        <div className='mt-18'>
            <HeroPortfolio />
        </div>
        {/* <OurProjects/> */}
          
                 <Portfoliopage/>


        {/* <div ref={registrationRef}>
        <SimilarProjects/>

        </div> */}
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
        <TechStack/>
        <Process/>
        <Cta/>
        <div className='overflow-hidden'>
            <Footer/>
        </div>
    </div>
  )
}

export default Portfolio