import React, { useState } from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import BlogDetail from './BlogDetails'



function BlogDetailPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="relative roboto">

      {/* ✅ Navbar (same as HomePage) */}
      <Navbar setShowForm={setShowForm} showForm={showForm} />

      {/* ✅ Page Content */}
      <div className="mt-10">
        <BlogDetail />
      </div>

     

      {/* ✅ Footer (same as HomePage) */}
      <div className="overflow-hidden">
        <Footer />
      </div>

    </div>
  )
}

export default BlogDetailPage