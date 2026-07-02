import { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { AlertCircle, Edit, Trash2, Check, Plus, X, Menu } from 'lucide-react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
// import { useAuth } from '../../utils/AuthContext';


const Blogs = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null)

  const { toggleSidebar, sidebarOpen } = useOutletContext();
  const editor = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

  const [loading, setLoading] = useState(false)
  
useEffect(() => {
  const fetchAllBlogs = async () => {
    try {
      setLoading(true)
      const limit = 10;
      let page = 1;
      let totalPages = 1;
      let allBlogs = [];

      while (page <= totalPages) {
        const response = await axios.get(`${BaseUrl}/get-all-blog?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      setBlogs(allBlogs);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      showAlert('Failed to fetch blogs', 'error');
    } finally {
      setLoading(false);
    }
  };

  fetchAllBlogs();
}, [token]);



  const config = {
    readonly: false,
    height: 400,
    toolbar: true,
    spellcheck: true,
    language: 'en',
    toolbarButtonSize: 'medium',
    showCharsCounter: true,
    showWordsCounter: true,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'image', 'link', '|',
      'align', 'undo', 'redo', '|',
      'fullsize'
    ],
    uploader: {
      insertImageAsBase64URI: true
    },
    placeholder: 'Start writing your blog post here...'
  };

  const handleAddNewBlog = () => {
    resetForm();
    setShowEditor(true);
  };

 const handleEditBlog = (blog) => {
  setIsEditing(true);
  setTitle(blog.title);
  setAuthor(blog.author);
  setShortDescription(blog.shortDescription || '');
  setContent(blog.content);
  setTags(blog.tags);
  setThumbnail(null);
  setThumbnailPreview(blog.image);
  setCurrentBlogId(blog._id);
  setShowEditor(true);
};


const handleDeleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/delete-blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.message?.includes('deleted')) {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      showAlert('Blog deleted successfully', 'success');
    } else {
      showAlert('Failed to delete blog', 'error');
    }
  } catch (error) {
    console.error('Delete error:', error);
    showAlert('An error occurred while deleting the blog', 'error');
  }
};



const handleSaveBlog = async () => {
  if (!title.trim() || !author.trim() || !shortDescription.trim() || !content.trim() || (!thumbnail && !thumbnailPreview)) {
    showAlert('All fields including short description and thumbnail are required', 'error');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('shortDescription', shortDescription);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(tags));
    if (thumbnail) formData.append('thumbnail', thumbnail);

    const url = isEditing
      ? `${BaseUrl}/update-blog/${currentBlogId}`
      : `${BaseUrl}/create-blog`;

    const method = isEditing ? 'put' : 'post';

    const response = await axios({
      method,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    const blog = response.data?.blog;

    if (blog) {
      const formattedBlog = {
        ...blog,
        image: blog.thumbnailUrl,
        date: new Date(blog.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      };

      if (isEditing) {
        setBlogs(blogs.map((b) => (b.id === currentBlogId ? formattedBlog : b)));
        showAlert('Blog updated successfully', 'success');
      } else {
        setBlogs([...blogs, formattedBlog]);
        showAlert('Blog created successfully', 'success');
      }

      resetForm();
      setShowEditor(false);
    } else {
      showAlert(`Failed to ${isEditing ? 'update' : 'create'} blog. Please try again.`, 'error');
    }
  } catch (err) {
    console.error(err);
    showAlert(`Error ${isEditing ? 'updating' : 'creating'} blog`, 'error');
  }
};



  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleCancel = () => {
    resetForm();
    setShowEditor(false);
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setShortDescription('');
    setContent('');
    setTags([]);
    setCurrentTag('');
    setCurrentBlogId(null);
    setThumbnail(null);
    setThumbnailPreview('');
    setIsEditing(false);
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  


  

  return (
        <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-4 sm:p-8 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>

      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex-1 overflow-y-auto">
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[20px] lg:text-[32px] halant-bold text-[#1E9994] flex items-center gap-2"><Menu onClick={toggleSidebar} className='w-5 h-5 cursor-pointer' /> Blog Management</h1>
              <button onClick={handleAddNewBlog} className=" cursor-pointer rounded-[50px] text-[14px] sm:text-[18px] flex  gap-2  h-[40px] w-[150px] md:w-[155px] md:h-[48px]  justify-center items-center bg-[linear-gradient(180deg,_#1DBDB7_40%,_#076C68_100%)] text-[white] poppins-regular-italic  transition">
                <Plus size={20} /> New Blog
              </button>
            </div>

            {alert.show && (
              <div className={`mb-4 p-3 rounded-md flex items-center gap-2 ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {alert.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                <span>{alert.message}</span>
              </div>
            )}

            {showEditor && (
              <div className=" p-0 md:p-6  mb-6">
                <h2 className="text-[18px] lg:text-[25px] halant-bold text-[#1E9994] mb-4">{isEditing ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog Title *"
                    className="p-2 border border-[#D8E4FE] h-[54px] rounded-[8px] bg-[#FFFFFF] focus:border-[#1DBDB7] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author *"
                    className="p-2 border border-[#D8E4FE] h-[54px] rounded-[8px] bg-[#FFFFFF] focus:border-[#1DBDB7] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Short Description *"
                    className="p-2 border border-[#D8E4FE] h-[54px] rounded-[8px] bg-[#FFFFFF] focus:border-[#1DBDB7] focus:outline-none"
                  />

                  <div>
                    <label className="block mb-1  text-[14px] poppins-medium-italic text-[#333333CC]">Thumbnail Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="block w-full p-2 border border-[#D8E4FE] h-[54px] rounded-[8px] bg-[#FFFFFF] focus:border-[#1DBDB7] focus:outline-none"
                    />
                    {thumbnailPreview && (
                      <img src={thumbnailPreview} alt="Preview" className="mt-2 h-40 object-cover rounded-md border" />
                    )}
                  </div>

                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                  />

                  <div>
                    <label className="block mb-1 text-[14px] poppins-medium-italic text-[#333333CC]">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag, index) => (
                        <span key={index} className="text-[#4BC4D3] bg-[#4BC4D329] text-xs px-3 py-1 rounded-full flex items-center gap-1">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag)}><X size={12} /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:border-[#1DBDB7] focus:outline-none"
                        placeholder="Add tag"
                      />
                      <button onClick={handleAddTag} className=" cursor-pointer px-4 bg-[linear-gradient(180deg,_#1DBDB7_40%,_#076C68_100%)] text-[white] rounded-[4px]">Add</button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={handleCancel} className=" cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-[linear-gradient(180deg,_#1DBDB7_40%,_#076C68_100%)] hover:text-[white] ">Cancel</button>
                  <button onClick={handleSaveBlog} className=" cursor-pointer px-4 py-2 bg-[linear-gradient(180deg,_#1DBDB7_40%,_#076C68_100%)] hover:bg-[#1E999429] text-[white] rounded-md">
                    {isEditing ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>
            )}

            {loading && (
            <div className="flex items-center justify-center h-48 text-slate-400">
                <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading Blogs...</span>
                </div>
            </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div key={blog._id} className=" overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-70 object-cover aspect-[4/3]" />
                  <div className="p-4">
                  <p className="text-sm text-[#1E9994] poppins-semibold-italic mb-[14px] line-clamp-1 ">{blog.author} • {blog.date}</p>
                    <h3 className="text-lg poppins-medium-italic mb-[0px] line-clamp-1">{blog.title}</h3>
            
                    <p className="text-sm text-[#475467] poppins-regular-italic  line-clamp-2 mb-[23px]">{blog.shortDescription}</p>
                    <div className="flex flex-wrap gap-1 ">
                      {blog.tags.map((tag, i) => (
                        <span key={i} className="text-[14px] bg-[#4BC4D329] text-[#1E9994] px-2 py-1 rounded-[16px]">{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3">
                      <button onClick={() => handleEditBlog(blog)} className=" cursor-pointer text-blue-600 hover:underline flex items-center gap-1"><Edit size={16} /> Edit</button>
                      <button onClick={() => handleDeleteBlog(blog._id)} className="cursor-pointer text-red-600 hover:underline flex items-center gap-1"><Trash2 size={16} /> Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
