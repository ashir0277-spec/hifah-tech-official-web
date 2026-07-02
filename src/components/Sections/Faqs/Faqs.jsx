import React, {useState} from 'react'
import { motion as MOTION, AnimatePresence } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { ChevronDown } from 'lucide-react';
import plus from '../../../assets/icons/plus-circle.svg'

const Faqs = () => {

  const faqs = [
  {
    question: "How does Developer Door verify companies?",
    answer:
      "Our team carefully reviews the submitted company information and portfolio to ensure authenticity and maintain trust for all clients."
  },
  {
    question: "What information do I need to provide?",
    answer:
      "You should share your company details, areas of expertise, portfolio links, and any relevant certifications or achievements."
  },
  {
    question: "How long does the verification process take?",
    answer:
      "Typically, verification is completed within 2–3 business days after receiving your complete information."
  },
  {
    question: "Is there a fee to list my company?",
    answer:
      "Yes, after verification, a secure payment confirms your premium listing and unlocks full visibility to potential clients."
  },
  {
    question: "Can I update my company details later?",
    answer:
      "Absolutely! You can request updates to your profile, portfolio, or services, and our team will review and approve the changes."
  },
  {
    question: "When does my company become visible to clients?",
    answer:
      "Once your information is verified and payment is confirmed, your profile is published and visible on Developer Door immediately."
  },
  {
    question: "Which communication channels can I use to submit my details?",
    answer:
      "You can send your company information via Email or WhatsApp for a smooth and direct registration process."
  },
  {
    question: "What makes Developer Door a trusted platform?",
    answer:
      "We carefully verify all listed companies and maintain high standards of quality, ensuring clients connect only with reliable and credible service providers."
  }
];

const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

   const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    // Framer motion variants for staggered animation
    const container = {
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.1, // gap between cards
            },
        },
    };

    const item = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

  return (
    <section className='w-[88%] sm:w-[88%] m-auto my-10 sm:my-20'>
      <div className='block sm:flex justify-between'>
        <div className='w-full sm:w-[30%]'>
          <div>
             <div className='text-center sm:text-left'>
      <p className='text-base sm:text-lg text-[#4AC3D5] font-semibold mb-3'>Faqs</p>
          <h3 className='text-3xl font-semibold tracking-tight text-[#333] sm:text-4xl'>Frequently asked questions</h3>
          <p className='mt-4 text-lg text-[#475467]'>Everything you need to know about hiring on Developer Door.</p>
        </div>
          </div>
        </div>
      <div className='w-full sm:w-[70%]'>
       
        {/* faqs */}
        <AnimatePresence>
          <MOTION.div
              ref={ref}
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
          className="w-[95%] md:w-[65%] m-auto mt-4 sm:mt-0">
          {faqs.map((faq, index) => (
              <AnimatePresence key={index}>
              <MOTION.div
              ref={ref}
              variants={item}
              transition={{ duration: 0.6, ease: "easeOut" }}
              
              className={`rounded-lg cursor-pointer transition-colors duration-300 ${ openIndex === index ? "bg-[#fff]" : ""}`}
              >
              <div onClick={() => toggleFAQ(index)} className="flex justify-between py-5 px-4 sm:px-8 gap-6 sm:items-center text-[#101828] text-base sm:text-[18px] font-medium " style={{textAlign: 'left', alignItems: 'flex-start'}}>
                  <span className='w-[88%] sm:w-[88%] sm:w-fit '>{faq.question}</span>
                  <span
                  className={`transition-transform w-fit duration-300 ${
                      openIndex === index ? "rotate-0" : "rotate-90"
                  }`}
                  >
                  {openIndex === index ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11H15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#4AC3D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                : <img src={plus} alt='plus-icon' />}
                  </span>
              </div>
              <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                      ? "min-h-fit opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
              >
                  <p style={{textAlign: 'left'}} className="text-[#475467] h-full px-8 pb-9 pt-1 font-regular text-sm sm:text-[16px] leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </div>
              </MOTION.div>
              </AnimatePresence>
          ))}
          </MOTION.div>
        </AnimatePresence>

      </div>
      </div>
     
    </section>
  )
}

export default Faqs