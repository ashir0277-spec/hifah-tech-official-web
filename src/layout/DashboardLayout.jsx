import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Admin/Sidebar/Sidebar"

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/')
    
      return;
    }
  }, [])
  

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar (hidden on small screens) */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`pl-0 ${sidebarOpen ? "pl-[0px]" : "md:pl-[280px]"} bg-white sm:bg-[#101828] w-full pt-0 sm:pt-4 overflow-hidden`}>
        <main className="overflow-auto">
          <Outlet context={{ toggleSidebar, sidebarOpen }} />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
