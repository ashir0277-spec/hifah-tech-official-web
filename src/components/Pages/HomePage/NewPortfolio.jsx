import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// mobile app
import fitme from '../../../assets/mockups2/mockups/fitme.jpeg'
import gbc from '../../../assets/mockups2/mockups/gbc.png'
import rafik from '../../../assets/mockups2/mockups/ABU RAFIK BUTCHER.png'
import AfroNeta from '../../../assets/mockups2/mockups/AfroNeta.png'
import ANIATPNA from '../../../assets/mockups2/mockups/ANIATPNA Mobile App.png'
import zipzap from '../../../assets/mockups2/mockups/Zipzap talk.png'
import aura from '../../../assets/mockups2/mockups/Aura VPN.png'
import BlinkBack from '../../../assets/mockups2/mockups/BlinkBack.png'
import blush from '../../../assets/mockups2/mockups/blush.png'
import BLOCKATIE from '../../../assets/mockups2/mockups/BLOCKATIE.png'
import flaty from '../../../assets/mockups2/mockups/Flaty.pk.png'
import gdrive from '../../../assets/mockups2/mockups/Gdrive Final.png'
import harmon from '../../../assets/mockups2/mockups/Harmonized1.png'
import meCloset from '../../../assets/mockups2/mockups/MeCloset.png'
import mego from '../../../assets/mockups2/mockups/Mego Final.png'
import noly from '../../../assets/mockups2/mockups/Noly.png'
import pakTruck from '../../../assets/mockups2/mockups/PakTRuck.png'
import quickly from '../../../assets/mockups2/mockups/Quickly final mockup.png'
import revealit from '../../../assets/mockups2/mockups/Revealt.png'
import sbp from '../../../assets/mockups2/mockups/Service Booking App.png'
import helth from '../../../assets/mockups2/mockups/So Helthful.png'
import filsx from '../../../assets/mockups2/mockups/filsx.jpg'

// web development
import web1 from '../../../assets/web/web/web (1).png'
import web2 from '../../../assets/web/web/web (2).png'
import web3 from '../../../assets/web/web/web (3).png'
import web4 from '../../../assets/web/web/web (4).png'
import web5 from '../../../assets/web/web/web (5).png'
import web6 from '../../../assets/web/web/web (6).png'
import web7 from '../../../assets/web/web/web (7).png'
import web8 from '../../../assets/web/web/web (8).png'
import web9 from '../../../assets/web/web/Fresh Steps.png'
import web10 from '../../../assets/web/web/web (10).png'
import web11 from '../../../assets/web/web/web (11).png'
import web12 from '../../../assets/web/web/web (12).png'
import web13 from '../../../assets/web/web/web (13).png'
import web14 from '../../../assets/web/web/web (14).png'
import web15 from '../../../assets/web/web/web (15).png'
import web16 from '../../../assets/web/web/web (16).png'
import web17 from '../../../assets/web/web/web (17).png'
import web18 from '../../../assets/web/web/web (18).png'
import web19 from '../../../assets/web/web/web (19).png'
import web20 from '../../../assets/web/web/web (20).png'
import web21 from '../../../assets/web/web/web (21).png'
import flatyweb from '../../../assets/web/web/flaty.png'

import brum from '../../../assets/web/web/brum-mobile.png'
import diamond from '../../../assets/web/web/diamond.png'
import visaera from '../../../assets/web/web/visaera.png'
import techkyo from '../../../assets/web/web/techkyo.png'
import meqr from '../../../assets/web/web/me-qr.png'
import tutor from '../../../assets/web/web/tutor-site.png'
import oxmmarket from '../../../assets/web/web/oxmmarket.png'
import glassgow from '../../../assets/web/web/glasgow-mobile.png'

// Fisher-Yates shuffle — returns a new shuffled array, never mutates the original
const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const Portfoliopage = ({ showMoreButton = true }) => {
    
    const navigate = useNavigate();

    const images = [
    // app 
    fitme, gbc, rafik, AfroNeta, ANIATPNA, 
    aura, BlinkBack, blush, BLOCKATIE, flaty, gdrive,
    harmon, meCloset, mego, noly, pakTruck, quickly,
    revealit, sbp, helth, filsx,
    //web
    web1, web2, web3, web4, web5, web6, web7, web8, web9, 
    web10, web11, web12, web13, web14, web15, web16, web17,
    web18, web19, web20, web21, flatyweb, brum, diamond, visaera, techkyo, meqr, tutor, glassgow, oxmmarket
    ];
     useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

const projects = {
    "Mobile Apps": [
         {
            id: 'gbc',
            image: gbc,
            title: 'GBC',
            description: "GBC connects learners with verified mentors through live sessions and real-time collaboration.",
        },
         {
            id: 'butcher-shop',
            image: rafik,
            title: 'Abu Rafiq Butcher Shop',
            description: "Abu Rafiq Butcher offers food ordering with delivery, pickup, dine-in, and secure payments.",
        },
        {
            id: 'afroneta',
            image: AfroNeta,
            title: 'AfroNeta',
            description: "AfroNeta streamlines users, content, payments, analytics, and community management.",
        },
        {
            id: 'anipartna',
            image: ANIATPNA,
            title: 'Anipartna Mobile App',
            description: "Anipartna lets users buy, sell, and invest in properties through a trusted marketplace.",
        },
        {
            id: 'auravpn',
            image: aura,
            title: 'aura VPN',
            description: "Fast, secure VPN powered by WireGuard and Supabase for private browsing.", 
        },
         {
            id: 'on-the-dot',
            image: sbp,
            title: 'service booking app',
            description: "Simplifies service discovery, booking, scheduling, and business management.", 
        },
        {
            id: 'revealit',
            image: revealit,
            title: 'revealit',
            description: "RevealIt scans products to explain ingredients, allergens, and safety insights.",
        },
        {
            id: 'noly',
            image: noly,
            title: 'noly',
            description: "Noly converts audio into accurate transcripts and concise summaries.",
        },
        {
            id: 'gdrive',
            image: gdrive,
            title: 'GDrive',
            description: "Master the German driving exam with interactive quizzes, videos, and images.",    
        },
        {
            id: 'paktruck',
            image: pakTruck,
            title: 'pak truck',
            description: "Pak Truck simplifies buying, selling, and promoting trucks, buses, and spare parts.",
        },
        {
            id: 'blink-back',
            image: BlinkBack,
            title: 'blink back',
            description: "BlinkBack helps users capture and relive special moments with ease.",
        },
        {
            id: 'flaty',
            image: flaty,
            title: 'Flaty.pk',
            description: "Flaty lets users buy, sell, and explore properties with trusted listings and secure transactions.", 
        },
        {
            id: 'meCloset',
            image: meCloset,
            title: 'Me Closet',
            description: "MeCloset helps users organize outfits, create clothing pairs, and plan looks.", 
        },
         {
    id: "fitme",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783593243/Tanbnil_tlfije.png",
    title: "FitMe - AI Outfit Stylist",
    description: "AI-powered wardrobe app for smart outfit curation, weekly style planning, and personalized fashion recommendations.",
},
        {
    id: 'safe-choice',
    image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782726418/Hand_and_iPhone_16_Pro_gmthdn.png',
    title: 'SafeChoice',
    description: "SafeChoice scans products for health scores, allergen alerts, and smarter choices.",
},
{
    id: 'yazboz',
    image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782726660/YAZBOZ_and_iPhone_16_Pro_om7dvu.png',
    title: 'Yazboz',
    description: "Yazboz tracks Okey scores, live matches, and complete game history with real-time updates.",
},
{
    id: "mego",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783593156/Tanbnil_yoqi3j.png",
    title: "MEGO - Buy & Sell Marketplace",
    description: "Classified marketplace to discover smartphones, automobiles, and properties with verified sellers and real-time chat.",
},
{
    id: "mb-travel",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783669931/MB_Travel_Tanbnil_kyswqf.png",
    title: "MB Travel - Visa & Immigration",
    description: "Smart immigration platform for digital visa applications, secure document uploads, and real-time application tracking worldwide.",
},
    ],

    "UI / UX Design": [
        {
            id: 'gbc',
            image: gbc,
            title: 'GBC',
            description: "GBC connects learners with verified mentors through live, collaborative learning.",
        },
         {
            id: 'butcher-shop',
            image: rafik,
            title: 'Abu Rafiq Butcher Shop',
            description: "Food ordering with delivery, pickup, dine-in, and secure payments.",
        },
         {
            id: "supply-king",
            image: web17,
            title: 'supply king',
            description: "Simplifies bulk ordering, supply management, and reliable order tracking.",
        },
        {
            id: 'afroneta',
            image: AfroNeta,
            title: 'AfroNeta',
            description: "Streamlines users, content, payments, analytics, and community management.",
        },
        {
            id: 'anipartna',
            image: ANIATPNA,
            title: 'Anipartna Mobile App',
            description: "Buy, sell, and invest in properties through a trusted digital marketplace.",
        },
         {
            id: "we-scale-hq",
            image: web20,
            title: 'we scale hq',
            description: "Fix sales leaks, train teams, and scale faster with We Scale HQ.",
        },
        {
            id: 'aura-vpn',
            image: aura,
            title: 'aura VPN',
            description: "A fast and secure VPN with Wire Guard for high-speed browsing and Supabase for reliable data protection.", 
        },
        {
            id: 'flatty',
            image: flaty,
            title: 'Flaty.pk',
            description: "Buy, sell, and explore properties with trusted listings and secure transactions.", 
        },
        {
            id: "ubk-towing",
            image: web18,
            title: 'ubk towing',
            description: "Streamlines transportation with vehicle management, inspections, analytics, and document tracking.",
        },
        {
            id: 'revealit',
            image: revealit,
            title: 'revealit',
            description: "Scan products for ingredients, allergen alerts, and safety insights.",
        },
        {
            id: 'noly',
            image: noly,
            title: 'noly',
            description: "Transform audio into accurate transcripts and smart summaries.",
        },
        {
            id: 'gdrive',
            image: gdrive,
            title: 'GDrive',
            description: "Master the German driving exam with interactive quizzes, videos, and images.",    
        },
        {
            id: "pak-truck",
            image: web14,
            title: 'pak truck',
            description: "Buy, sell, and promote trucks, buses, and spare parts effortlessly.",
        },
        {
            id: 'paktruck',
            image: pakTruck,
            title: 'pak truck',
            description: "Buy, sell, and promote trucks, buses, and spare parts effortlessly.",
        },
        {
            id: 'blink-back',
            image: BlinkBack,
            title: 'blink back',
            description: "Capture and relive special moments through a simple, intuitive experience.",
        },
        {
            id: 'meCloset',
            image: meCloset,
            title: 'Me Closet',
            description: "Organize outfits, create clothing pairs, and plan looks with ease.", 
        },
        {
            id: 'on-the-dot',
            image: sbp,
            title: 'service booking app',
            description: "Simplifies service discovery, booking, scheduling, and business management.", 
        },
        {
    id: "fitme",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783593243/Tanbnil_tlfije.png",
    title: "FitMe - AI Outfit Stylist",
    description: "AI-powered wardrobe app for smart outfit curation, weekly style planning, and personalized fashion recommendations.",
},
    ],
    
    "Web Development": [
        {
            id: "ubk-towing",
            image: web18,
            title: 'ubk towing',
            description: "UBK streamlines transportation with vehicle management, inspections, analytics, and document tracking.",
        },
        {
            id: "flaty-web",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816184/Tanbnil_yujxor.png',
            title: 'Flaty.pk',
            description: "Flaty lets users explore, buy, and sell properties with trusted listings and secure transactions.",
        },
        {
    id: "earning-dashboard",
    image: web3,
    title: 'earning dashboard',
    description: "Monitor revenue, financial performance, and real-time insights through an advanced analytics dashboard.",
},
       {
  id: "pak-truck",
  image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816195/Tanbnil_uurjnc.png',
  title: "Pak Truck",
  description:
    "A responsive logistics website showcasing trucking services, fleet solutions, and business operations.",
},
        {
            id: "supply-king",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816196/Supply_king_kriepq.png',
            title: 'supply king',
            description: "Supply King simplifies bulk ordering, supply management, and order tracking.",
        },
        {
            id: "we-scale-hq",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816247/Tanbnil_aqcabk.png',
            title: 'we scale hq',
            description: "Fix sales leaks, train teams, and scale business growth faster.",
        },
        {
    id: "glasgow-mobile-car-wash",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816188/Tanbnil_fx9cux.png",
    title: "Glasgow Mobile Car Wash Website",
    description: "Book professional mobile car washing and detailing services with ease.",
},
        {
            id: "visaera",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816205/Tanbnil_idqvvd.png',
            title: 'visaera worldwide',
            description: "Access global visa guidance, applications, and travel requirements in one platform.",
        },
        {
    id: "developers-door",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816121/Tanbnil_qtlfyd.png",
    title: "Developers Door",
    description: "A modern platform for developers to learn, showcase projects, and explore careers.",
},
{
    id: "burn-mobile-tyres",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783593329/Tanbnil_nxxbnr.png",
    title: "Burn Mobile Tyres",
    description: "24/7 emergency mobile tyre fitting service across Birmingham with RAC-approved technicians and instant roadside assistance.",
},
{
    id: "specoptics",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783598196/SpecOptic_Tanbnil_glwmq9.png",
    title: "SpecOptics - Premium Eyewear",
    description: "Discover stylish frames, designer brands, and expert eye care through a seamless online optical shopping experience.",
},
{
    id: "mobile-emissions",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783593281/Tanbnil_f0paq7.png",
    title: "Mobile Emissions Testing",
    description: "Certified on-site emission inspections for heavy trucks and commercial fleets with fast 30-minute testing across the GTA.",
},
{
    id: "oxz-market",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783593358/Tanbnil_wvwfgh.png",
    title: "OXZ Market - Forex Trading",
    description: "Advanced online trading platform for global forex, stocks, commodities, and cryptocurrencies with expert analytical tools.",
},
{
    id: "sohagan",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783604502/Tanbnill_k1jaug.png",
    title: "Sohagan - Luxury Jewellery",
    description: "Timeless handcrafted bridal jewellery, premium gold collections, and exclusive custom designs with worldwide insured shipping.",
},
{
    id: "diamond-yarn",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783604550/Tanbnill_yeu6sr.png",
    title: "Diamond Yarn - Premium Yarns",
    description: "Luxury knitting threads, handcrafted needles, curated patterns, and universal fiber accessories for creative crafting needs.",
},
{
    id: "vendcomm",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783604655/Tanbnill_iy8ld7.png",
    title: "VendComm - Event Management",
    description: "Centralize invoices, manage vendor communications, track event timelines, and streamline team coordination on one powerful platform.",
},
{
    id: "vendcomm-dashboard",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1783606330/Tanbnill_yc9bbc.png",
    title: "VendComm Dashboard - Vendor Management",
    description: "Streamline marketing campaigns, track event budgets, assign tasks, and generate digital invoices on a powerful vendor dashboard.",
},
        {
            id: "fieldtrip-link",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816177/Landing_Page_-_Tanbnil_mvc4xv.png',
            title: 'fieldTrip link',
            description: "Simplifying safe, reliable, and efficient school transportation for students.",
        },
       
    ],
};

// load all images
const allImages = Object.values(projects).flat().map(p => p.image);

useEffect(() => {
  allImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, []);

const categoryLabels = {
  "Mobile Apps": {
    mobile: "Mobile",
    desktop: "Mobile Apps"
  },
  "UI / UX Design": {
    mobile: "UI / UX",
    desktop: "UI / UX Design"
  },
  "Web Development": {
    mobile: "Web",
    desktop: "Web Development"
  }
};
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

const getLabel = (category) => {
  return isMobile
    ? categoryLabels[category]?.mobile || category
    : categoryLabels[category]?.desktop || category;
};

const [activeCategory, setActiveCategory] = useState(
  sessionStorage.getItem('activeCategory') || Object.keys(projects)[0]
);

const [showAll, setShowAll] = useState(false);

// ✅ UPDATED - Conditional slice based on showMoreButton
const [displayedProjects, setDisplayedProjects] = useState(() => {
  const startCategory = sessionStorage.getItem('activeCategory') || Object.keys(projects)[0];
  const projectsList = startCategory === "UI / UX Design"
    ? shuffleArray(projects[startCategory])
    : projects[startCategory];
  
  // Agar showMoreButton false hai toh saare projects dikhao, warna sirf 6
  return showMoreButton ? projectsList.slice(0, 6) : projectsList;
});

// Save to sessionStorage whenever activeCategory changes
useEffect(() => {
  sessionStorage.setItem('activeCategory', activeCategory);
}, [activeCategory]);

useEffect(() => {
  const handleUnload = () => sessionStorage.removeItem('activeCategory');
  window.addEventListener('beforeunload', handleUnload);
  return () => window.removeEventListener('beforeunload', handleUnload);
}, []);


  const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0,    
    });

    const hasAnimated = useRef(false);

useEffect(() => {
  if (inView) hasAnimated.current = true;
}, [inView]);

    const container = {
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.3,
            },
        },
    };
    const items = {
        hidden: { y: 60, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

  const zoomIn = {
  hidden: {
    opacity: 0,
    scale: 0.15,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const [hovered, setHovered] = useState(false)
const [hoverId, setHoverId] = useState('')

// Function to handle category change
const handleCategoryChange = (category) => {
  setActiveCategory(category);
  setShowAll(false);
  const projectsList = category === "UI / UX Design"
    ? shuffleArray(projects[category])
    : projects[category];
  
  // ✅ UPDATED - Conditional slice based on showMoreButton
  setDisplayedProjects(showMoreButton ? projectsList.slice(0, 6) : projectsList);
};

// Function to handle Show More - Navigate to Portfolio page
const handleShowMore = () => {
  navigate('/portfolio');
};

  return (
     <section className="  sm:mt-[60px]  bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-4xl mx-auto mb-6">
    <motion.h2
    variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
   className="text-3xl   sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#333]">Our Projects !</motion.h2>
<motion.p
    variants={zoomIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: 0.15 }}
    className="mt-4 leading-[160%] text-sm sm:text-lg text-[#333333CC] w-full max-w-[800px] mx-auto text-center"
>
    We comprehend the challenges faced by our clients and deliver the required results.
    <br />
    To find out how we can assist you as well, look at some of our work!
</motion.p>
    </div>
   <div className='overflow-auto mt-8' style={{scrollbarWidth: 'none'}}>
<div className='flex justify-start sm:justify-center pl-3 sm:pl-0 w-full overflow-auto sm:w-full' style={{scrollbarWidth: 'none'}}>
    <div
    className="relative mb-5 w-fit overflow-auto sm:w-fit flex items-center gap-2 sm:gap-3 poppins">
        {Object.keys(projects).map((category) => (
         <button
  key={category}
  onClick={() => handleCategoryChange(category)}
  className={`relative whitespace-nowrap px-5 py-2 cursor-pointer sm:px-7 sm:py-2.5 capitalize font-medium text-sm sm:text-base rounded-xl border transition-all duration-300
    ${
      activeCategory === category
        ? "bg-[#4DC3D1] border-[#4ac3d5] text-white"
        : "bg-white border-[#E5E7EB] text-[#333333] hover:border-[#4ac3d5]/50"
    }
  `}
>
  {getLabel(category)}
</button>
        ))}
    </div>
    </div>

</div>
    <div>
      {/* cards */}
      <motion.div 
       ref={ref}
    variants={container}
    initial="hidden"
    animate={hasAnimated.current ? "visible" : (inView ? "visible" : "hidden")}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto my-12">
       {displayedProjects.map((item, index) => (
      <Link to={`/portfolio/${item.id}`}
            state={{ category: activeCategory }} 
        >

  <motion.div
    key={index}
    onMouseEnter={() => {setHovered(true); setHoverId(item.id)}}
    onMouseLeave={() => {setHovered(false); setHoverId('')}}
    className="relative rounded-xl overflow-hidden shadow-[0_2px_16px_0_#E3EBFC] hover:shadow-[0_4px_20px_0_#E3EBFC] transition-all duration-300 cursor-pointer "
  >
    <img
      src={item.image}
      alt={item.title}
      className={`w-full h-auto object-contain transition-transform duration-500 ${hovered && hoverId === item.id? 'scale-110' : ''}`}
    />

    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent ${hovered && hoverId === item.id? 'opacity-100' : 'opacity-0 '} transition-opacity duration-300`}></div>

    <div className={`absolute bottom-6 right-16 pl-4 text-white transition-all duration-300  ${hovered && hoverId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
      <h3 className="text-2xl font-semibold mb-1 capitalize">
        {item.title}
      </h3>
      <p className="text-sm mb-2">
        {item.description}
      </p>
            <a href={item.id} className="absolute inset-0">
              <span className="sr-only">View {item.title}</span>
            </a>
    </div>
  </motion.div>
  </Link>
))}
      </motion.div>

      {/* Show More Button - Navigate to Portfolio Page */}
      {showMoreButton && !showAll && displayedProjects.length < projects[activeCategory]?.length && (
        <div className="text-center mt-8 mb-10">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-[#4DC3D1] text-white font-semibold rounded-full hover:bg-[#3a9ba8] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            See More
          </button>
        </div>
      )}
    </div>
    </div>
    </section>
  )
}

export default Portfoliopage