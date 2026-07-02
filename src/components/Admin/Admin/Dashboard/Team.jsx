import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import Header from '../topbar/Topbar';
import Sidebar from './Navbar';
import image1 from '../../../../images/team/profile-pic(9).png';
import image2 from '../../../../images/team/profile-pic(10).png';
import image3 from '../../../../images/team/profile-pic(11).png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import plusicon from '../../../../images/dashboard/Icon.png';
import editicon from '../../../../images/team/user-edit.svg'
import deleteicon from '../../../../images/team/user-minus.svg'
import clendericon from '../../../../images/team/calendar-tick.svg'
import axios from 'axios';
// import { useAuth } from '../../../utils/AuthContext';

// Utility function to crop image
const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous'; // allow cross-origin image cropping
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob); // ✅ return Blob instead of URL
        } else {
          reject(new Error('Canvas is empty'));
        }
      }, 'image/jpeg');
    };
    image.onerror = () => reject(new Error('Image load failed'));
    image.src = imageSrc;
  });
};




function Team() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const [name, setName] = useState('');
  const [lname, setlName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [joiningDate, setJoiningDate] = useState('');
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null)

  const [loading, setLoading] = useState(false)
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppingImage, setCroppingImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCroppingImage(reader.result);
      };
    }
  };

 const handleCropConfirm = async () => {
  try {
    const croppedBlob = await getCroppedImg(croppingImage, croppedAreaPixels);
    setImage(croppedBlob); // ✅ store the Blob
    setCroppingImage(null);
    toast.success("Image cropped successfully!");
  } catch (e) {
    toast.error("Error cropping image");
  }
};


// get all team members from backend
  useEffect(() => {
  fetchTeam();
}, []);

const fetchTeam = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`${BaseUrl}/get-all-member`);
    const sortedMembers = response.data.members.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setTeam(response.data.members); // you should match your backend structure
  } catch (err) {
    toast.error("Failed to fetch team data");
  } finally {
    setLoading(false);
  }
};

const resetForm = () => {
  setName('');
  setlName('');
  setRole('');
  setJoiningDate('');
  setImage('');
  setEditId('');
};

const handleAddOrUpdate = async () => {
  if (!name || !lname || !role || !image || !joiningDate) {
    toast.error("Please fill all fields and crop image.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("lname", lname);
  formData.append("role", role);
  formData.append("joiningDate", joiningDate);
  formData.append("image", image, "cropped.jpg");

  try {
    if (editId) {
      await axios.put(`${BaseUrl}/update-memebr/${editId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success("Team member updated!");
    } else {
      await axios.post(`${BaseUrl}/create-team-member`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success("Team member added!");
    }
  } catch (err) {
    toast.error("Failed to save member");
    return; // ❗ stop if there's an error
  }

  // ✅ Only run if no error happened
  fetchTeam(); 
  resetForm();
};



const handleEdit = (member) => {
  setName(member.name);
  setlName(member.lname || '');
  setRole(member.role);
  setJoiningDate(member.joiningDate?.substring(0, 10) || '');
  setEditId(member._id); // use real MongoDB _id
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this member?");
  if (!confirmDelete) return;

  if (!token) {
    toast.error("No token found. Please login again.");
    return;
  }

  try {
    await axios.delete(`${BaseUrl}/delete-member/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    toast.success("Team member deleted!");
    fetchTeam();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete member");
  }
};




  return (
    <div className="flex h-screen bg-[#F1F5FE]">
      {/* Image Crop Modal */}
      {croppingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[600px] max-w-[90%]">
            <h2 className="text-xl font-bold mb-4">Crop Image</h2>
            <div className="relative h-[400px] mb-4">
              <Cropper
                image={croppingImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex justify-between">
              <input 
                type="range" 
                value={zoom} 
                min={1} 
                max={3} 
                step={0.1} 
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full mr-4"
              />
              <div>
                <button 
                  onClick={() => setCroppingImage(null)} 
                  className="mr-2 px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCropConfirm} 
                  className="px-4 py-2 bg-[#1E9994] text-white rounded"
                >
                  Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <Header setSidebarOpen={setSidebarOpen} />
        <div className=" p-4 md:p-8 w-full mx-auto">
          <h1 className="text-[24px] md:text-[32px] halant-bold  text-[#1E9994]">Managed Team Members!</h1>
          <p className='mb-6 text-[#333333CC] poppins-medium-italic text-[14px]'>Welcome back! Let's take a look at what's new today.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-[14px] text-[#333333CC] poppins-medium-italic mb-1">First Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 h-[54px] border border-[#D8E4FE] bg-[#FFFFFF] rounded-[8px] focus:outline-none focus:ring-[#1E9994] focus:border-[#1E9994] text-sm"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#333333CC] poppins-medium-italic mb-1">Last Name</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setlName(e.target.value)}
                className="w-full px-4 py-2 h-[54px] border border-[#D8E4FE] bg-[#FFFFFF] rounded-[8px] focus:outline-none focus:ring-[#1E9994] focus:border-[#1E9994] text-sm"
                placeholder="Enter last name"
              />
            </div>

            <div className=" flex flex-col justify-between h-full">
              <label className="block text-[14px] text-[#333333CC] poppins-medium-italic mb-1">Upload Image</label>
              <div className="mt-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className=" cursor-pointer w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-5   md:file:py-2 md:file:px-5
                     file:rounded-[50px] file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#1E9994] file:text-white
                     hover:file:bg-[#187873]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] text-[#333333CC] poppins-medium-italic mb-1">User Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 h-[54px] border border-[#D8E4FE] bg-[#FFFFFF] rounded-[8px] focus:outline-none focus:ring-[#1E9994] focus:border-[#1E9994] text-sm"
                placeholder="Enter role (e.g. Developer)"
              />
            </div>

            <div>
              <label className="block text-[14px] text-[#333333CC] poppins-medium-italic mb-1">Joining Date</label>
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full px-4 py-2 h-[54px] border border-[#D8E4FE] bg-[#FFFFFF] rounded-[8px] focus:outline-none focus:ring-[#1E9994] focus:border-[#1E9994] text-sm text-gray-700"
              />
            </div>

            <div className="mt-auto">
              <button
                onClick={handleAddOrUpdate}
                className="bg-[#1E9994] cursor-pointer text-white px-3 py-2  md:px-6 md:py-2 w-[140px] h-[40px]  md:w-[160px] md:h-[44px] flex items-center justify-center rounded-[50px] shadow-md hover:bg-[#187873] transition text-nowrap text-[14px]"
              >
                {editId ? 'Update Member' : 'Add User'}
                <img src={plusicon} alt="icon" className="w-[16px] h-[16px] ml-[10px]" />
              </button>
            </div>
          </div>
          <h1 className='text-[32px] halant-bold text-[#1E9994]'>Team Members</h1>
          <p className='text-[#333333CC] poppins-medium-italic text-[14px]'>Update Team Composition</p>

          {loading && (
            <div className="flex items-center justify-center h-48 text-slate-400">
                <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading Team Members...</span>
                </div>
            </div>
            )}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 justify-center">
            {team.map(member => (
              <div
                key={member.id}
                className="w-full bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
              >
                <div >
                  <img
                  src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-70 object-cover  rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{member.name} {member.lname}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-[12px] text-gray-500 mt-1 mb-2 flex"><img src={clendericon} className='mr-2'/>Joined: {member.joiningDate}</p>
                </div>
                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => handleEdit(member)}
                    className="cursor-pointer text-sm px-3 py-1 text-[#1E9994] flex "
                  >
                    Edit
                    <img src={editicon} className='ml-2'/>
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className=" cursor-pointer text-sm px-3 py-1 flex text-[red]"
                  >
                    Delete
                    <img src={deleteicon} className='ml-2'/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  );
}

export default Team;