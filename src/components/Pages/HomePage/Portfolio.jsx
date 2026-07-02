import React, {useEffect, useState} from 'react'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import arrUp from '../../../assets/icons/arrUp.svg'

const Portfolio = () => {

     const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,    
    });

    const container = {
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.3,
            },
        },
    };

    const items = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const [projects, setProjects] = useState([])

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const [hovered, setHovered] = useState(false)
  const [hoverId, setHoverId] = useState('')
  
  const [activeCategory, setActiveCategory] = useState("");

  const groupByCategory = (portfolios) => {
    const grouped = {};

    portfolios.forEach((item) => {
      item.category.forEach((cat) => {
        if (!grouped[cat]) {
          grouped[cat] = [];
        }
        if (grouped[cat].length >= 6) return;
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
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch portfolios');
      }

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
    <section className="pt-20 pb-10 mont">
      <div className="mx-auto w-[88%] sm:w-[88%]">
        <div className="mb-6">
          <div className="text-center">
            <p className='text-sm sm:text-lg text-[#4AC3D5] font-semibold mb-2'>Portfolios</p>
            <h2 className="mont text-2xl font-semibold tracking-tight text-[#333] sm:text-[48px]">Some of our works</h2>
          </div>

          {/* ── TAB SCROLL STRIP ──
              - Mobile: scrollable row, clipped to section width
              - Tablet & Desktop: scrollable row with hidden scrollbar, full width centered
              The key fix: remove the w-[130%] hack and use a proper
              overflow-x-auto container that scrolls naturally on all breakpoints.
          */}
          <div
            className="w-full overflow-x-auto my-4 sm:my-7 mt-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            <div className="flex justify-start sm:justify-center w-max sm:w-full min-w-full px-0">
              {Object.keys(projects).map((category) => (
                <button
                  key={category}
                  className={`whitespace-nowrap flex-shrink-0 px-4 sm:px-11 py-2.5 mr-3 sm:mr-5 text-sm sm:text-base rounded-full font-semibold cursor-pointer capitalize ${
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

          {/* ── PORTFOLIO CARDS ──
              Image fix: use aspect-ratio instead of fixed h-[] so the image
              never stretches or crops regardless of the source aspect ratio.
              object-contain keeps the full image visible inside the card.
              A neutral background fills the letterbox area when needed.
          */}
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            {...(isMobile
              ? { animate: "visible" }
              : { animate: inView ? "visible" : "hidden" })}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-7 mt-6 sm:mt-11 mx-auto max-w-6xl"
          >
            {(projects[activeCategory] || []).map((item, index) => (
              <Link to={`/portfolio/${item._id}`} state={{ item }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => { setHovered(true); setHoverId(item._id) }}
                  onMouseLeave={() => { setHovered(false); setHoverId('') }}
                  className="relative cursor-pointer rounded-lg overflow-hidden"
                >
                  {/*
                    Professional aspect-ratio pattern:
                    - Outer div holds the aspect ratio via padding-bottom (56.25% = 16:9)
                    - Inner img is absolute inset-0 w-full h-full object-cover
                    - This guarantees: full width fill, consistent height, zero gaps, no stretch
                    - overflow-hidden on the parent clips the scale-110 hover zoom cleanly
                  */}
                  <div className="relative w-full" style={{ paddingBottom: '62.5%' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                        hovered && hoverId === item._id ? 'scale-110' : ''
                      }`}
                    />
                  </div>

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 ${
                    hovered && hoverId === item._id ? 'opacity-100' : 'group-hover:opacity-100'
                  } transition-opacity duration-300`} />

                  {/* Text Content */}
                  <div className={`absolute bottom-2 left-3 pl-2 text-white opacity-0 ${
                    hovered && hoverId === item._id ? 'opacity-100' : 'group-hover:opacity-100'
                  } transition-all duration-300 ${
                    hovered && hoverId === item._id ? 'translate-y-0' : 'translate-y-5'
                  }`}>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm font-medium mb-2">{item.description.slice(0, 150)}...</p>
                    <a href={item.id} className="absolute inset-0">
                      <span className="sr-only">View {item.title}</span>
                    </a>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        onClick={() => navigate('/portfolio')}
        className='flex bg-[#4AC3D5] hover:bg-[#36b1c4] transition-colors duration-250 w-fit mx-auto px-9 py-2.5 rounded-full items-center justify-center gap-3 cursor-pointer mt-2 sm:mt-14 mb-20'
      >
        <p className='text-sm sm:text-base text-[#fff] font-semibold'>See More Our Portfolio</p>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.13243 11.3409C0.389989 8.56076 1.10931 5.47146 3.29039 3.29039C6.54476 0.0360171 11.8211 0.0360171 15.0755 3.29039C18.3299 6.54476 18.3299 11.8211 15.0755 15.0755C12.8944 17.2566 9.80512 17.9759 7.02498 17.2335M11.6831 11.683V6.68303M11.6831 6.68303H6.68306M11.6831 6.68303L3.34957 15.0163" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}

export default Portfolio