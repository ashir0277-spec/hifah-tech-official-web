import React from 'react'
import { motion } from 'framer-motion'
import {ArrowRight, Clock, MailIcon, Phone} from 'lucide-react'
import grid from '../../../assets/media/grid.svg'

const HeroContact = () => {
    const contact = [
        {
            icon: (
            <svg className='w-4 h-4 sm:w-5 sm:h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            ) ,
            title: "Our Address",
            text: "Jadoon Plaza Phase 2, Abbottabad"
        },
        {
            icon: <MailIcon className='w-4 h-4 sm:w-5 sm:h-5 text-white' /> ,
            title: "Our Mailbox",
            text: "services@hifahtechnologies.com"
        },
        {
            icon: <Phone className='w-4 h-4 sm:w-5 sm:h-5 text-white' /> ,
            title: "Phone",
            text: "+92 328 1223062"
        },
        {
            icon: <Clock className='w-4 h-4 sm:w-5 sm:h-5 text-white' /> ,
            title: "Working Hours",
            text: "Mon-Fri, 9am-6pm"
        },
    ]
  return (
    <div className='relative overflow-hidden'>
    <div className='py-4 pt-17 w-[88%] sm:w-[90%] mx-auto relative overflow-hidden'>
        <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        viewport={{ once: true }}
        className=' relative z-10'>
        <h2 className="mont text-3xl font-semibold tracking-tight text-[#333] sm:text-[40px]">Let’s Start a Conversation</h2>
        <p className="mt-4 text-sm sm:text-base font-medium text-[#333333CC] mont w-full sm:w-[70%] lg:w-[42%]">Have a project in mind? Get in touch with Hifah Technology and let’s discuss how we can help bring your ideas to life.</p>
        <div className='mt-3'></div>
        </motion.div>

   
    </div>
    {/* <div className='my-6 mt-2 w-[88%] sm:w-[88%] mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {contact.map((c, id) => (
                <div key={id} className='border border-[#E0E0E0] rounded-[10px] p-4'>
                    <div className='flex items-center bg-[#90C769] text-white justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-[6px]'>{c.icon}</div>
                        <h2 className='mont font-semibold text-[#101828] text-base sm:text-xl mt-3'>{c.title}</h2>
                        <h2 className='mont font-edium text-[#475467] text-sm sm:text-base mt-1'>{c.text}</h2>
                </div>
            ))}
        </div>
    </div> */}
    </div>
  )
}

export default HeroContact