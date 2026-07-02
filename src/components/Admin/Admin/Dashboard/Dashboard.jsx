import { useState } from 'react';
import Sidebar from './Navbar'
// import Header from '../topbar/Topbar';
import reporticon from '../../../../images/sidebar/user-cirlce-add.png'
import  CountCard  from './CountCard'
import DeshboardTeam from './DeashboardTeam';
import DashboardPortfolio from './DashboardPortfolio';
import DashboardServices from './DashboardServices';
import DashboardBlog from './DashboardBlog';
import DashboardRecentactivity from './DashboardRecentactivity';
import { useOutletContext } from 'react-router-dom';
import { Menu } from 'lucide-react';






const  AdminDashboard = ()=> {
  const [activeTab, setActiveTab] = useState('dashboard');

    const { toggleSidebar, sidebarOpen } = useOutletContext();
  
  
  return (

    
    <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-4 sm:p-8 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        {/* <Header setSidebarOpen={setSidebarOpen} /> */}


        
        {/* Main content */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="">
            <div className=" mx-auto w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div >
                <h1 className="text-2xl lg:text-[32px] halant-bold text-[#1E9994] mb-4 sm:mb-0 flex items-center gap-2"><Menu onClick={toggleSidebar} className='w-5 h-5 cursor-pointer' /> Overview!</h1>
                <p className='text-[14px] text-[#333333CC] poppins-medium-italic'>Welcome back! Let’s take a look at what’s new today.</p>

                </div>
              
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1E9994] focus:border-[#1E9994] sm:text-sm rounded-md">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last year</option>
                      <option>All time</option>
                    </select>
                  </div>
                  <button className="flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium text-white bg-[#1E9994] hover:bg-[#1e9995d0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141D38] whitespace-nowrap max-w-full overflow-hidden">
                <span className="truncate">Generate Report</span>
                <img
                  src={reporticon}
                  alt="Report Icon"
                  className="w-5 h-5 ml-2 shrink-0"
                />
              </button>
                </div>
              </div>
            </div>

            <div className="px-4 mx-auto mt-6 max-w-full sm:px-6 lg:px-8">
              <div className="space-y-6">
                {/* Stats cards */}
              <CountCard/>


                
                {/*  Data summaries section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Team Members Section */}
                  <DeshboardTeam/>
                 
                  
                  {/* Portfolio Projects */}
                  <DashboardPortfolio/>
                  
                </div>
                
                {/* Recent blogs and services */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Blog Posts */}
              <DashboardBlog/>
                  
                  {/* Services + Activity */}
                  <div className="space-y-6">
                    {/* Services */}
                    <DashboardServices/>
                  
                    
                    {/* Recent Activity */}
                    <DashboardRecentactivity/>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}






export default AdminDashboard;