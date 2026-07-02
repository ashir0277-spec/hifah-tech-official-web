import React, { useEffect, useState } from 'react'
import grid from '../../../assets/media/grid.svg'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'

const CATEGORIES = ['View all', 'UI/UX', 'Design Systems', 'Development', 'CX', 'Teamwork']

// ─── Blog Card ─────────────────────────────────────────────────────────────
const BlogCard = ({ post, delay = 0 }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true }}
      className="flex flex-col group cursor-pointer"
      onClick={() => navigate(`/blog/${post._id}`, { state: { blog: post } })}
    >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="w-full h-[230px] sm:h-[370px] object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="pt-4 flex flex-col gap-2">
        <p className="mont text-[#333333CC] font-medium text-sm sm:text-lg">{post.date}</p>
        <h3 className="mont text-base sm:text-xl font-semibold text-[#101828] group-hover:text-[#4AC3D5] transition-colors">
          {post.title}
        </h3>
      </div>
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────
const HifahBlog = () => {
  const [activeCategory, setActiveCategory] = useState('View all')
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)

  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api'
  const [blogs, setBlogs] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const [showLink, setShowLink] = useState(true)

  useEffect(() => {
    setShowLink(location.pathname !== '/blog')
  }, [location.pathname])

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setLoading(true)
        const limit = 4
        let page = 1
        let totalPages = 1
        let fetchedAll = []

        while (page <= totalPages) {
          const response = await axios.get(`${BaseUrl}/get-all-blog?page=${page}&limit=${limit}`)
          const processedBlogs = response.data.blogs.map(blog => ({
            ...blog,
            date: new Date(blog.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric',
            }),
          }))
          fetchedAll = [...fetchedAll, ...processedBlogs]
          totalPages = response.data.totalPages
          page += 1
        }

        setBlogs(fetchedAll)
      } catch (err) {
        console.error('Error fetching blogs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAllBlogs()
  }, [])

  const filtered = blogs.filter((p) => {
    const matchesCategory = activeCategory === 'View all' || p.tags?.[0] === activeCategory
    const matchesSearch = p.title.toLowerCase().includes(searchText.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // First 3 blogs used in the hero grid
  const heroBlogs = blogs.slice(0, 3)

  return (
    <div className="w-full mont relative overflow-hidden">
      {!showLink && (
        <>
          {/* ── Hero Section ── */}
          <div className='relative overflow-hidden'>
            <img src={grid} className='absolute top-0 w-full object-cover' alt="grid" />
            <div className='pt-14 w-[88%] mx-auto relative'>

              {/* Centered text */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                viewport={{ once: true }}
                className='text-center relative z-10'
              >
                <p className='text-base sm:text-lg text-[#333] font-semibold mb-1 mt-4'>Our Blog</p>
                <h2 className="mont text-3xl font-semibold tracking-tight text-[#454648] sm:text-[40px] w-[80%] mx-auto">
                  Insights, ideas & inspiration
                </h2>
                <p className="mt-4 text-sm sm:text-base font-medium text-[#00000090] mont w-full sm:w-[47%] mx-auto">
                  Explore our latest articles on design, development, and digital strategy everything you need to stay ahead.
                </p>
              </motion.div>

              {/* Desktop: 3 blog cards */}
              <div className='hidden sm:grid grid-cols-3 gap-5 pt-10 pb-14'>
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className='flex flex-col gap-3'>
                        <Skeleton className='w-full h-[230px] rounded-2xl' />
                        <Skeleton className='h-5 w-3/4' />
                        <Skeleton className='h-4 w-1/2' />
                      </div>
                    ))
                  : heroBlogs.map((post, i) => (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.2 }}
                        viewport={{ once: true }}
                        className='flex flex-col group cursor-pointer'
                        onClick={() => navigate(`/blog/${post._id}`, { state: { blog: post } })}
                      >
                        <div className='rounded-2xl overflow-hidden'>
                          <img
                            src={post.thumbnailUrl}
                            alt={post.title}
                            className='w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500'
                          />
                        </div>
                        <p className='mont text-[#333333CC] font-medium text-sm mt-3'>{post.date}</p>
                        <h3 className='mont text-base font-semibold text-[#101828] mt-1 group-hover:text-[#4AC3D5] transition-colors line-clamp-2'>
                          {post.title}
                        </h3>
                      </motion.div>
                    ))
                }
              </div>

              {/* Mobile: single card swipe */}
              {!loading && heroBlogs.length > 0 && (
                <MobileHeroSlider posts={heroBlogs} navigate={navigate} />
              )}

            </div>
          </div>

          {/* ── Blog Grid Section ── */}
          <div className="w-[90%] mx-auto pb-20 pt-14">

            {/* Categories header + search */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-between w-full items-center gap-4 mb-8"
            >
              <h1 className="mont text-2xl sm:text-[34px] font-semibold text-[#333333] leading-tight">
                Browse By Categories
              </h1>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search blogs"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  className="border border-[#D1D3D5] placeholder:text-[#6B6E79] border-r-0 rounded-l-full px-4 py-2.5 text-sm text-[#374151] focus:outline-none focus:border-[#53C1CE] transition-colors w-full sm:w-80 h-[42px]"
                />
                <button className="mont text-white bg-[#4AC3D5] text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 active:opacity-75 h-[42px] flex items-center -ml-4">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center border-b border-[#E5E7EB] mb-8 overflow-x-auto tabs-scroll"
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`roboto text-[16px] font-medium px-5 py-2 whitespace-nowrap border-b-3 transition-all duration-200 -mb-px
                    ${activeCategory === cat
                      ? 'text-[#4AC3D5] border-[#4AC3D5]'
                      : 'text-[#6B7174] border-transparent hover:text-[#374151]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Blog Grid */}
            {loading && (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className='flex flex-col gap-3'>
                    <Skeleton className='w-full h-[280px] rounded-xl' />
                    <Skeleton className='h-5 w-3/4' />
                    <Skeleton className='h-5 w-1/2' />
                  </div>
                ))}
              </div>
            )}

            {!loading && (
              filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {filtered.map((post, idx) => (
                    <BlogCard key={post._id} post={post} delay={idx * 0.1} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-20">
                  <p className="mont text-base text-[#9CA3AF]">No posts found in this category.</p>
                </div>
              )
            )}

          </div>
        </>
      )}
    </div>
  )
}

// ─── Mobile Hero Slider ────────────────────────────────────────────────────
const MobileHeroSlider = ({ posts, navigate }) => {
  const [idx, setIdx] = useState(0)
  const dragStart = React.useRef(null)

  const onTouchStart = (e) => { dragStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (dragStart.current === null) return
    const diff = dragStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) setIdx((p) => (p + 1) % posts.length)
      else setIdx((p) => (p - 1 + posts.length) % posts.length)
    }
    dragStart.current = null
  }

  const post = posts[idx]

  return (
    <div className='block sm:hidden mt-4 pb-10' onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className='cursor-pointer'
        onClick={() => navigate(`/blog/${post._id}`, { state: { blog: post } })}
      >
        <div className='rounded-2xl overflow-hidden'>
          <img src={post.thumbnailUrl} alt={post.title} className='w-full object-cover rounded-2xl' />
        </div>
        <p className='mont text-[#333333CC] font-medium text-sm mt-3'>{post.date}</p>
        <h3 className='mont text-base font-semibold text-[#101828] mt-1 line-clamp-2'>{post.title}</h3>
      </motion.div>
      <div className='flex justify-center gap-2 mt-4'>
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: idx === i ? 20 : 8, height: 8, borderRadius: 99,
              background: idx === i ? '#31BBD0' : '#00000033',
              border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default HifahBlog