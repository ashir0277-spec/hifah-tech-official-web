import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bg from '../../../assets/career/Rectangle 34626315.png';
import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';

// ─── Assets & Icons (unchanged) ─────────────────────────────────────────────
const HERO_IMG = bg;
const CONTENT_IMG = 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80';
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80';

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 8H3M3 8L7 4M3 8l4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="8" height="8" rx="1.2" stroke="#5A5A72" strokeWidth="1.4"/>
    <path d="M3 10V3a1 1 0 0 1 1-1h7" stroke="#5A5A72" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 2.5c-.5.3-1.1.5-1.7.6a2.9 2.9 0 0 0-5 2v.6A7 7 0 0 1 1.5 3s-2.5 5.5 3 8a7.6 7.6 0 0 1-4.5 1.3c5.5 3 12 0 12-8.5 0-.2 0-.4-.1-.5A5 5 0 0 0 13.5 2.5z" stroke="#5A5A72" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2H8a2.5 2.5 0 0 0-2.5 2.5V6H4v2.5h1.5V13H8.5V8.5H10L10.5 6H8.5V4.5A.5.5 0 0 1 9 4h1.5V2z" stroke="#5A5A72" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="12" height="12" rx="2" stroke="#5A5A72" strokeWidth="1.3"/>
    <path d="M5 6.5V10.5" stroke="#5A5A72" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="5" cy="4.5" r=".6" fill="#5A5A72"/>
    <path d="M7.5 10.5V8.5a1.5 1.5 0 0 1 3 0v2" stroke="#5A5A72" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 6.5v4" stroke="#5A5A72" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

// Skeleton Loader Component
const BlogSkeleton = () => (
  <div className="w-full min-h-screen bg-white mont">
    <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[600px] bg-gray-200 animate-pulse" />
    
    <div className="w-[90%] sm:w-[80%] mx-auto sm:-mt-35 relative z-10">
      <div className="bg-white rounded-t-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] px-6 sm:px-10 py-8 sm:py-10">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" 
                 style={{ width: i % 3 === 0 ? '95%' : i % 3 === 1 ? '85%' : '70%' }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://hifah-technology-official-backend-production.up.railway.app/api/get-single-blog/${id}`
        );
        if (!res.ok) throw new Error('Failed to fetch blog');
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Social Share Handlers ───────────────────────────────────────────────
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog?.title || 'Check out this blog post');

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      '_blank',
      'noopener,noreferrer,width=600,height=400'
    );
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      '_blank',
      'noopener,noreferrer,width=600,height=400'
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer,width=600,height=500'
    );
  };
  // ────────────────────────────────────────────────────────────────────────

  if (loading) return <BlogSkeleton />;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center py-20">Blog not found</div>;

  return (
    <>
      <div className="w-full min-h-screen bg-white mont">
        {/* HERO SECTION */}
        <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[600px] overflow-hidden">
          <img
            src={blog.thumbnailUrl || HERO_IMG}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)' }}
          />

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute sm:bottom-39 text-white bg-[#53c1ce] rounded-full px-4 py-2 left-5 sm:left-40 hidden sm:flex items-center gap-2 group"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon />
            <span className="mont text-sm sm:text-base font-medium group-hover:underline underline-offset-2">
              Back to Blogs
            </span>
          </motion.button>
        </div>

        {/* CONTENT CARD */}
        <div className="w-[90%] sm:w-[80%] mont mx-auto sm:-mt-35 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="bg-[#FFFFFF] rounded-t-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] px-6 sm:px-10 py-8 sm:py-10"
          >
            <h1 className="mont text-[20px] sm:text-4xl font-bold text-[#1A1A2E] leading-tight mb-6">
              {blog.title}
            </h1>

            <p className="text-sm sm:text-[17px] font-medium text-[#333333cc] leading-relaxed mb-8" 
               dangerouslySetInnerHTML={{ __html: blog.content }} />
          </motion.div>

          {/* AUTHOR + SHARE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="mt-0 bg-[#FFFFFF] px-6 sm:px-10 py-5 rounded-b-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="mont text-sm font-bold text-[#1A1A2E] leading-snug">{blog.author}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Content Writer</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy} 
                className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-2 hover:bg-[#F8FAFB] transition-colors duration-200"
              >
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <CopyIcon />} 
                <span className="mont text-xs font-medium text-[#5A5A72]">
                  {copied ? 'Copied!' : 'Copy link'}
                </span>
              </button>

              <button
                onClick={handleTwitterShare}
                title="Share on X (Twitter)"
                className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg hover:bg-[#F8FAFB] transition-colors duration-200"
              >
                <TwitterIcon />
              </button>
              <button
                onClick={handleFacebookShare}
                title="Share on Facebook"
                className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg hover:bg-[#F8FAFB] transition-colors duration-200"
              >
                <FacebookIcon />
              </button>
              <button
                onClick={handleLinkedInShare}
                title="Share on LinkedIn"
                className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg hover:bg-[#F8FAFB] transition-colors duration-200"
              >
                <LinkedInIcon />
              </button>
            </div>
          </motion.div>

          <div className="h-8 sm:h-16" />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;