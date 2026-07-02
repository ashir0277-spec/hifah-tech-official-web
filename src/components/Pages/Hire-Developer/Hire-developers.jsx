import React, { useState } from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import HireADeveloperForm from './HireADeveloperForm'

function HireDevelopers() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="relative roboto">

      {/* ✅ Navbar (same as Home Page & Career Page) */}
      <Navbar setShowForm={setShowForm} showForm={showForm} />

      {/* ✅ Page Content */}
      <div className="mt-4 sm:mt-15">
        <HireADeveloperForm />
      </div>

      {/* ✅ Footer */}
      <div className="overflow-hidden">
        <Footer />
      </div>

    </div>
  )
}

export default HireDevelopers