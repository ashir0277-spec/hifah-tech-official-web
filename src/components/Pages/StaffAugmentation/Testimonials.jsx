import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import TestimonialSlider from './TestimonialSlider';
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from '../../../firebase';

const Testimonials = () => {

  const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
})
    const testimonials2 = [
        {
            id: 1,
            stars: 5,
            quote:
            "We were struggling to find quality React developers for months. Developer Door matched us with DevSquad in 48 hours. The project was delivered ahead of schedule.",
            name: "Sarah Jenkins",
            title: "CTO, FinTech Global",
            avatar: "https://i.pravatar.cc/150?img=47",
        },
        {
            id: 2,
            stars: 4,
            quote:
            "The quality of developers we found through Developer Door was exceptional. Our startup went from zero to product in 6 weeks. Couldn't have done it without them.",
            name: "Marcus Reeve",
            title: "Founder, NovaTech",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        {
            id: 3,
            stars: 4,
            quote:
            "We scaled our engineering team by 3x in a single quarter. Developer Door's vetting process saved us months of recruiting headaches and the talent quality speaks for itself.",
            name: "Priya Mehta",
            title: "VP Engineering, ScaleAI",
            avatar: "https://i.pravatar.cc/150?img=32",
        },
        {
            id: 2,
            stars: 4,
            quote:
            "The quality of developers we found through Developer Door was exceptional. Our startup went from zero to product in 6 weeks. Couldn't have done it without them.",
            name: "Marcus Reeve",
            title: "Founder, NovaTech",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        {
            id: 3,
            stars: 4,
            quote:
            "We scaled our engineering team by 3x in a single quarter. Developer Door's vetting process saved us months of recruiting headaches and the talent quality speaks for itself.",
            name: "Priya Mehta",
            title: "VP Engineering, ScaleAI",
            avatar: "https://i.pravatar.cc/150?img=32",
        },
        ];

        const [testimonials, setTestimonials] = useState([])
        const [fetching, setFetching] = useState(false)

        const fetchAll = async () => {
            setFetching(true);
            try {
              const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
              const snap = await getDocs(q);
              setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch (e) {
              console.error(e);
            } finally {
              setFetching(false);
            }
          };
        
          useEffect(() => { fetchAll(); }, []);
        
        function StarIcon({ filled }) {
  return (
    <svg
      className={`sm:w-5 sm:h-5 h-4 w-4 ${filled ? "text-[#FFB70E]" : "text-white/20"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

  return (
    <div className='my-12 sm:my-24 overflow-hidden w-[90%] mx-auto'>
         <motion.h1 {...fadeUp(0.20)} className='font-semibold text-2xl sm:text-[36px] text-center'>Trusted by High-Growth Teams</motion.h1>
        <TestimonialSlider testimonials={testimonials} />
    </div>
  )
}

export default Testimonials