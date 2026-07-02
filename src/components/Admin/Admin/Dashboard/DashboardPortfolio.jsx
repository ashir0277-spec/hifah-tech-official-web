import React, { useEffect, useState } from 'react';
import axios from 'axios';
import portfolioicon from '../../../../images/dashboard/note.svg';
import arrowright from '../../../../images/dashboard/arrow-right.svg';
import { useNavigate } from 'react-router-dom';





function DashboardPortfolio() {

      const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';


 useEffect(() => {
  axios.get(`${BaseUrl}/get-all-portfolio`)
    .then(res => {
      if (res.data.success && Array.isArray(res.data.portfolios)) {
        setProjects(res.data.portfolios);
      }
    })
    .catch(err => console.error("Error fetching portfolio projects:", err));
}, []);



    const tagColorMap = {
  'web app': 'bg-green-100 text-[#1E9994]',
  'Mobile App': 'bg-purple-100 text-purple-800',
  '': 'bg-green-100 text-[#1E9994]',
  'Technologies': 'bg-purple-100 text-purple-800',
  'UI UX Designing': 'bg-indigo-100 text-indigo-800',
  'Management': 'bg-gray-100 text-gray-800',
  'Research': 'bg-pink-100 text-pink-800',
};

  
  return (
        <>

        <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                              <div className="flex items-center">
                                {/* <Briefcase size={20} className="text-[#1E9994] mr-2" /> */}
                                <img src={portfolioicon} className='mr-2'/>
                                <h2 className="text-lg poppins-medium-italic text-[#333333] text-nowrap">Portfolio Projects</h2>
                              </div>
                              <button className="group flex items-center ml-3 px-4 py-2  text-nowrap md:px-4 md:py-2 text-[16px] font-medium text-[#1E9994] bg-[#1E999414] rounded-[50px] hover:text-white hover:bg-[#1E9994] transition-colors duration-300" onClick={() => navigate('/admin/portfolio')}>
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
                                {projects.slice(0,3).map((project) => (
                                  <div key={project._id} className="flex items-start p-3 rounded-lg hover:bg-[#1E9994] transition-colors duration-200 group"style={{border:"1px solid #F2F2F2"}}>
                                    <img className="w-16 h-12 rounded object-cover" src={project.image} alt={project.title} />
                                    <div className="ml-3">
                                      <div className="text-sm font-medium text-gray-900 group-hover:text-white">{project.title}</div>
                                      <div className="text-xs text-gray-500 mt-1 group-hover:text-white">{project.description}</div>
                                      <div className="flex mt-1 space-x-1">
                                         {(project.category || []).map((tag, idx) => (
                                        <span key={idx} className={`text-xs px-3 py-1 rounded-full ${tagColorMap[tag] || 'bg-gray-100 text-gray-800'}`}>
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

export default DashboardPortfolio