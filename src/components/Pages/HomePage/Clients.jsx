import React from 'react'
import { motion } from "framer-motion";
// import p1 from '../../../assets/web-logos/web-logos (1).svg'
// import p2 from '../../../assets/web-logos/web-logos (2).svg'
// import p3 from '../../../assets/web-logos/web-logos (3).svg'
// import p4 from '../../../assets/web-logos/web-logos (4).svg'
// import p5 from '../../../assets/web-logos/web-logos (5).svg'
// import p6 from '../../../assets/web-logos/web-logos (6).svg'
// import p7 from '../../../assets/web-logos/web-logos (7).svg'
// import p8 from '../../../assets/web-logos/web-logos (8).svg'
// import p9 from '../../../assets/web-logos/web-logos (9).svg'
// import p10 from '../../../assets/web-logos/web-logos (10).svg'
// import p11 from '../../../assets/web-logos/web-logos (11).svg'
// import p12 from '../../../assets/web-logos/web-logos (12).svg'
// import p13 from '../../../assets/web-logos/web-logos (13).svg'
// import p14 from '../../../assets/web-logos/web-logos (14).svg'
// import p15 from '../../../assets/web-logos/spec.svg'
import p1 from '../../../assets/icons/logo-white/white (1).svg'
import p2 from '../../../assets/icons/logo-white/white (2).svg'
import p3 from '../../../assets/icons/logo-white/white (3).svg'
import p4 from '../../../assets/icons/logo-white/white (4).svg'
import p5 from '../../../assets/icons/logo-white/white (5).svg'
import p6 from '../../../assets/icons/logo-white/white (6).svg'
import p7 from '../../../assets/icons/logo-white/white (7).svg'
import p8 from '../../../assets/icons/logo-white/white (8).svg'
import p9 from '../../../assets/icons/logo-white/white (9).svg'
import p10 from '../../../assets/icons/logo-white/white (10).svg'
import p11 from '../../../assets/icons/logo-white/white (11).svg'
import p12 from '../../../assets/icons/logo-white/white (12).svg'
import p13 from '../../../assets/icons/logo-white/white (13).svg'
import p14 from '../../../assets/icons/logo-white/white (14).svg'
import p15 from '../../../assets/icons/logo-white/white (15).svg'
import p16 from '../../../assets/icons/logo-white/white (16).svg'
// import p15 from '../../../assets/web-logos/spec.svg'

// app logos
import app1 from '../../../assets/icons/round-logo/round (1).svg'
import app2 from '../../../assets/icons/round-logo/round (2).svg'
import app3 from '../../../assets/icons/round-logo/round (3).svg'
import app4 from '../../../assets/icons/round-logo/round (4).svg'
import app5 from '../../../assets/icons/round-logo/round (5).svg'
import app6 from '../../../assets/icons/round-logo/round (6).svg'
import app7 from '../../../assets/icons/round-logo/round (7).svg'
import app8 from '../../../assets/icons/round-logo/round (8).svg'
import app9 from '../../../assets/icons/round-logo/round (9).svg'
import app10 from '../../../assets/icons/round-logo/round (10).svg'
import app11 from '../../../assets/icons/round-logo/round (11).svg'
import app12 from '../../../assets/icons/round-logo/round (12).svg'
import app13 from '../../../assets/icons/round-logo/round (13).svg'
import app14 from '../../../assets/icons/round-logo/round (14).svg'
// import app14 from '../../../assets/app-logos/AuraVPN.svg'
// import app15 from '../../../assets/app-logos/ANIPARTNA.svg'
// import app16 from '../../../assets/app-logos/asp.svg'
// import app17 from '../../../assets/app-logos/butcher.svg'


const Partners = () => {

  const logos = [ 
     
      // { logo: app14, name: 'big'},
      // { logo: app15, name: 'big'},
      // { logo: app16, name: 'big'},
      // { logo: app17, name: 'big'},
    // 
      { logo: app12, name: 'big'},
      { logo: app8, name: ''},
      { logo: app5, name: 'big'},
      { logo: app1, name: 'big'},
      { logo: app6, name: ''},


      { logo: p3, name: 'field'},
      { logo: p4, name: 'fitme'},
      { logo: p5, name: 'anipa'},
            { logo: p15, name: ''},
      { logo: p16, name: ''},

      { logo: p8, name: 'flaty'},
      { logo: p14, name: 'noly', },
      { logo: p11, name: 'spec'},
      { logo: p2, name: 'field'},

      { logo: p9, name: 'fresh'},
      { logo: p10, name: 'harmon'},
      { logo: p12, name: 'mego'},
      { logo: p13, name: 'mecloset'},

            { logo: p6,name: 'blink'},
      { logo: p7, name: 'blu'},

      { logo: p1, name: 'henbn'},


      { logo: app2, name: 'big'},
      { logo: app3, name: 'big'},
      { logo: app4, name: 'big'},
      { logo: app7, name: 'big'},
      { logo: app9, name: 'big'},
      { logo: app11, name: 'zipzap'},
      { logo: app13, name: 'big'},
      
     
    ]
  
  return (
    <section className='bg-[#121212] px-4 sm:px-15 py-6 mont'>
        <div className='block md:flex justify-between items-center gap-3 item mont'>
            <motion.div 
            initial={{ x: 80, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className='w-full md:w-[35%] mt-2'>
                <h2 className='font-semibold text-white text-xl sm:text-2xl'>Our Clients</h2>
                <p className='font-medium mt-2 mb-2 text-[#FFFFFFE5] text-[13px] lg:text-base w-full'>We work with leading businesses to build, launch, and grow their digital presence.</p>
            </motion.div>
             <div className="relative overflow-hidden w-full sm:w-[75%] bg-[#121212]">
  
  {/* Left fade */}
  <div className="pointer-events-none absolute left-0 top-0 h-full w-15 sm:w-40 z-10 bg-gradient-to-r from-[#121212] to-transparent" />

  {/* Right fade */}
  <div className="pointer-events-none absolute right-0 top-0 h-full w-15 sm:w-20 z-10 bg-gradient-to-l from-[#121212] to-transparent" />

  <div className="flex gap-10 items-center animate-marquee-hero w-max">
    {[...logos, ...logos].map((l, i) => (
      <div key={i} className="flex-shrink-0">
        <img
          className={`${
            l.name === 'noly' ? 'w-[100px]' 
            : l.name === 'field' ? "w-[80px]" 
            : l.name === 'henbn' ? "w-[100px]" 
            : l.name === 'mecloset' ? "w-[80px]" 
            : l.name === 'sohealth' ? "w-[150px]" 
            : l.name === 'wescale' ? "w-[110px]" 
            : l.name === 'spec' ? "w-[80px]" 
            : l.name === 'fresh' ? "w-[120px]" 
            : l.name === 'harmon' ? "w-[90px]" 
            : l.name === 'blink' ? "w-[90px]" 
            : l.name === 'big' ? "w-[70px]" 
            : l.name === 'zipzap' ? "w-[80px]" 
            : 'w-[100px]'
          }`}
          src={l.logo}
          alt="logo"
        />
      </div>
    ))}
  </div>
</div>
        </div>
    </section>
  )
}

export default Partners