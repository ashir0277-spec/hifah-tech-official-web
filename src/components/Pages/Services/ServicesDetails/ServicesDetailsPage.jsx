import React, {useEffect} from 'react'
import Navbar from '../../../Sections/Navbar/Navbar'
import Hero from './Hero'
import Footer from '../../../Sections/Footer/Footer'
import CoreFunctions from './CoreFunctions'
import Tech from './Tech'
import Excellence from './Excellence'
import SimilarProjects from '../../Portfolio/SimilarProjects'
import Testimonials from '../../StaffAugmentation/Testimonials'

import {ServicesData} from '../ServicesData'
import { useParams } from 'react-router-dom'

const ServicesDetailsPage = () => {
    const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})
const { id } = useParams();

const service = ServicesData[id];

useEffect(() => {
    document.title = `${service.hero?.tag} | Hifah Technologies`;
  }, []);


  return (
    <div>
        <Navbar/>
        <Hero hero={service.hero} />
        <div className='mx-auto w-[100%]'>
            <CoreFunctions experties={service.experties} fadeUp={fadeUp}/>
        </div>
        <Tech tools={service.tools} fadeUp={fadeUp} />
        <Excellence points={service?.points} fadeUp={fadeUp} />
        <SimilarProjects fadeUp={fadeUp} />
        <div className='mx-auto w-[90%]'>
        <Testimonials fadeUp={fadeUp} />
        </div>
        <div className='overflow-hidden'>
            <Footer/>
        </div>
    </div>
  )
}

export default ServicesDetailsPage