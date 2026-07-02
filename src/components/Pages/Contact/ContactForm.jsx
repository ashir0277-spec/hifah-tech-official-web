import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { ChevronDown, Facebook, FacebookIcon, Instagram, Linkedin, Mail, MailOpen, MessageSquare, MessageSquareText, Phone, PhoneCall, Send, SendHorizonal } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../firebase';
import {toast} from 'react-toastify'

const ContactForm = () => {

    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [city, setCity] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
const handleSendResults = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const templateParams = {
    name: firstName,
    email: email,
    phone: phone,
    city: city,
  };

  try {
    const formData = {
      fullName: firstName,
      email: email,
      phone: phone,
      city: city,
      message: message,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "contact_us"), formData);
    toast.success("Form submitted successfully!")
    setFirstName('')
    setEmail('')
    setPhone('')
    setCity('')
    setMessage('')

  } catch (err) {
    console.error(err);
    console.error("Error submitting form:", err);
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    toast.error("Error submitting form. Please try again or contact support.");
  } finally {
    setIsLoading(false);
  }
};

const navigate = useNavigate();

    return (
        <section className='py-6 mb-20 mont'>
            <div className='px-4 sm:px-16 mont mt-0'>
                <motion.div className='flex flex-col xl:flex-row items-start gap-6'>

                  {/* ── Left: Form ── */}
                  <motion.div className='w-full xl:w-[70%] p-4 rounded-2xl'>
                    <h1 className='text-[#333333] text-[26px] font-semibold'>Send Us Massage</h1>
                    <div className='mt-5 mont font-medium text-[#333333] text-xs sm:text-sm'>

                      <form onSubmit={(e) => handleSendResults(e)} className='w-full'>

                        {/* Full name and Email */}
                        <div className='flex flex-col sm:flex-row gap-4 mt-6 w-full text-[#333333] font-medium roboto'>
                          <div className='w-full'>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                              type="text"
                              id='fullName'
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full mt-1.5 border border-[#E5E5E5] bg-white rounded-[6px] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#90c769] transition-colors duration-200 appearance-none"
                              placeholder="Full name"
                              required
                            />
                          </div>
                          <div className='w-full'>
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              id='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full mt-1.5 border border-[#E5E5E5] bg-white rounded-[6px] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#90c769] transition-colors duration-200 appearance-none"
                              placeholder='you@example.com'
                              required
                            />
                          </div>
                        </div>

                        {/* Phone and Service */}
                        <div className='flex flex-col sm:flex-row gap-4 mt-6 w-full text-[#333333] font-medium roboto'>
                          <div className='w-full'>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              type="tel"
                              id='phone'
                              value={phone}
                              minLength={9}
                              maxLength={15}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full mt-1.5 border border-[#E5E5E5] bg-white rounded-[6px] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#90c769] transition-colors duration-200 appearance-none"
                              placeholder='+92 000 000-0000'
                              required
                            />
                          </div>
                          <div className='w-full'>
                            <label htmlFor="city">Service</label>
                            <div className='relative'>
                              <select
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className={`w-full ${city === '' ? 'text-[#9a9fa8]' : ''} mt-1.5 border border-[#E5E5E5] bg-white rounded-[6px] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#90c769] transition-colors duration-200 appearance-none`}
                              >
                                <option value="" disabled>Select Service</option>
                                <option value="UI/UX Designing">UI/UX Designing</option>
                                <option value="Web development">Web development</option>
                                <option value="app development">app development</option>
                                <option value="digital marketing">digital marketing</option>
                                <option value="ai solutions">ai solutions</option>
                              </select>
                              <ChevronDown className='w-5 h-5 absolute right-4 top-5 cursor-pointer pointer-events-none' />
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div className='w-full text-[#333333] font-medium roboto mt-4 sm:mt-11'>
                          <label htmlFor="message">Message</label>
                          <textarea
                            id="message"
                            value={message}
                            rows={4}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-full mt-2 resize-none bg-white border border-[#DADDE2] px-4 py-2.5 rounded-lg placeholder:text-[#838383] mont outline-none'
                            placeholder='Tell us about your project..'
                          />
                        </div>

                        <button
                          type='submit'
                          className='mt-4 sm:mt-11 w-full text-white font-medium text-sm lg:text-[17px] cursor-pointer bg-[#4AC3D5] py-[10px] flex justify-center text-center rounded-[8px]'
                        >
                          <p className='flex gap-3 items-center'>
                            {isLoading ? 'Loading...' : "Send message"}
                          </p>
                        </button>
                      </form>
                    </div>
                  </motion.div>

                  {/* ── Right: Contact Info ── */}
                  <div className='w-full xl:w-[30%] rounded-[20px] p-5 mt-0 xl:mt-0'>
                    <h3 className='font-semibold text-xl sm:text-2xl text-[#171A1F]'>Need Quick Help?</h3>
                    <p className='font-medium text-sm sm:text-base text-[#475467] mt-2'>
                      Our support team is available during working hours for immediate assistance.
                    </p>

                    {/* Buttons */}
                    <div className='flex flex-col gap-4 mt-6 roboto'>
                      <a href="https://wa.me/923177770287" target="_blank" rel="noopener noreferrer">
                        <button className='w-full bg-[#4AC3D5] font-medium rounded-lg py-2.5 flex items-center justify-center gap-4 text-white'>
                          <MessageSquareText className='w-5 h-5 flex-shrink-0' />
                          Live chat
                        </button>
                      </a>
                      <a href="mailto:hifahtechnologiesofficial@gmail.com" target="_blank" rel="noopener noreferrer">
                        <button className='w-full bg-[#4AC3D5] font-medium rounded-lg py-2.5 flex items-center justify-center gap-4 text-white'>
                          <SendHorizonal className='w-5 h-5 -rotate-45 stroke-2 flex-shrink-0' />
                          Email Support
                        </button>
                      </a>
                    </div>

                    {/* Address */}
                    <a href="https://maps.google.com/?q=Hifah Technologies+Jadoon+Plaza+Phase+2+Abbottabad" target="_blank" rel="noopener noreferrer">
                      <div className='flex items-start gap-3 mt-6 text-[#344054] font-semibold text-sm sm:text-base'>
                        <div className='bg-[#344054]/10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md mt-0.5'>
                         <svg
  className="text-[#344054]"
  width="18"
  height="18"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M9 9.375C10.2426 9.375 11.25 8.36764 11.25 7.125C11.25 5.88236 10.2426 4.875 9 4.875C7.75736 4.875 6.75 5.88236 6.75 7.125C6.75 8.36764 7.75736 9.375 9 9.375Z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M9 16.5C10.5 13.5 15 11.5637 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 11.5637 7.5 13.5 9 16.5Z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
                        </div>
                        <span className='break-words mt-1 min-w-0'>Jadoon Plaza Phase 2, Abbottabad</span>
                      </div>
                    </a>

                    {/* Email */}
                    <a href="mailto:hifahtechnologiesofficial@gmail.com" target="_blank" rel="noopener noreferrer">
                      <div className='flex items-start gap-3 mt-4 text-[#344054] font-semibold text-sm sm:text-base'>
                        <div className=' bg-[#344054]/10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md mt-0.5'>
                          <MailOpen className='w-4 h-4 text-[#344054]' stroke='#344054' />
                        </div>
                        {/* break-all breaks the long email address across lines */}
                        <span className='break-all mt-1 min-w-0'>hifahtechnologiesofficial@gmail.com</span>
                      </div>
                    </a>

                    {/* Phone */}
                    <a href="http://wa.me/923281223062" target="_blank" rel="noopener noreferrer">
                      <div className='flex items-start gap-3 mt-4 text-[#344054] font-semibold text-sm sm:text-base'>
                        <div className='bg-[#344054]/10 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md mt-0.5'>
                          <Phone className='w-4 h-4 text-[#344054]' />
                        </div>
                        <span className='break-words mt-1 min-w-0'>+923177770287</span>
                      </div>
                    </a>
                  </div>

                </motion.div>
            </div>
        </section>
    )
}

export default ContactForm