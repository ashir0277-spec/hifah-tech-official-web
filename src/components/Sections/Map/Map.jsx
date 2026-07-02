import React, { useState, useEffect, useRef } from 'react'
import map from '../../../assets/images/map.svg'
import pk from '../../../assets/icons/PK.svg'
import jp from '../../../assets/icons/JP.svg'
import us from '../../../assets/icons/US.svg'
import au from '../../../assets/icons/AU.svg'
import { motion } from 'framer-motion'

const Map = () => {
    const locations = [
        {
            flag: pk,
            country: 'Pakistan',
            address: 'Jadoon Plaza Phase 2, Abbottabad',
        },
        {
            flag: jp,
            country: 'Japan',
            address: '8502 Preston Rd. Inglewood, Maine 98380',
        },
        {
            flag: us,
            country: 'United States',
            address: '8502 Preston Rd. Inglewood, Maine 98380',
        },
        {
            flag: au,
            country: 'Australia',
            address: '8502 Preston Rd. Inglewood, Maine 98380',
        },
    ]

    // Single state: which dot is open (null = none)
    const [openDot, setOpenDot] = useState(null)
    const mapRef = useRef(null)

    // Close popup when clicking outside the map container
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mapRef.current && !mapRef.current.contains(e.target)) {
                setOpenDot(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [])

    // Toggle a dot: open it if closed, close if already open
    const handleDotClick = (id, e) => {
        e.stopPropagation() // prevent event from bubbling to map/outside
        setOpenDot(prev => (prev === id ? null : id))
    }

    // For desktop hover: open on enter, close on leave (only if not touch)
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches

    const handleMouseEnter = (id) => {
        if (!isTouchDevice()) {
            setOpenDot(id)
        }
    }

    const handleMouseLeave = () => {
        if (!isTouchDevice()) {
            setOpenDot(null)
        }
    }

    // Dot config: position + tooltip content
    const dots = [
        {
            id: 1,
            posClass: 'absolute top-9 sm:top-26 left-48 sm:left-[35.5%]',
            flag: us,
            city: 'Melbourne, AUS',
            addr: <>100 Smith Street <br />Collingwood VIC 3066 AU</>,
        },
        {
            id: 2,
            posClass: 'absolute top-18 sm:top-42 left-50 sm:left-[35%]',
            flag: us,
            city: 'Melbourne, AUS',
            addr: <>100 Smith Street <br />Collingwood VIC 3066 AU</>,
        },
        {
            id: 3,
            posClass: 'absolute top-24 sm:top-50 left-[60%] sm:left-[46%]',
            flag: pk,
            city: 'Abbottabad, PAK',
            addr: <>Jadoon Plaza<br />Phase 2, Abbottabad</>,
        },
        {
            id: 4,
            posClass: 'absolute bottom-105 sm:bottom-44 right-12 sm:right-[43%]',
            flag: au,
            city: 'Sydney, AU',
            addr: <><span className="hidden sm:inline">100 Smith Street <br />Collingwood VIC 3066 AU</span></>,
        },
    ]

    return (
        <div className='bg-[#091114] py-18 mont'>
            <div className='w-[88%] sm:w-[88%] mx-auto'>
                <p className='text-sm sm:text-lg text-[#A3D183] font-medium mb-3'>International Network</p>
                <h2 className="mont text-2xl font-semibold tracking-tight text-[#fff] sm:text-4xl">Innovation Across the Glob</h2>
                <p className="mt-4 text-sm sm:text-base text-[#FFFFFFB2] w-full sm:w-[47%]">With offices across multiple countries, we deliver global expertise and seamless collaboration. Our international presence ensures faster execution and consistent quality at a global scale.</p>

                <div className="block sm:flex justify-center mt-10 relative" ref={mapRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* Clicking the map image itself closes any open popup */}
                        <img
                            src={map}
                            className='relative w-full sm:w-[90%] sm:h-auto pt-4 sm:pt-0 mb-8 sm:mb-0'
                            alt="map"
                            onClick={() => setOpenDot(null)}
                        />

                        {dots.map((dot) => (
                            <div
                                key={dot.id}
                                className={`${dot.posClass} group flex items-center justify-center`}
                                onClick={(e) => handleDotClick(dot.id, e)}
                                onMouseEnter={() => handleMouseEnter(dot.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#4DE450] opacity-40 animate-ping"></span>
                                <span className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#4DE450] opacity-30 animate-pulse [animation-delay:1.8s]"></span>
                                {/* Inner solid dot */}
                                <span className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4DE450] rounded-full cursor-pointer"></span>

                                {/* Tooltip */}
                                <div
                                    className={`
                                        absolute bottom-10 left-1/2 -translate-x-1/2
                                        bg-[#FFFFFF33] backdrop-blur-[44px] text-[#fff] text-xs
                                        transition-opacity duration-200
                                        whitespace-nowrap rounded-lg px-3 py-4 text-center text-[#344054]
                                        pointer-events-none
                                        ${openDot === dot.id ? 'opacity-100' : 'opacity-0'}
                                    `}
                                >
                                    <div className='flex justify-center'>
                                        <img className='w-5 h-5' src={dot.flag} alt="flag" />
                                    </div>
                                    <p className='text-sm font-semibold mt-2'>{dot.city}</p>
                                    <p className='text-sm font-regular mt-1'>{dot.addr}</p>
                                    <svg className='absolute -bottom-2 left-[45%]' width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.1433 0.000913928C14.0342 0.000913928 14.4804 1.07806 13.8504 1.70802L7.77937 7.7791C7.38885 8.16962 6.75568 8.16962 6.36516 7.7791L0.294097 1.70802C-0.335867 1.07806 0.1103 0.00091435 1.0012 0.00091435L13.1433 0.000913928Z" fill="white" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Addresses div */}
                    <div className='flex flex-col gap-4 pt-5 sm:pt-0 sm:gap-6 text-white'>
                        {locations.map((l, id) => (
                            <div key={id} className='bg-[#FFFFFF14] border border-[#FFFFFF14] rounded-sm p-3 sm:p-4'>
                                <div className='flex items-center gap-2 sm:gap-3'>
                                    <img className='w-4 h-4 sm:w-6 sm:h-6' src={l.flag} alt="flag" />
                                    <p className='text-base sm:text-xl font-semibold'>{l.country}</p>
                                </div>
                                <p className='text-sm mt-1 sm:mt-2.5 sm:text-base font-regular text-[#FFFFFFCC]'>{l.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map