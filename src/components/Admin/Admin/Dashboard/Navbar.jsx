import { Home, Users, Briefcase, FileText, Layers, BarChart3, MessageSquare, Calendar, Settings, HelpCircle, LogOut, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '../../../../images/sidebar/logo1-02[1] 1 (1).png'
import team from '../../../../images/sidebar/profile-2user.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../utils/AuthContext';
import { toast } from 'react-toastify';
const SidebarLink = ({ to, icon, label, light = false  }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        group flex items-center px-2 py-2 text-sm text-[18px] poppins-regular-italic  text-[#FFFFFFCC] w-full transition-all duration-200
        ${isActive 
          ? light 
            ? 'bg-[#1E9994] text-white poppins-medium-italic rounded ' 
            : 'bg-[#1E9994] '
          : light 
            ? 'text-indigo-100 hover:bg-[#1E9994] hover:text-white rounded' 
            : 'text-[white] hover:bg-gray-50 hover:text-gray-900 '
        }
      `}
    >
      <div className={`mr-3 ${light ? 'text-[white] group-hover:text-indigo-100 text-[50px]' : 'text-[white] group-hover:text-[white]'}`}>{icon}</div>
      {label}
    </NavLink>
  );
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
const { logout } = useAuth(); // from AuthContext
const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';


const handleSignOut = async () => {
  try {
    await axios.post(`${BaseUrl}/signout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    localStorage.removeItem('token'); // or sessionStorage if you're using that
    toast.success("Logged out successfully!");

    navigate('/login'); // 👈 redirect to login page
  } catch (error) {
    console.error("Logout failed: ", error);
    toast.error("Logout failed");
  }
};

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-40 lg:hidden`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>

        <div className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-[#1B284D] ">
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
          <span className="text-xl font-bold bg-gradient-to-r from-[#4FC4CE] to-[#99CE8A] bg-clip-text text-transparent">Hifah Technologies</span>
            <button className="p-2 text-[white] hover:bg-[#99CE8A] rounded-md" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="px-2 mt-5 space-y-1">
            <SidebarLink to="/" icon={<Home size={20} />} label="Dashboard"  />
            <SidebarLink to="/team" icon={<Users size={20} />} label="Team" />
            <SidebarLink to="/portfolio" icon={<Briefcase size={20} />} label="Portfolio" />
            <SidebarLink to="/blogs" icon={<FileText size={20} />} label="Blogs" />
            <SidebarLink to="/services" icon={<Layers size={20} />} label="Services" />
            <SidebarLink to="/analytics" icon={<BarChart3 size={20} />} label="Analytics" />
            <SidebarLink to="/messages" icon={<MessageSquare size={20} />} label="Messages" />
            <SidebarLink to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
            <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
            <SidebarLink to="/help" icon={<HelpCircle size={20} />} label="Help Center" />
          </div>
          <div className="pt-4 mt-auto border-t border-gray-200 px-4 py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#1E9994] text-white flex items-center justify-center font-medium">AZ</div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">Admin User</div>
                <div className="text-xs font-medium text-white">admin@example.com</div>
              </div>
            </div>
            <button 
            className="cursor-pointer mt-3 flex items-center w-full text-sm font-medium text-[white] hover:bg-gray-100 px-2 py-2 rounded-md"
             onClick={handleSignOut}
            >
             
              <LogOut size={18} className="mr-3 text-[white]" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-[#1B284D] h-screen">
          <div className=" items-center h-16 px-4 mb-20">
            <img src={logo}/>

            <span className="text-xl font-bold bg-gradient-to-r from-[#4FC4CE] to-[#99CE8A] bg-clip-text text-transparent">Hifah Technologies</span>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <SidebarLink to="/" icon={<Home size={20} />} label="Dashboard" light />
            <SidebarLink to="/team" icon={<img src={team}/>} label="Team" light />
            <SidebarLink to="/portfolio" icon={<Briefcase size={20} />} label="Portfolio" light />
            <SidebarLink to="/blogs" icon={<FileText size={20} />} label="Blogs" light />
            <SidebarLink to="/services" icon={<Layers size={20} />} label="Services" light />
            <SidebarLink to="/analytics" icon={<BarChart3 size={20} />} label="Analytics" light />
            <SidebarLink to="/messages" icon={<MessageSquare size={20} />} label="Messages" light />
            <SidebarLink to="/calendar" icon={<Calendar size={20} />} label="Calendar" light />
            <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" light />
            <SidebarLink to="/help" icon={<HelpCircle size={20} />} label="Help Center" light />
          </nav>
          <div className="flex-shrink-0 p-4 border-t border-[#1E9994]">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#1E9994] text-white flex items-center justify-center font-medium">AZ</div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <button 
                className="cursor-pointer flex items-center text-xs font-medium text-indigo-200 hover:text-white"
                onClick={handleSignOut}
                 >
                 
                  <LogOut size={14} className="mr-1 text-indigo-300 hover:text-indigo-100" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
