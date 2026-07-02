import arrowright from '../../../../images/dashboard/arrow-right.svg'
import serviceicon from '../../../../images/dashboard/box.svg'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DashboardServices() {

      const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/get-all-service`);
        const sortedMembers = res.data.services.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        if (res.data.success) {
          setServices(res.data.services.slice(0, 3)); // Only first 3 services
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-300 hover:shadow-md">
                          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center">
                              {/* <Layers size={20} className="text-orange-500 mr-2" /> */}
                              <img src={serviceicon} className='mr-2'/>
                              <h2 className="text-lg font-medium text-gray-900">Services</h2>
                            </div>
                            <button className="group flex items-center px-4 py-2 text-[16px] font-medium text-[#1E9994] bg-[#1E999414] rounded-[50px] hover:text-white hover:bg-[#1E9994] transition-colors duration-300" onClick={() => navigate('/admin/services')}>
                          Manage
                          <img
                            src={arrowright}
                            alt="arrow"
                            className="ml-2 w-5 h-5 transition-colors duration-300 group-hover:brightness-0 group-hover:invert"
                          />
                        </button>
                          </div>
                          <div className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {services.map((service) => (
                                <div key={service._id} className="flex flex-col items-center p-4 text-center rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 transition-all duration-300">
                                  <div className="p-2 rounded-full bg-indigo-100 mb-3">
                                    <img className="w-8 h-8 rounded" src={service.iconUrl} alt={service.title} />
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
    </>
  )
}

export default DashboardServices