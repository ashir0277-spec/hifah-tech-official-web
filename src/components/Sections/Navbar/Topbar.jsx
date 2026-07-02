import { Mail, PhoneCall } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Topbar = () => {
   const [isHero, setIsHero] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      // const heroHeight = window.innerHeight; // h-screen
      const heroHeight = 100;
      setIsHero(window.scrollY < heroHeight);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    
    <div className={`${ isHero ? "block" : "hidden"}`}>
        <div className='bg-transparent h-[50px] flex gap-4 items-center justify-end pr-10'>
            <p className='text-sm text-white/80 flex items-center gap-2'><PhoneCall className='w-4 h-4' /> +1 (123) 456-7890</p>
            <p className='text-sm text-white/80 flex items-center gap-2'><Mail className='w-4 h-4' /> hifahtechnologiesofficial@gmail.com</p>
            <p className='text-sm text-white/80 flex items-center gap-2'><PhoneCall className='w-4 h-4' /> Jadoon Plaza Phase 2, Abbottabad</p>
        </div>

    </div>
  )
}

export default Topbar