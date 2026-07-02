import Recenticon from '../../../../images/dashboard/story.svg'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardRecentactivity() {
     const [recentActivity, setRecentActivity] = useState([]);
     const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

     useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/get-recent-activity`);
        if (res.data.success) {
          setRecentActivity(res.data.activities);
        }
      } catch (error) {
        console.error('Failed to fetch recent activity:', error);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
<>

  <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow duration-300 hover:shadow-md">
                      <div className="flex items-center px-6 py-4 border-b border-gray-200">
                      <img src={Recenticon} className='mr-2'/>
                        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                      </div>
                      <div className="px-6 py-4">
                        <div className="space-y-3">
                         {[...recentActivity]
                        .sort(() => 0.5 - Math.random()) // Shuffle the array
                        .slice(0, 3) // Pick first 3 after shuffling
                        .map((activity) => (
                            <div key={activity._id} className="flex items-start">
                              <div className="relative mt-1">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                <div className="absolute top-0 bottom-0 left-1 w-px bg-gray-200" style={{ height: "calc(100% + 1rem)" }}></div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm">
                                  <span className="font-medium text-gray-900">{activity.user}</span>
                                  {' '}{activity.action}{' '}
                                  {activity.item && <span className="font-medium text-indigo-600">{activity.item}</span>}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

</>  )
}

export default DashboardRecentactivity