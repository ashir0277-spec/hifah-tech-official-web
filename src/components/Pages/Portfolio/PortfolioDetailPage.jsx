import React from 'react'
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import FeaturedProjects from './RelatedProjects'
import PortfolioDetail from './PortfolioDetail'
import Testimonials from '../HomePage/Testimonials'
import ProjectResultsBar from './ProjectResultsBar'
import SimilarProjectCTA from './SimilarProjectCTA'
import { useLocation } from 'react-router-dom'

const PortfolioDetailPage = () => {
    // const {project} = useLocation().state?.item || {};
    const location = useLocation();
const item = location.state?.item;
    
  
  return (
    
    <div className='relative'>
        <Navbar/>
        <div className='mt-18'>
            <PortfolioDetail project={item} />
        </div>
        
           
        <div className='overflow-hidden'>
            <Footer/>
        </div>
    </div>
  )
}

export default PortfolioDetailPage