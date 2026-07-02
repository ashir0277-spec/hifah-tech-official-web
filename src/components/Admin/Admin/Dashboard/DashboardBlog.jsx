import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import arrowright from '../../../../images/dashboard/arrow-right.svg'
import blogsicon from '../../../../images/dashboard/note2.svg'


function DashboardBlog() {
     const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

  const tagColorMap = {
    Finance: 'bg-green-100 text-green-800',
    Research: 'bg-blue-100 text-blue-800',
    Presentation: 'bg-purple-100 text-purple-800',
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/get-all-blog`);
         const sortedMembers = res.data.blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        if (res.data.blogs) {
          setBlogs(res.data.blogs.slice(0, 3)); // only first 3 blogs
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
         <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        {/* <FileText size={20} className="text-green-500 mr-2" /> */}
                        <img src={blogsicon} className='mr-2'/>
                        <h2 className="text-lg poppins-medium-italic text-[#333333] text-nowrap ">Latest Blog Posts</h2>
                      </div>
                      <button className="group flex items-center ml-3 px-4 py-2  text-nowrap md:px-4 md:py-2 text-[16px] font-medium text-[#1E9994] bg-[#1E999414] rounded-[50px] hover:text-white hover:bg-[#1E9994] transition-colors duration-300"onClick={() => navigate('/admin/blogs')}>
                      See all
                      <img
                        src={arrowright}
                        alt="arrow"
                        className="ml-2 w-5 h-5 transition-colors duration-300 group-hover:brightness-0 group-hover:invert"
                      />
                    </button>
                    </div>
                    <div className="px-6 py-4">
                      <div className="space-y-4">
                        {blogs.map((blog) => (
                          <div key={blog._id} className="flex items-start p-3 rounded-lg hover:bg-[#1E9994] transition-colors duration-200 group"style={{border:"1px solid #F2F2F2"}}>
                            <img className="w-16 h-12 rounded object-cover" src={blog.thumbnailUrl} alt={blog.title} />
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 group-hover:text-white">{blog.title}</div>
                              <div className="text-xs text-gray-500 mt-1 group-hover:text-white"> {new Date(blog.createdAt).toLocaleDateString()} • {blog.author}</div>
                              <div className="flex mt-1 space-x-1">
                               {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${tagColorMap[tag] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {tag}
                      </span>
                    ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
    </>
  )
}

export default DashboardBlog