import React from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import JoinasDeveloperForm from './JoinasDeveloperForm'

const JoinasDeveloper = () => {
  return (
    <div>
        <Navbar/>
        <div className='mt-15'>
            <JoinasDeveloperForm/>
        </div>
        <div className="overflow-hidden">
        <Footer />
      </div>
    </div>
  )
}

export default JoinasDeveloper