import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, UserPlus } from "lucide-react";

const TeamSection = ({ team, navigate, hifzaKanwal }) => {
  const [page, setPage] = useState(0);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(team.length / itemsPerPage);

  const current = team.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const changePage = (dir) => {
    const next = page + dir;
    if (next >= 0 && next < totalPages) setPage(next);
  };

  return (
    <div className="block sm:flex items-center gap-6 mt-6 sm:mt-14 relative">
      
      {/* CEO */}
      <div className="bg-[#A5D28314] text-center w-full sm:w-[35%] rounded-2xl border border-dashed p-6 border-[#A5D28333]">
        <div className='flex justify-center mx-12'>
              <img className='rounded-sm w-[221px]' src={hifzaKanwal} alt="Hifza Kanwal" />
            </div>
            <p className='font-semibold text-sm sm:text-base text-white mt-4 sm:mt-9'>Hifza Kanwal</p>
            <p className='font-medium text-xs sm:text-base text-[#FFFFFFB2] mt-3'>
              Founder & <br /> Chief Executive Officer
            </p>
            <div className='flex justify-center'>
              <button
                onClick={() => navigate('/hire-developers')}
                className='text-[#A5D283] my-0 sm:my-10 mt-6 bg-[#A5D2831F] border border-[#A5D283] rounded-full py-2 px-5 text-sm sm:text-base font-medium flex items-center gap-4'
              >
                <UserPlus className='w-4 h-4 sm:w-5 sm:h-5' /> Hire any team member
              </button>
            </div>
      </div>

      {/* TEAM */}
      <div className="sm:col-span-2 w-full overflow-hidden">
        
        {/* Cards */}
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-9"
        >
          {current.map((t, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center">
                <img
                  className="rounded-full w-[120px] sm:w-[140px]"
                  src={t.imageUrl}
                  alt={t.name}
                />
              </div>

              <p className="font-semibold text-sm sm:text-base text-white mt-3">
                {t.name} {t.lname}
              </p>

              <p className="text-xs sm:text-sm text-[#FFFFFFB2]">
                {t.role}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
        {/* Controls */}
        {totalPages > 1 && (
          <div className="flex items-center absolute -bottom-0 left-[50%] justify-center gap-3 mt-5">

            {/* Dots */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2 h-2 rounded-full ${
                  i === page ? "bg-white scale-125" : "bg-white/30"
                }`}
              />
            ))}

          </div>
        )}
    </div>
  );
};

export default TeamSection;