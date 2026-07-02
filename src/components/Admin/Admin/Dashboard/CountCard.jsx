import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  Briefcase,
  FileText,
  Layers,
} from 'lucide-react';

const CountCard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/get-all-count`);
      if (res.data.success) {
        setSummary(res.data.summary);
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const getAnalyticsData = () => {
    if (!summary) return [];

    return [
      {
        id: 1,
        title: 'Team Members',
        value: summary.teamMembers || 0,
        change: '+0', // You can calculate changes if you have previous data
        trend: 'neutral',
        icon: <Users size={20} className="text-blue-500" />,
      },
      {
        id: 2,
        title: 'Projects',
        value: summary.portfolios || 0,
        change: '+0',
        trend: 'neutral',
        icon: <Briefcase size={20} className="text-purple-500" />,
      },
      {
        id: 3,
        title: 'Blog Posts',
        value: summary.blogs || 0,
        change: '+0',
        trend: 'neutral',
        icon: <FileText size={20} className="text-green-500" />,
      },
      {
        id: 4,
        title: 'Services',
        value: summary.services || 0,
        change: '+0',
        trend: 'neutral',
        icon: <Layers size={20} className="text-orange-500" />,
      },
    ];
  };

  const StatCard = ({ title, value, change, trend, icon }) => {
    return (
      <div className="p-5 bg-white rounded-lg transition-shadow duration-300" style={{ boxShadow: "0px 2px 12px 0px #00000014" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-indigo-50 mr-4">{icon}</div>
            <div>
              <div className="text-[16px] poppins-medium-italic text-[#333333]">{title}</div>
              <div className="mt-1 text-[16px] poppins-semibold-italic text-[#333333CC]">{value}</div>
            </div>
          </div>
          <div className={`flex items-center px-2 py-1 text-sm rounded-full ${
            trend === 'up' ? 'bg-green-100 text-green-800' :
            trend === 'down' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {change}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        <p className="col-span-full text-center text-gray-500">Loading summary...</p>
      ) : (
        getAnalyticsData().map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))
      )}
    </div>
  );
};

export default CountCard;
