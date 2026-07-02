import React, { useEffect, useState } from 'react'
import location from '../../../assets/icons/location.svg'
import clock from '../../../assets/icons/clock.svg'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useNavigate } from 'react-router-dom'

const Positions = () => {

    const FIELD_COLORS = {
    Design: "text-violet-500",
    "Software Engineering": "text-blue-500",
    Marketing: "text-pink-500",
    Sales: "text-emerald-500",
    HR: "text-amber-500",
    Finance: "text-cyan-500",
    Operations: "text-orange-500",
    Product: "text-indigo-500",
    };
     const [positions, setPositions] = useState([]);
    
      const [loading, setLoading] = useState(false)
    
      useEffect(() => {
      const fetchPositions = async () => {
        try {
            setLoading(true);
          const q = query(
            collection(db, "positions"),
            orderBy("createdAt", "desc")
          );
    
          const snapshot = await getDocs(q);
    
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          setPositions(data);
        } catch (error) {
          console.error("Error fetching positions: ", error);
        } finally {
            setLoading(false);
        }
      };
    
      fetchPositions();
    }, []);
    const navigate = useNavigate();
  return (
    <div className='w-[88%] sm:w-[88%] mx-auto mb-10 sm:mb-26'>
        <p className='text-base sm:text-lg text-[#101828] font-medium mb-3'>Open positions</p>
        <h2 className="mont text-2xl font-semibold tracking-tight text-[#454648] sm:text-4xl">We’re looking for talented people</h2>
        <p className="mt-4 text-base sm:text-xl text-[#333333cc] font-medium w-full sm:w-[63%]">We are looking for talented and passionate individuals ready to grow, innovate, and make an impact with our team.</p>
          {loading && (
            <div className="flex items-center justify-center h-48 text-slate-400">
                <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm sm:text-base">Loading positions...</span>
                </div>
            </div>
            )}
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8'>
            {positions.map((p, id) => (
                <div onClick={() => navigate('/join-as-team')} key={id} className={`cursor-pointer border rounded-xl border-[#ccc] px-6 py-4 sm:py-6`}>
                    <h2 className={`mont text-lg font-semibold tracking-tight text-[#101828] sm:text-xl flex justify-between`}>{p.title} <span className={` text-sm text-end font-semibold rounded-full px-3 py-0.5 sm:text-sm ${FIELD_COLORS[p.field] || "bg-gray-100 text-gray-600"}
                        `}>• {p.field}</span></h2>
                    <p className="mt-4 text-sm sm:text-base font-medium mont text-[#333] sm:text-[#475467]">{p.description}</p>
                    <div className='flex items-center gap-4 mt-4'>
                        <div className='flex items-center gap-2'>
                            <img className='w-4 h-4 sm:w-5 sm:h-5' src={location} alt="" /><span className='mont font-medium text-sm sm:text-base text-[#475467]'>{p.mode}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img className='w-4 h-4 sm:w-5 sm:h-5' src={clock} alt="" /><span className='mont font-medium text-sm sm:text-base text-[#475467]'>{p.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Positions