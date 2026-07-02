import React, { useState } from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import HifahBlog from './BlogList'



function Blog() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="relative roboto overflow-hidden">

      {/* ✅ Navbar */}
      <Navbar setShowForm={setShowForm} showForm={showForm} />

    {/* <div className='mt-20 w-[90%] mx-auto mont'>
      <BLogHero/>

    </div> */}
      {/* ✅ Page Content */}
      <div className="mt-10 overflow-hidden">
        <HifahBlog/>
      </div>

      {/* ✅ Footer */}
      <div className="overflow-hidden">
        <Footer />
      </div>

    </div>
  )
}

export default Blog