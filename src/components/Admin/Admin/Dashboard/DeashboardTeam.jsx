import teamicon from '../../../../images/dashboard/profile-2user.svg'
import arrowright from '../../../../images/dashboard/arrow-right.svg'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





const DeshboardTeam = ()=>{

      const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';


    const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/get-all-member`);
      const sortedMembers = res.data.members.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      if (res.data.success) {
        setTeamData(res.data.members);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchTeamMembers();
  }, []);
  
 
    return(
        <>
           <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-300 hover:shadow-md">
                              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center">
                                  {/* <Users size={20} className="text-[#1E9994] mr-2" /> */}
                                  <img src={teamicon} className='mr-2'/>
                                  <h2 className="text-lg poppins-medium-italic text-[#333333] ">Team Members</h2>
                                </div>
                                <button className="group flex items-center text-nowrap ml-3 px-3 py-2 sm:px-4 sm:py-2 text-[16px] font-medium text-[#1E9994] bg-[#1E999414] rounded-[50px] hover:text-white hover:bg-[#1E9994] transition-colors duration-300"      onClick={() => navigate('/admin/team')}>
                                See all
                                <img
                                  src={arrowright}
                                  alt="arrow"
                                  className="ml-2 w-5 h-5 transition-colors duration-300 group-hover:brightness-0 group-hover:invert"
                                />
                              </button>
                              </div>
                              <div className="px-6 py-4">

                                  {loading ? (
                                <div className="text-center text-gray-400 text-sm">Loading team members...</div>
                                ) : (
                                <div className="grid grid-cols-2 gap-4">
                                  {teamData.slice(0,8).map((member) => (
                                  <div
                                  key={member._id}
                                  className="flex flex-col sm:flex-row items-center p-3 rounded-lg hover:bg-[#1E9994] transition-colors duration-200 group"
                                  style={{ border: "1px solid #F2F2F2" }}
                                >
                                  <img className="w-10 h-10 rounded-full" src={member.imageUrl} alt={member.name} />
                                  
                                  <div className="mt-2 sm:mt-0 sm:ml-3 text-center sm:text-left">
                                    <div className="text-[12px] poppins-medium-italic text-black group-hover:text-white">{member.name} {member.lname}</div>
                                    <div className="text-xs text-gray-500 group-hover:text-white">{member.role}</div>
                                  </div>
                                </div>
                                  ))}
                                </div>
                                )}
                              </div>
                            </div>
        </>
    )
}

export default DeshboardTeam;