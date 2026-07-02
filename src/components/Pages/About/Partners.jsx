import React from 'react';
// app logos
import app1 from '../../../assets/app-logos/app-logos (1).svg'
import app2 from '../../../assets/app-logos/app-logos (2).svg'
import app3 from '../../../assets/app-logos/app-logos (3).svg'
import app4 from '../../../assets/app-logos/app-logos (4).svg'
import app5 from '../../../assets/app-logos/app-logos (5).svg'
import app7 from '../../../assets/app-logos/app-logos (7).svg'
import app8 from '../../../assets/app-logos/app-logos (8).svg'
import app10 from '../../../assets/app-logos/truck.svg'
import app11 from '../../../assets/app-logos/app-logo (1).svg'
import app12 from '../../../assets/app-logos/app-logo (2).svg'
import app13 from '../../../assets/app-logos/app-logo (3).svg'
import app14 from '../../../assets/app-logos/AuraVPN.svg'
import app15 from '../../../assets/app-logos/ANIPARTNA-black.svg'
import app16 from '../../../assets/app-logos/asp.svg'
import app17 from '../../../assets/app-logos/butcher.svg'

import web1 from '../../../assets/web-logos/web-logos (1).svg'
import web2 from '../../../assets/web-logos/web-logos (2).svg'
import web3 from '../../../assets/web-logos/web-logos (3).svg'
import web4 from '../../../assets/web-logos/web-logos (4).svg'
import web6 from '../../../assets/web-logos/web-logos (6).svg'
import web7 from '../../../assets/web-logos/web-logos (7).svg'
import web8 from '../../../assets/web-logos/web-logos (8).svg'
import web9 from '../../../assets/web-logos/web-logos (9).svg'
import web10 from '../../../assets/web-logos/web-logos (10).svg'
import web11 from '../../../assets/web-logos/web-logos (11).svg'
import web12 from '../../../assets/web-logos/web-logos (12).svg'
import web13 from '../../../assets/web-logos/web-logos (13).svg'
import web14 from '../../../assets/web-logos/web-logos (14).svg'
import web15 from '../../../assets/web-logos/web-logos (15).svg'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Partners = () => {
    const webPartners = [web10, web12, web7, web13, web3, web15, web6, web11, web9, web2, web4, web1, web14, web8];
    const appPartners = [app12, app13, app3, app7, app8, app16, app15, app5, app1, app10, app4, app2, app11, app14, app17];

    const loopWebPartners = [...webPartners, ...webPartners, ...webPartners, ...webPartners, ...webPartners, ...webPartners];
    const loopAppPartners = [...appPartners, ...appPartners, ...appPartners, ...appPartners, ...appPartners, ...appPartners];

    // ✅ Separate ref for each row
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.01 });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.01 });

    // ✅ No staggerChildren — all items animate together instantly
    const container = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0 },
        },
    };

    const items = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <div className='py-6 sm:py-16 mb-9 sm:mb-16 w-full overflow-hidden'>
            <div className='text-center w-[88%] sm:w-[82%] mx-auto'>
                <h2 className="mont text-3xl font-semibold tracking-tight text-[#454648] sm:text-[40px]">
                    Our Clients
                </h2>
                <p className="mt-4 text-sm sm:text-base font-medium text-[#00000090] mont w-full sm:w-[47%] mx-auto">
                    We are proud to serve clients across various industries with trusted and result-driven solutions.
                </p>
            </div>

            {/* Web Partners Marquee */}
            <motion.div
                ref={ref1}
                variants={container}
                initial="hidden"
                animate={inView1 ? "visible" : "hidden"}
                className="flex animate-marquee gap-3 sm:gap-5 mt-8 w-max min-w-[600%] will-change-transform"
            >
                {loopWebPartners.map((p, i) => (
                    <motion.div
                        key={i}
                        variants={items}
                        className="bg-white rounded-[10px] w-[140px] shrink-0 shadow-[0_20px_50px_0_#E3EBFC] flex justify-center py-2 px-2"
                    >
                        <img
                            className="w-[140px] h-auto"
                            src={p}
                            alt="Our Partners"
                            loading="eager"
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* App Partners Marquee */}
            <motion.div
                ref={ref2}
                variants={container}
                initial="hidden"
                animate={inView2 ? "visible" : "hidden"}
                className="flex animate-marquee-reverse gap-3 sm:gap-5 mt-4 w-max min-w-[600%] will-change-transform"
            >
                {loopAppPartners.map((p, i) => (
                    <motion.div
                        key={i}
                        variants={items}
                        className="bg-white rounded-[10px] w-[140px] shrink-0 shadow-[0_20px_50px_0_#E3EBFC] flex justify-center py-2 px-2"
                    >
                        <img
                            className="w-[140px] h-auto"
                            src={p}
                            alt="Our Partners"
                            loading="eager"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default Partners;