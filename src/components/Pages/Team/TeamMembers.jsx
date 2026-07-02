import React, { useEffect, useState } from 'react'
// import meeting from '../../../assets/media/meeting.jpg'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

let meeting   = 'https://res.cloudinary.com/dfo0yc3wf/image/upload/v1749634385/hifahtechnology/home-images/IMG_5677.webp'

const TeamMembers = () => {
    const descriptions  = [
        {
            description: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit."
        },
        {
            description: "Lead engineering teams at Figma, Pitch, and Protocol Labs."
        },
        {
            description: "Former PM for Linear, Lambda School, and On Deck."
        },
        {
            description: "Former frontend dev for Linear, Coinbase, and Postscript."
        },
        {
            description: "Lead backend dev at Clearbit. Former Clearbit and Loom."
        },
        {
            description: "Founding design team at Figma. Former Pleo, Stripe, and Tile."
        },
        {
            description: "Lead user research for Slack. Contractor for Netflix and Udacity."
        },
        {
            description: "Lead CX at Wealthsimple. Former PagerDuty and Sqreen."
        },
        {
            description: "Lead CX at Wealthsimple. Former PagerDuty and Sqreen."
        },
        {
            description: "Lead CX at Wealthsimple. Former PagerDuty and Sqreen."
        },
    ]
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,    
    });

    const container = {
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.2, // gap between cards
            },
        },
    };

    const items = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

      const [team, setTeamMembers] = useState([])
    
        useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch("https://hifah-technology-official-backend-production.up.railway.app/api/get-all-member");
            const data = await res.json();
           const updatedMembers = data.members
            .slice()
            .reverse()
            .map((member, index) => ({
                ...member,
                // description: descriptions[index]?.description || ""
            }));
            setTeamMembers(updatedMembers);

          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
      }, []);

  return (
    <div className='w-[88%] sm:w-[88%] mx-auto'>
        <motion.div
        //   ref={ref}
        // variants={container}
        // initial="hidden"
        // animate={inView ? "visible" : "hidden"} 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-12'>
            {team.map((t, idx) =>(
                <motion.div
                 initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        viewport={{ once: true }}
                >
                    <img className='w-full h-[250px] sm:h-auto object-cover rounded-lg' src={t.imageUrl} alt={t.name} />
                    <p className='font-semibold mont text-lg mt-1 sm:mt-6 sm:text-xl text-[#101828]'>{t.name} {t.lname}</p>
                    <p className='font-semibold mont text-sm sm:text-base mt-1 sm:mt-3 text-[#4AC3D5]'>{t.role}</p>
                    <p className='font-medium mont text-sm sm:text-base text-[#475467] mt-1 sm:mt-3'>{t.description}</p>
                </motion.div>
            ))}
        </motion.div>
        {/*  */}
        <section className='my-14 sm:my-28'>
        <h2 className="mont text-2xl font-semibold tracking-tight text-[#333] text-center sm:text-[40px] ">We’re looking for talented people</h2>
        <p className="mt-3 text-base sm:text-lg mont font-medium text-[#454648] mont w-full sm:w-[63%] text-center mx-auto">Hifah Technologies is growing fast, and we are always looking for passionate, dynamic, and talented individuals to join our distributed team all around the world.</p>
        <motion.img
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        viewport={{ once: true }}
        className='w-full mt-8 !h-[600px] sm:h-auto object-cover rounded-lg sm:object-center' src={meeting} alt="banner" />

        </section>
    </div>
  )
}

export default TeamMembers