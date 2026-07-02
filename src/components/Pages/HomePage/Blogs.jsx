import React, { useEffect, useState } from 'react'
import grid from '../../../assets/media/grid.svg'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import arrUp from '../../../assets/icons/arrUp.svg'
import axios from 'axios'


// ─── Placeholder blog images (replace with real imports) ─────────────────────
// import blogImg1 from '../../../assets/media/blog1.png'
// import blogImg2 from '../../../assets/media/blog2.png'
// etc.

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80'
const PLACEHOLDER_IMG2 = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80'
const PLACEHOLDER_IMG3 = 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80'
const PLACEHOLDER_IMG4 = 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&q=80'

const CATEGORIES = ['View all', 'Design', 'Product', 'Development', 'Customer Support', 'Leadership', 'Management', 'Interviews']


// ─── Arrow Icon ───────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="#53C1CE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)



// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ post, delay = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true }}
      className="flex flex-col group cursor-pointer"
      onClick={() => navigate(`/blog/${post._id}`, { state: { blog: post } })}
    >
      {/* ── Image wrapper ──
          Professional aspect-ratio pattern:
          - Outer div holds the ratio via padding-bottom (56.25% = 16:9)
          - img is absolute inset-0 w-full h-full object-cover
          - Never stretches, never has side gaps, works on every screen size
          - overflow-hidden clips the group-hover:scale-105 zoom cleanly
          - The blur overlay is also absolute inside so it stays pinned to the bottom
      -->*/}
      <div className="relative overflow-hidden w-full" style={{ paddingBottom: '62.5%' }}>
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Blur footer — unchanged */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-4 flex items-end justify-between"
          style={{
            background: '#33333333',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            minHeight: '80px',
          }}
        >
          <div>
            <p className="mont text-white text-sm sm:text-base font-semibold">{post.author}</p>
            <p className="mont text-white text-xs sm:text-sm">{post.createdAt.slice(0, 10)}</p>
          </div>
          <span className="mont text-white text-sm sm:text-base font-medium">
            <span className='pr-2'>•</span>{post.tags[0]}
          </span>
        </div>
      </div>

      {/* Text — unchanged */}
      <div className="pt-4 flex flex-col gap-2">
        <h3 className="mont text-xl font-semibold text-[#101828] transition-colors">
          {post.title}
        </h3>

        <p className="mont text-sm sm:text-base font-medium text-[#686C71] line-clamp-2">
          {post.shortDescription}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const HifahBlog = () => {
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

    const [blogs, setBlogs] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
      const fetchAllBlogs = async () => {
        try {
          setLoading(true)
          const limit = 4;
          let page = 1;
          let totalPages = 1;
          let allBlogs = [];
    
          while (page <= totalPages) {
            const response = await axios.get(`${BaseUrl}/get-all-blog?page=${page}&limit=${limit}`, {
              // headers: {
              //   Authorization: `Bearer ${token}`,
              // },
            });
    
            const fetchedBlogs = response.data.blogs.map(blog => ({
              ...blog,
              image: blog.thumbnailUrl,
              date: new Date(blog.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }),
            }));
    
            allBlogs = [...allBlogs, ...fetchedBlogs];
            totalPages = response.data.totalPages;
            page += 1;
          }
    
          setBlogs(allBlogs.slice(0, 4));
        } catch (err) {
          console.error('Error fetching blogs:', err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchAllBlogs();
    }, []);


  return (
    <div className="w-full mont relative overflow-hidden py-20">

      {/* ── Main Content ── */}
      <div className="w-[90%] mx-auto pb-20">

        {/* ── Header Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-row sm:items-start justify-between gap-4 mb-8"
        >
          {/* Left: Title + Subscribe */}
          <div className="flex flex-col gap-4">
            <h1 className="mont text-[28px] sm:text-[34px] font-bold text-[#333333] leading-tight">
              Our Blogs
            </h1>
          </div>

          {/* Right: Tagline */}
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            viewport={{ once: true }}
            className="mont font-semibold text-sm text-[#6B6E79] text-left sm:text-right max-w-xs leading-relaxed mt-1"
          >
            <div onClick={() => navigate('/blog')} className='hidden sm:flex items-center gap-3 cursor-pointer'>
                <p className='text-sm sm:text-base text-[#4AC3D5] font-medium'>View Our All Blogs</p>
                <img src={arrUp} alt="arrow Up" />
            </div>
          </motion.p>
        </motion.div>

        {/* ── Category Tabs — hide all scrollbar & arrow indicators ── */}
        <style>{`
          .tabs-scroll { scrollbar-width: none; -ms-overflow-style: none; }
          .tabs-scroll::-webkit-scrollbar { display: none; }
          .tabs-scroll button { -webkit-appearance: none; appearance: none; }
        `}</style>

        {/* ── Blog Grid ── */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {blogs.map((post, idx) => (
              <BlogCard key={post._id} post={post} delay={idx * 0.12} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="mont text-base text-[#9CA3AF]">No posts in this category yet.</p>
          </div>
        )}

        <div onClick={() => navigate('/blog')} className='flex justify-center sm:hidden mt-6 bg-[#4AC3D5] hover:bg-[#36b1c4] transition-colors duration-250 w-fit sm:w-fit mx-auto px-9 py-2.5 rounded-full items-center gap-3 cursor-pointer'>
          <p className='text-sm sm:text-base text-[#fff] text-center font-medium'>View Our All Blogs</p>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.13243 11.3409C0.389989 8.56076 1.10931 5.47146 3.29039 3.29039C6.54476 0.0360171 11.8211 0.0360171 15.0755 3.29039C18.3299 6.54476 18.3299 11.8211 15.0755 15.0755C12.8944 17.2566 9.80512 17.9759 7.02498 17.2335M11.6831 11.683V6.68303M11.6831 6.68303H6.68306M11.6831 6.68303L3.34957 15.0163" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

    </div>
  )
}

export default HifahBlog