import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// ─── Replace with your actual asset imports ───────────────────────────────────
// import blogImg1 from '../../../assets/media/blog1.png'
// import blogImg2 from '../../../assets/media/blog2.png'

const PLACEHOLDER_IMG1 = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
const PLACEHOLDER_IMG2 = 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80'

// ─── Arrow Icon (matches BlogList) ───────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="#53C1CE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SeeAllArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="#53C1CE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─── Related Article Card — exact Figma match ─────────────────────────────────
const RelatedCard = ({ post, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay }}
    viewport={{ once: true }}
    className="flex flex-col group cursor-pointer"
  >
    {/* Image — no border radius, sharp corners, tall height */}
    <div className="relative overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
        style={{ height: '380px' }}
      />
      {/* Dark semi-transparent blur overlay at bottom — white text */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 py-4 flex items-end justify-between"
        style={{
          background: 'linear-gradient(0deg, rgba(30,30,40,0.72) 0%, rgba(30,30,40,0.38) 65%, transparent 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          minHeight: '90px',
        }}
      >
        <div>
          <p className="mont text-white text-sm font-semibold leading-snug">{post.author}</p>
          <p className="mont text-white/75 text-xs mt-0.5">{post.date}</p>
        </div>
        <span className="mont text-white text-sm font-medium">{post.category}</span>
      </div>
    </div>

    {/* Text content below image */}
    <div className="pt-4 flex flex-col gap-2">
      <h3 className="mont text-base sm:text-lg font-bold text-[#1A1A2E] transition-colors duration-200 leading-snug">
        {post.title}
      </h3>
      <p className="text-sm text-[#5A5A72] leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <button className="flex items-center gap-1.5 mt-1 w-fit">
        <span className="mont text-sm font-semibold text-[#53C1CE]">Read post</span>
        <ArrowIcon />
      </button>
    </div>
  </motion.div>
)

// ─── Related Articles Section ─────────────────────────────────────────────────
const RelatedArticles = () => {
  const relatedPosts = [
    {
      id: 1,
      image: PLACEHOLDER_IMG1,
      author: 'Alec Whitten',
      date: '17 Jan 2022',
      category: 'Design',
      title: 'Building your API Stack',
      excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    },
    {
      id: 2,
      image: PLACEHOLDER_IMG2,
      author: 'Alec Whitten',
      date: '17 Jan 2022',
      category: 'Design',
      title: 'Building your API Stack',
      excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    },

     {
      id: 3,
      image: PLACEHOLDER_IMG1,
      author: 'Alec Whitten',
      date: '17 Jan 2022',
      category: 'Design',
      title: 'Building your API Stack',
      excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    },
    {
      id: 4,
      image: PLACEHOLDER_IMG2,
      author: 'Alec Whitten',
      date: '17 Jan 2022',
      category: 'Design',
      title: 'Building your API Stack',
      excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    },
  ]

  const navigate = useNavigate();
  return (
    <div className="w-[90%]  mx-auto py-12 mont">

      {/* ── Section Header Row ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7"
      >
        {/* Left: Title + subtitle */}
        <div>
          <h2 className="mont text-xl sm:text-2xl font-bold text-[#1A1A2E] mb-1">
            Related Articles
          </h2>
          <p className="text-sm sm:text-base font-medium text-[#5A5A72] leading-relaxed max-w-lg">
            Contact our experts today for a free consultation and personalized quote.
            Let's build something great together.
          </p>
        </div>

        {/* Right: See our All Blogs link */}
        <div className="flex-shrink-0 mt-1">
          <button onClick={() => navigate('/blog')} className="flex items-center gap-1.5 group">
            <span className="mont text-sm font-semibold text-[#53C1CE] group-hover:underline underline-offset-2 transition-all duration-200">
              See our All Blogs
            </span>
            <SeeAllArrowIcon />
          </button>
        </div>
      </motion.div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
        {relatedPosts.map((post, idx) => (
          <RelatedCard key={post.id} post={post} delay={idx * 0.13} />
        ))}
      </div>

    </div>
  )
}

export default RelatedArticles