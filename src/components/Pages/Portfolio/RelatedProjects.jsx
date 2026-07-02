import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; 

const FeaturedProjects = ( {relatedProject} ) => {
  let navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,    
  });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const projects = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const [hovered, setHovered] = useState(false)
      const [hoverId, setHoverId] = useState('')

  return (
    <div className='mx-auto w-[88%] sm:w-[88%] py-10 sm:py-20'>
      <div className='flex justify-between projects-center'>
        <h2 className="mont text-2xl font-semibold tracking-tight text-[#454648] sm:text-[48px]">Related Projects</h2>

        {/* <div className='flex projects-center gap-4'>
          <div className='bg-[#31BBD0] w-7 h-7 sm:w-9 sm:h-9 rounded-full flex projects-center justify-center cursor-pointer'>
            <ChevronLeft className='text-white w-5 h-5 sm:w-6 sm:h-6' />
          </div>
          <div className='bg-[#31BBD0] w-7 h-7 sm:w-9 sm:h-9 rounded-full flex projects-center justify-center cursor-pointer'>
            <ChevronRight className='text-white w-5 h-5 sm:w-6 sm:h-6' />
          </div>
        </div> */}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4'>
          {relatedProject?.map((project, index) => (
            <div className='cursor-pointer relative'
             onMouseEnter={() => {setHovered(true); setHoverId(project._id)}}
              onMouseLeave={() => {setHovered(false); setHoverId('')}}
           onClick={() => navigate(`/portfolio/${project?._id}`)}

            >
              <motion.img
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true }}
              className='w-full cursor-pointer object-cover h-[260px] sm:h-[350px]'
              src={project?.image}
              alt="project"
              onClick={() => navigate(`/portfolio/${project?._id}`)}
             
            />
            {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 ${hovered && hoverId === project._id ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
    
        {/* Text Content */}
        <div className={`absolute bottom-2 left-2 pl-2 text-white opacity-0 ${hovered && hoverId === project._id ? 'opacity-100' : 'group-hover:opacity-100'} transition-all duration-300  ${hovered && hoverId === project._id ? 'translate-y-0' : 'translate-y-5'}`}>
          <h3 className="text-2xl font-semibold mb-1">
            {project.title}
          </h3>
          <p className="text-sm mb-2">
            {project.description}
          </p>
                {/* Hidden Link for SEO/Accessibility */}
                <a href={project._id} className="absolute inset-0">
                  <span className="sr-only">View {project.title}</span>
                </a>
        </div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default FeaturedProjects