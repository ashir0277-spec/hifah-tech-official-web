import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ClipboardCheck, Code2, Codesandbox, MessageCircleCode, Phone, UserPlus2, Users, Wrench, X } from 'lucide-react'
import user from '../../../assets/icons/groupIcon.svg'
// import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import logo from '../../../assets/icons/logo2.svg'

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const [logout, setLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const isCommunicationActive = location.pathname === '/communication';

   
  const fullName = localStorage.getItem('fullName')
  const email = localStorage.getItem('email')
  const profileImage = localStorage.getItem('profileImage') || user;

  const menuItems = [
    // dashbaord
    {
      icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.75 12.75V14.75M9.75 8.75V14.75M13.75 4.75V14.75M5.55 18.75H13.95C15.6302 18.75 16.4702 18.75 17.112 18.423C17.6765 18.1354 18.1354 17.6765 18.423 17.112C18.75 16.4702 18.75 15.6302 18.75 13.95V5.55C18.75 3.86984 18.75 3.02976 18.423 2.38803C18.1354 1.82354 17.6765 1.3646 17.112 1.07698C16.4702 0.75 15.6302 0.75 13.95 0.75H5.55C3.86984 0.75 3.02976 0.75 2.38803 1.07698C1.82354 1.3646 1.3646 1.82354 1.07698 2.38803C0.75 3.02976 0.75 3.86984 0.75 5.55V13.95C0.75 15.6302 0.75 16.4702 1.07698 17.112C1.3646 17.6765 1.82354 18.1354 2.38803 18.423C3.02976 18.75 3.86984 18.75 5.55 18.75Z" stroke="#D0D5DD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  
    ),
      activeIcon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.75 12.75V14.75M9.75 8.75V14.75M13.75 4.75V14.75M5.55 18.75H13.95C15.6302 18.75 16.4702 18.75 17.112 18.423C17.6765 18.1354 18.1354 17.6765 18.423 17.112C18.75 16.4702 18.75 15.6302 18.75 13.95V5.55C18.75 3.86984 18.75 3.02976 18.423 2.38803C18.1354 1.82354 17.6765 1.3646 17.112 1.07698C16.4702 0.75 15.6302 0.75 13.95 0.75H5.55C3.86984 0.75 3.02976 0.75 2.38803 1.07698C1.82354 1.3646 1.3646 1.82354 1.07698 2.38803C0.75 3.02976 0.75 3.86984 0.75 5.55V13.95C0.75 15.6302 0.75 16.4702 1.07698 17.112C1.3646 17.6765 1.82354 18.1354 2.38803 18.423C3.02976 18.75 3.86984 18.75 5.55 18.75Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ),
      label: 'dashboard',
      path: '/admin/dashboard',
    },
    {
      icon: <Code2 color='#D0D5DD'/>,
      activeIcon: <Code2 color='#fff'/>,
      label: 'hire developers',
      path: '/admin/hire-developers',

    },
    {
      icon: <Codesandbox color='#D0D5DD'/>,
      activeIcon: <Codesandbox color='#fff'/>,
      label: 'join as developer',
      path: '/admin/join-as-developer',

    },
    {
      icon: <Phone color='#D0D5DD'/>,
      activeIcon: <Phone color='#fff'/>,
      label: 'contact us',
      path: '/admin/contactus',

    },
    {
      icon: <MessageCircleCode color='#D0D5DD'/>,
      activeIcon: <MessageCircleCode color='#fff'/>,
      label: 'testimonials',
      path: '/admin/testimonials',

    },
    {
      icon: <UserPlus2 color='#D0D5DD'/>,
      activeIcon: <UserPlus2 color='#fff'/>,
      label: 'positions',
      path: '/admin/positions',
    },
    {
      icon: <Users color='#D0D5DD'/>,
      activeIcon: <Users color='#fff'/>,
      label: 'team',
      path: '/admin/team',
    },
    {
      icon: <Wrench color='#D0D5DD'/>,
      activeIcon: <Wrench color='#fff'/>,
      label: 'services',
      path: '/admin/services',
    },
    {
      icon: <UserPlus2 color='#D0D5DD'/>,
      activeIcon: <UserPlus2 color='#fff'/>,
      label: 'portfolio',
      path: '/admin/portfolio',
    },
    {
      icon: <ClipboardCheck color='#D0D5DD'/>,
      activeIcon: <ClipboardCheck color='#fff'/>,
      label: 'blogs',
      path: '/admin/blogs',
    },
    {
      icon: <MessageCircleCode color='#D0D5DD'/>,
      activeIcon: <MessageCircleCode color='#fff'/>,
      label: 'messages',
      path: '/admin/messages',
    },
   
    // app, web, new applications,
  ];


    const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  const clearFcmOnLogout = async () => {
  try {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("teamToken");

    if (!token) return;

    const formData = new FormData();
    formData.append("fcmToken", "");

    // await axios.put(
    //   `${API_URL}/users/updateMyProfile`,
    //   formData,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    console.log("✅ FCM token cleared on logout");
  } catch (error) {
    console.error("❌ Failed to clear FCM token:", error);
  }
};



 const handleLogout = async () => {
  setIsLoading(true);

  await clearFcmOnLogout();

  localStorage.removeItem("token");
  localStorage.removeItem("teamToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("profileImage");
  setIsLoading(false);
  navigate("/admin");
};


  return (
    <>
    {/* for small screen  */}
    {isOpen && (
    <div className='inset-0 bg-[#101828] fixed top-0 left-0 h-full md:w-[35%] sm:w-[35%] w-[70%] z-50 md:hidden' style={{borderRight: '1px solid #E5E7EB'}} 
    variants={sidebarVariants}
    initial={false}
    animate={isOpen ? 'open' : 'closed'}>
      <div className='flex flex-col justify-between h-screen align-space overflow-auto'>
       <div className={`'sidebar-head w-full' ${isCommunicationActive ? 'mt-[5.3rem]' : ''}`}>
          <div className={`flex flex-col overflow-auto gap-2 font-medium text-xs sm:text-sm mx-4 `}>
            <div className='py-[20px] flex w-full items-center justify-between'>
              <p className={`font-medium roboto text-lg text-white`}>Admin</p>
              <X  onClick={toggleSidebar} className='w-5 h-5 text-white' />
          </div>
          {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={() => toggleSidebar()}
            className={({ isActive }) =>
              `link text-xs sm:text-sm p-2 border-box hover-bg-[#0873DB] gap-3 cursor-pointer rounded-md flex items-center w-full ${isActive ? 'bg-[#01b2ee] text-[#fff]' : 'text-[#D0D5DD]'}`
            }
            style={{ minHeight: '40px' }} // optional: consistent height
          >
            {({ isActive }) => (
                      <>
                      
                        {/* Show activeIcon when active, else normal icon */}
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          {isActive ? item.activeIcon : item.icon}
                        </span>

                        <p
                          className={ `link-label text-xs sm:text-sm capitalize transition-all duration-300 ease `}
                        >
                          {item.label}
                        </p>
                      </>
            )}
          </NavLink>
          ))}
          </div>
        </div>
      <div className='sidebar-bottom mb-[1rem]'>
         <div to='#' style={{padding: '5px'}} className={({ isActive }) =>
            `link text-[#D0D5DD] p-2.5 justify-between border-box cursor-pointer w-full flex items-center ${isActive ? 'active' : ''}`
          }>
            {isLoading ? (
              <div className='flex items-center gap-4'>
              </div>
            ) : (
                <div className="w-full border-t border-[#475467]">
              <div className='user-details flex gap-2 justify-between w-full items-center pt-3'>
                <div className='flex gap-2 w-full items-center'>
                <img className='w-[35px] h-[35px] rounded-full' src={profileImage || user} alt="user profile"/>
                <div className='user-info'>
                  <p className={`'user-name font-medium text-[#F2F4F7] inter text-xs sm:text-sm'`} >Hifza Kanwal</p>
                  <p className={`text-[#F2F4F7B2] inter text-xs font-regular break-all`}>{email}</p>
                </div>
                </div>
                {/* logout link  */}
        <div onClick={() => {toggleSidebar();setLogout(true)}} style={{padding: '10px'}} className={({ isActive }) =>
            `w-full flex items-center cursor-pointer ${isActive ? 'active' : ''}`
          }>
          <div className='flex hover:text-red-500 rounded-[8px] py-2 items-center logout cursor-pointer'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5M7.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H7.5" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
              </div> 
              </div>
            )}
        </div>
      </div>
      </div>
    </div>
    )}
     {isOpen && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-[2px] bg-transparent z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
    {/* for desktop */}
    <div
    
      className={`sidebar bg-[#101828] poppins w-[280px] h-screen fixed z-10 ${isOpen ? '-left-100' : 'left-0'} top-0 inset-0 hidden md:block justify-between transition-all duration-300`}
    >
      <div style={{scrollbarWidth: 'none'}} className='flex flex-col justify-between inter h-screen align-space overflow-auto'>
        <div className={`'sidebar-head w-full' ${isCommunicationActive ? 'mt-[5.3rem]' : ''}`}>
          <div className={`flex flex-col overflow-auto gap-2 font-medium text-xs sm:text-sm mx-4 `}>
            <div className='py-[20px]'>
              <img src={logo} alt="Logo" className="w-[70%]" />
              {/* <p className={`font-medium roboto text-lg text-white`}>Admin</p> */}
          </div>
          {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `link text-xs sm:text-sm p-2.5 border-box hover:bg-[#192338] gap-3 cursor-pointer rounded-md flex items-center w-full ${isActive ? 'bg-[#32bbcf] text-[#fff]' : 'text-[#D0D5DD]'}`
            }
            style={{ minHeight: '40px' }} // optional: consistent height
          >
            {({ isActive }) => (
                      <>
                      
                        {/* Show activeIcon when active, else normal icon */}
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center" style={{ margin: isCommunicationActive ? "4px" : ""}}>
                          {isActive ? item.activeIcon : item.icon}
                        </span>

                        <p
                          className={ `link-label capitalize transition-all duration-300 ease `}
                        >
                          {item.label}
                        </p>
                      </>
            )}
          </NavLink>
          ))}
          </div>
        </div>
      <div className={` ${isCommunicationActive ? 'pl-[14px]' : 'sidebar-bottom'}  mb-[44px] px-3`}>
         <div style={{padding: '5px'}} className={({ isActive }) =>
            `link text-[#D0D5DD] p-2.5 justify-between border-box cursor-pointer w-full flex items-center ${isActive ? 'active' : ''}`
          }>
            {isLoading ? (
              <div className='flex items-center gap-4'>
              <Skeleton 
                  width={40} 
                  height={40} 
                  borderRadius={50} 
                  baseColor="#e0e0e0" 
                  highlightColor="#f5f5f5"
              />
              <div>
                <Skeleton 
                  width={140} 
                  height={20} 
                  borderRadius={8} 
                  baseColor="#e0e0e0" 
                  highlightColor="#f5f5f5"
              />
                <Skeleton 
                  width={50} 
                  height={12} 
                  borderRadius={8} 
                  baseColor="#e0e0e0" 
                  highlightColor="#f5f5f5"
                  className='mt-2'
              />
              </div>
              </div>
            ) : (
                <div className="w-full border-t border-[#475467]">
              <div className='user-details flex gap-2 justify-between w-full items-center pt-3'>
                {/* <NavLink to='/profile' className='flex gap-2 w-full items-center'> */}
                <div to='#' className={
            `link text-[#D0D5DD] flex w-full items-center p-2.5 justify-start gap-2 border-box cursor-pointer}`}>
                {/* <img className='w-[35px] h-[35px] rounded-full' src={profileImage || user} alt="user profile"/> */}
                <div className='user-info'>
                  <p className={`'user-name font-medium text-[#F2F4F7] capitalize inter text-xs sm:text-sm'`} >Hifza Kanwal</p>
                  <p className={`text-[#F2F4F7B2] inter text-xs font-regular break-all`}>{email}</p>
                </div>
                </div>
                {/* </NavLink> */}
                {/* logout link  */}
        <div  onClick={() => setLogout(true)} style={{padding: '10px'}} className={({ isActive }) =>
            `w-full flex items-center cursor-pointer ${isActive ? 'active' : ''}`
          }>
          <div className='flex hover:text-red-500 rounded-[8px] py-2 items-center logout cursor-pointer'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5M7.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H7.5" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
              </div> 
              </div>
            )}
        </div>
        {/* vv */}
        {/* logout */}
        {logout && (
          <div className="fixed inset-0  bg-[#00000040] bg-opacity-40 flex items-center justify-center" style={{zIndex: '9999'}}>
            <div className=" bg-white p-7 rounded-lg w-full sm:max-w-[561px] shadow-xl">
              <h2 className="mont font-medium text-xl mb-3">Are you sure you want to logout?</h2>
              <p className="font-medium text-[12px] text-[#000000B0] mb-6">
                You can login any time to continue with admin privileges.
              </p>

              <div className="flex justify-end gap-9">
                <button
                  onClick={() => setLogout(false)}
                  className="text-[#333333E5] px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="w-2/6 bg-[#FF383C] text-white pr-[32px] pl-[32px] py-3 rounded cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar