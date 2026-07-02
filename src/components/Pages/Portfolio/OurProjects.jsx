import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';

const OurProjects = () => {
  
    const [projects, setProjects] = useState({})
    const [activeCategory, setActiveCategory] = useState("");

    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.2,    
    });

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const items = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    const [hovered, setHovered] = useState(false)
    const [hoverId, setHoverId] = useState('')

    const groupByCategory = (portfolios) => {
        const grouped = {};
        portfolios.forEach((item) => {
            item.category.forEach((cat) => {
                if (!grouped[cat]) {
                    grouped[cat] = [];
                }
                grouped[cat].push(item);
            });
        });
        return grouped;
    };

    const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';
    const navigate = useNavigate();

    const fetchPortfolios = async () => {
        try {
            const response = await fetch(`${BaseUrl}/get-all-portfolio`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Failed to fetch portfolios');

            const data = await response.json();
            const grouped = groupByCategory(data.portfolios || []);
            setProjects(grouped);

            const firstCategory = Object.keys(grouped)[0];
            setActiveCategory(firstCategory);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    return (
        <div className='py-6 sm:py-16 w-[88%] sm:w-[88%] mx-auto relative'>
            <h2 className="mont text-3xl font-semibold tracking-tight text-center text-[#333] sm:text-[48px]">
                Our Projects!
            </h2>

            {/* Category Tabs */}
            <div className='w-full overflow-x-auto my-4 sm:my-8' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                <div className="flex justify-start sm:justify-center w-max sm:w-full min-w-full px-4 sm:px-0">
                    {Object.keys(projects).map((category) => (
                        <button
                            key={category}
                            className={`whitespace-nowrap px-4 sm:px-11 py-2.5 mr-3 sm:mr-5 text-sm sm:text-base rounded-full font-semibold cursor-pointer capitalize flex-shrink-0 ${
                                activeCategory === category 
                                    ? "text-[#ffffff] bg-[#4AC3D5]" 
                                    : "text-[#333333] border border-[#00000014]"
                            }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className='max-w-6xl mx-auto'>
                <motion.div 
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    {...(isMobile ? { animate: "visible" } : { animate: inView ? "visible" : "hidden" })} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5 mx-auto"
                >
                    {(projects[activeCategory] || []).map((item, index) => (
                        <Link to={`/portfolio/${item._id}`} state={{ item }} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => { setHovered(true); setHoverId(item._id); }}
                                onMouseLeave={() => { setHovered(false); setHoverId(''); }}
                                className="group relative overflow-hidden rounded-lg cursor-pointer"
                            >
                                {/* Professional Aspect Ratio Container - 16:9 */}
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 rounded-lg ${
                                            hovered && hoverId === item._id ? 'scale-110' : ''
                                        }`}
                                    />
                                </div>

                                {/* Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hovered && hoverId === item._id ? 'opacity-100' : ''}`} />

                                {/* Text Content */}
                                <div className={`absolute bottom-4 left-4 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 ${hovered && hoverId === item._id ? 'opacity-100 translate-y-0' : ''}`}>
                                    <h3 className="text-2xl font-semibold mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm mb-2 line-clamp-2">
                                        {item.description.slice(0, 150)}...
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default OurProjects