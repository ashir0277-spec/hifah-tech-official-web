import React, { useState } from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'

import CareerHero from './CareerHero'
import BuildCareer from './BuildCareer'
import WhyWorkWithUs from './WhyWorkWithUs'
import OpenPositions from './OpenPositions'
import ApplicationProcess from './ApplicationProcess'
import WorkCulture from './WorkCulture'
import Cta from '../HomePage/Cta'
import ResumeBanner from './ResumeBanner'
import Positions from '../Team/Positions'

function Career() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="relative roboto">

      {/* ✅ Navbar (same as HomePage) */}
      <Navbar setShowForm={setShowForm} showForm={showForm} />

      {/* ✅ Page Content */}
      <div className="mt-10">
        <CareerHero />
      </div>

      <BuildCareer />
      <WhyWorkWithUs />
      {/* <OpenPositions /> */}
      <div className='mt-8 sm:mt-22'></div>
        <Positions/>
      <ApplicationProcess />
      <WorkCulture />
      <Cta />
      <ResumeBanner/>

      {/* ✅ Footer (same as HomePage) */}
      <div className="overflow-hidden">
        <Footer />
      </div>

    </div>
  )
}

export default Career