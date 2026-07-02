import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import deleteicon from '../../../../images/team/user-minus.svg';
import editicon from '../../../../images/team/user-edit.svg'
import axios from 'axios';
// import { useAuth } from '../../utils/AuthContext';
import { useOutletContext } from 'react-router-dom';
import { Menu } from 'lucide-react';



function Service() {
  
    const { toggleSidebar, sidebarOpen } = useOutletContext();
    const [form, setForm] = useState({ title: '', description: '', icon: null, thumbnail: null });
    const [editId, setEditId] = useState(null);
    
    const [loading, setLoading] = useState(false)
    
    const [token, setToken] = useState(localStorage.getItem("adminToken") || null)
    
    const [services, setServices] = useState([]);
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';



useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BaseUrl}/get-all-service`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sortedMembers = res.data.services.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      if (res.data.success) {
        const list = res.data.services;
        setServices(Array.isArray(list) ? list : []);
      }
    } catch (err) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };
  fetchServices();
}, [token]);



 const handleInputChange = (e) => {
  const { name, value, files } = e.target;
  if (files) {
    setForm(prev => ({ ...prev, [name]: files[0] }));
  } else {
    setForm(prev => ({ ...prev, [name]: value }));
  }
};

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { title, description, icon, thumbnail } = form;
  if (!title || !description) { toast.error('All fields are required'); return; }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (icon) formData.append('icon', icon);
  if (thumbnail) formData.append('thumbnail', thumbnail);

  try {
    const url = editId
      ? `${BaseUrl}/update-service/${editId}`
      : `${BaseUrl}/create-service`;
    const method = editId ? 'put' : 'post';

    const res = await axios({
      method,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success) {
      const newService = res.data.service;
      setServices(prev =>
        editId
          ? prev.map(s => (s._id === editId ? newService : s))
          : [...prev, newService]
      );
      toast.success(editId ? 'Service updated' : 'Service created');
      setForm({ title:'', description:'', icon:null, thumbnail:null });
      setEditId(null);
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to save');
  }
};

const handleEdit = (s) => {
  setForm({
    title: s.title,
    description: s.description,
    icon: null,
    thumbnail: null
  });
  setEditId(s._id);
};

const handleDelete = async (_id) => {
  if (!window.confirm('Delete service?')) return;
  try {
    const res = await axios.delete(`${BaseUrl}/delete-service/${_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.data.success) {
      setServices(prev => prev.filter(s => s._id !== _id));
      toast.success('Service deleted');
    }
  } catch {
    toast.error('Failed to delete');
  }
};

  const handleClearForm = () => {
    setForm({ title: '', description: '', icon: null, thumbnail: null });
    setEditId(null);
  };

  return (
        <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-2 sm:p-0 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>

      <div className="flex-1 overflow-y-auto">

        <div className="p-6 w-full mx-auto">
          <div className="bg-[#F1F5FE] p-0 md:p-6 mb-10">
            <h2 className="text-[32px] halant-bold text-[#1E9994] flex items-center gap-2"><Menu onClick={toggleSidebar} className='w-5 h-5 cursor-pointer' /> Services to Our Blogs!</h2>
            <p className="text-[#333333CC] poppins-medium-italic text-[14px] mb-6">Welcome back! Let's take a look at what's new today.</p>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm text-[#333333CC] poppins-medium-italic mb-2">Service Name</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full p-3 border border-[#D8E4FE] bg-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm text-[#333333CC] poppins-medium-italic mb-2">Add Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  rows="4"
                  className="w-full p-3 border border-[#D8E4FE] bg-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Icon Upload */}
              <div className="mb-4">
                <label className="block text-sm text-[#333333CC] poppins-medium-italic mb-2">1. Upload Icon</label>
                <div className="flex items-center p-3 border border-[#D8E4FE] bg-white rounded-lg ">
                  <input
                    type="file"
                    name="icon"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                    id="icon-upload"
                  />
                  <label htmlFor="icon-upload" className="cursor-pointer flex items-center gap-3 text-teal-600 hover:underline">
                    Upload Icon
                  </label>
                  {form.icon && <img src={form.icon} alt="icon preview" className="w-10 h-10 ml-auto object-contain" />}
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="mb-6">
                <label className="block text-sm text-[#333333CC] poppins-medium-italic mb-2">2. Upload Thumbnail (for detail page)</label>
                <div className="flex items-center p-3 border border-[#D8E4FE] bg-white rounded-lg">
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer flex items-center gap-3 text-teal-600 hover:underline">
                    Upload Thumbnail
                  </label>
                  {form.thumbnail && <img src={form.thumbnail} alt="thumbnail preview" className="w-10 h-10 ml-auto object-contain" />}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="cursor-pointer px-6 py-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                >
                  Clear all
                </button>
                <button
                  type="submit"
                  className=" cursor-pointer px-6 py-2 bg-[#1E9994] text-white rounded-full hover:bg-teal-600"
                >
                  {editId !== null ? 'Update Service' : 'Submit Service'}
                </button>
              </div>
            </form>
          </div>

          {/* Display Services */}
          <div className="bg-[#F1F5FE] p-0 md:p-6">
            <h2 className="text-[32px] halant-bold text-[#1E9994] mb-2">See our all service</h2>
            {/* <p className="text-[#333333CC] poppins-medium-italic text-[14px] mb-8">Explore our comprehensive range of services...</p> */}
          {loading && (
            <div className="flex items-center justify-center h-48 text-slate-400">
                <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-base">Loading Services...</span>
                </div>
            </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service._id} className="border bg-white border-gray-200 rounded-[16px] p-4 hover:shadow-md transition" style={{ boxShadow: "0px 2px 16px 0px #0000001F" }}>
                  <div className="flex justify-between items-center mb-3">
                 {service.iconUrl && (
                      <img src={service.iconUrl} alt="icon" className="w-10 h-10 object-contain" />
                    )}
                    {service.thumbnailUrl && (
                      <img src={service.thumbnailUrl} alt="thumbnail" className="w-16 h-10 object-cover rounded-md ml-auto" />
                    )}
                  </div>
                  <h3 className="text-lg text-[#000000] poppins-medium-italic mb-2">{service.title}</h3>
                  <p className="text-sm text-[#4D4D4D] poppins-regular-italic mb-4 line-clamp-3">{service.description}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(service._id)} className=" cursor-pointer text-sm text-red-500 hover:text-red-700 flex items-center">
                      Remove
                      <img src={deleteicon} className='ml-2'/>
                    </button>
                    <button onClick={() => handleEdit(service)} className=" cursor-pointer text-sm text-teal-500 hover:text-teal-700 flex items-center ml-auto">
                      Edit
                       <img src={editicon } className='ml-2'/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Service;
