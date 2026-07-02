import React from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import Cta from '../../Pages/HomePage/Cta'
import HeroTeam from './HeroTeam'
import TeamMembers from './TeamMembers'
import Positions from './Positions'
import Map from './MapWhite'

const Team = () => {
  return (
    <div>
        <Navbar/>
        <div className='mt-8 sm:mt-18'>
          <HeroTeam/>
        </div>
        <TeamMembers/>
        <Positions/>
        <Cta/>
        <Map/>
        <div className='overflow-hidden'>
            <Footer />
        </div>
    </div>
  )
}

export default Team