import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/icons/logo2.svg'
import fb from '../../../assets/icons/fb.svg'
import linkedin from '../../../assets/icons/linkedin.svg'
import insta from '../../../assets/icons/insta2.svg'
import { ChevronRight, Mail, Phone } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const countryAddresses = [
        {
            name: "PAK",
            phone: "+92 317 7770287",
            address: "Jadoon Plaza #Ph 2, Atd",
            phoneno: "923177770287"
        },
        {
            name: "UAE",
            phone: "+971 50 123 4567",
            address: "456 Business Bay, Dubai",
            phoneno: "971501234567"
        },
        {
            name: "USA",
            phone: "+1 123 456 7890",
            address: "123 Main St, Anytown, USA",
            phoneno: "11234567890"
        },
        {
            name: "JAP",
            phone: "+81 90 1234 5678",
            address: "789 Shibuya, Tokyo, Japan",
            phoneno: "819012345678"
        },
    ]

    const Linkedin = () => {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.62651 3.07456C3.2139 3.20902 2.97283 3.35276 2.67149 3.65415C2.2218 4.10392 2.00391 4.62787 2.00391 5.25847C2.00391 6.19045 2.49996 6.98334 3.33444 7.37746C3.6636 7.53511 3.73777 7.55366 4.16892 7.56757C4.74842 7.59075 5.13785 7.48874 5.569 7.20126C5.93061 6.96015 6.1485 6.70513 6.34321 6.30173C6.68164 5.60159 6.67237 4.8968 6.32467 4.19201C6.17168 3.88135 5.72662 3.42695 5.40674 3.25539C4.90605 2.98646 4.14111 2.90764 3.62651 3.07456Z" fill="white" />
                <path d="M15.7887 8.99355C14.3283 9.20221 13.2991 9.79571 12.664 10.8019L12.5203 11.0244V10.1574V9.2903H10.6195H8.71875V15.6426V21.995H10.7122H12.7011L12.715 18.2485C12.7335 14.5808 12.7335 14.4974 12.8309 14.1496C13.123 13.1203 13.6886 12.6009 14.6436 12.4989C15.8814 12.3598 16.6231 12.8699 16.9106 14.0522C16.9801 14.3304 16.9894 14.8173 17.0033 18.179L17.0218 21.995H19.0153H21.0088L20.9903 17.6689C20.9717 13.9224 20.9624 13.2872 20.8929 12.9116C20.6426 11.4696 20.1651 10.4959 19.4094 9.88381C18.9133 9.48505 18.3106 9.22539 17.5411 9.08629C17.1563 9.0121 16.0483 8.95646 15.7887 8.99355Z" fill="white" />
                <path d="M2.28516 15.6427V21.995H4.27864H6.27212V15.6427V9.29031H4.27864H2.28516V15.6427Z" fill="white" />
            </svg>
        )
    }

    const Tiktok = () => {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1789_31390)">
                    <path d="M17.0725 0H13.0278V16.3478C13.0278 18.2957 11.4722 19.8957 9.53626 19.8957C7.60034 19.8957 6.04469 18.2957 6.04469 16.3478C6.04469 14.4348 7.56577 12.8695 9.43257 12.8V8.69567C5.31872 8.7652 2 12.1391 2 16.3478C2 20.5913 5.38786 24 9.57085 24C13.7538 24 17.1416 20.5565 17.1416 16.3478V7.9652C18.6627 9.07827 20.5295 9.73913 22.5 9.77393V5.66957C19.4579 5.56522 17.0725 3.06087 17.0725 0Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_1789_31390">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        )
    }

    const Facebook = () => {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1789_31391)">
                    <path d="M16.2501 0.526817C15.6391 0.581123 15.5146 0.599226 14.263 0.804382C12.7978 1.05178 12.2936 1.22676 11.564 1.73362C10.8225 2.25255 9.63618 3.86967 9.39891 4.69029C9.24469 5.21525 9.12012 6.30138 9.03707 7.85212C9.00148 8.55207 8.94217 9.1434 8.91251 9.16151C8.85912 9.19771 8.30746 9.23995 6.93722 9.31236C6.58131 9.33046 6.21948 9.3546 6.14236 9.3727L6 9.40287L6.03559 11.0743C6.05932 11.9915 6.07711 12.9147 6.07711 13.1198V13.5H7.5304H8.98369L8.98962 14.568C8.99555 15.1593 9.00148 15.7748 9.01335 15.9438C9.01928 16.1067 9.02521 18.1039 9.03114 20.3727L9.04301 24.5L9.3218 24.4578C9.47009 24.4397 10.4607 24.4216 11.5225 24.4216H13.4503L13.4029 20.7529C13.3732 18.7375 13.3613 16.698 13.3732 16.2153C13.3851 15.7326 13.3969 14.9481 13.3969 14.4654L13.4029 13.5905L13.6401 13.5482C13.7706 13.5301 14.7909 13.506 15.912 13.506L17.9407 13.5L17.9466 12.1544C17.9466 11.4182 17.9644 10.5011 17.9763 10.1149L18 9.41494L17.567 9.36063C17.3356 9.33046 16.351 9.30632 15.39 9.30029C14.4291 9.30029 13.5749 9.29426 13.4978 9.28822L13.3554 9.27615L13.3969 8.10555C13.4385 6.7479 13.4918 6.39189 13.7054 6.05398C13.9011 5.75228 14.3282 5.37817 14.7435 5.16095C15.2773 4.88942 15.7459 4.79287 16.7899 4.7627L17.7449 4.73857L17.7805 3.28437C17.8043 2.48787 17.822 1.5707 17.822 1.2509C17.822 0.6656 17.822 0.659565 17.6619 0.599226C17.4128 0.50268 16.8492 0.472511 16.2501 0.526817Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_1789_31391">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        )
    }

    return (
        <>
            <section className='bg-[#000000] roboto relative'>
                <div className='bg-[#A2D183] absolute blur-[200px] z-1 right-0 top-100 w-full h-[80px] rotate-30'></div>
            </section>

            <div className='bg-[#000000] pt-5 roboto'>
                <div className='w-[88%] sm:w-[92%] m-auto relative z-3'>
                    <div className='flex justify-between items-center py-4 sm:py-6'>
                        <img onClick={() => navigate('/')} src={logo} className='w-[45%] sm:w-[13%] cursor-pointer' alt="logo" />
                        <div className='flex gap-4 items-center mt-4'>
                            <a href="https://www.linkedin.com/company/hifah-technologies/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
                            <a href="https://www.instagram.com/hifahtechnologies?igsh=MWgzcnhkOXBhaXNkbQ==" target="_blank" rel="noopener noreferrer"><img src={insta} alt="insta" className='w-6 h-6' /></a>
                            <a href="https://www.facebook.com/profile.php?id=61561652836395" target="_blank" rel="noopener noreferrer"><Facebook /></a>
                            <a href="https://www.tiktok.com/@hifahtechnologies?_t=ZS-8vlsxYn0kum&_r=1" target="_blank" rel="noopener noreferrer"><Tiktok /></a>
                        </div>
                    </div>

                    <hr className='text-[#5F625D] h-[2px] mt-4 md:mt-0' />

                    <h2 className='font-semibold text-white text-2xl sm:text-[32px] mt-4 mont'>Let's Grow Your Brand</h2>
                    <p className='font-regular text-[#f1f1f1] text-sm sm:text-[15px] mb-7 w-full sm:w-[35%] mont'>
                        We help businesses transform ideas into powerful digital experiences, using creative design, smart strategy, and technology to build standout brands.
                    </p>

                    {/* Main Footer Links - Mobile until LG */}
                    <div className='block lg:flex justify-between pb-10 gap-8'>
                        
                        {/* Quick Links */}
                        <div className='w-full lg:w-[20%] relative'>
                            <p className="text-2xl my-3 font-semibold text-[#A2D184]">Quick Links</p>
                            <ul className="space-y-2 text-base font-regular text-[#D9D9D9] capitalize w-full">
                                <li className='py-0.5'><Link to="/" className="hover:underline flex items-center justify-between">Home <ChevronRight className='w-4 h-4' /></Link></li>
                                {/* <li className='py-0.5'><Link to="/courses" className="hover:underline flex items-center justify-between">Courses <ChevronRight className='w-4 h-4' /></Link></li> */}
                                <li className='py-0.5'><Link to="/portfolio" className="hover:underline flex items-center justify-between">Portfolio <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/contact" className="hover:underline flex items-center justify-between">Contact <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/careers" className="hover:underline flex items-center justify-between">Career <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/blog" className="hover:underline flex items-center justify-between">Blog <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/hire-developers" className="hover:underline flex items-center justify-between">Hire Developers <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/join-as-team" className="hover:underline flex items-center justify-between">Join as Team <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/life-at-hifah-technologies" className="hover:underline flex items-center justify-between">Life at hifah tech <ChevronRight className='w-4 h-4' /></Link></li>
                            </ul>
                        </div>

                        {/* IT Services */}
                        <div className='w-full lg:w-[26%] relative h-fit mt-8 lg:mt-0'>
                            <p className="text-2xl my-3 font-semibold text-[#A2D184]">IT Services</p>
                            <ul className="space-y-2 text-base font-regular text-[#D9D9D9] w-full">
                                <li className='py-0.5'><Link to="/services/ai-solutions" className="hover:underline flex items-center justify-between">AI Solutions <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/services/ui-ux-designing" className="hover:underline flex items-center justify-between">UI/UX Designing <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/services/app-development" className="hover:underline flex items-center justify-between">App Development <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/services/web-development" className="hover:underline flex items-center justify-between">Web Development <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/services/business-strategy" className="hover:underline flex items-center justify-between">Business Strategy <ChevronRight className='w-4 h-4' /></Link></li>
                                <li className='py-0.5'><Link to="/services/digital-marketing" className="hover:underline flex items-center justify-between">Digital Marketing <ChevronRight className='w-4 h-4' /></Link></li>
                            </ul>
                        </div>

                        {/* Technology */}
                        <div className='w-full lg:w-[26%] relative h-fit mt-8 lg:mt-0'>
                            <p className="text-2xl my-3 font-semibold text-[#A2D184]">Technology</p>
                            <ul className="space-y-2 text-base font-regular text-[#D9D9D9] w-full">
                <li className='py-0.5'>
  <Link
    to="/?tab=Backend"
    className="hover:underline flex items-center justify-between"
  >
    Backend
    <ChevronRight className='w-4 h-4' />
  </Link>
</li>

<li className='py-0.5'>
  <Link
    to="/?tab=Frontend"
    className="hover:underline flex items-center justify-between"
  >
    Frontend
    <ChevronRight className='w-4 h-4' />
  </Link>
</li>

<li className='py-0.5'>
  <Link
    to="/?tab=UI/UX"
    className="hover:underline flex items-center justify-between"
  >
    CMS
    <ChevronRight className='w-4 h-4' />
  </Link>
</li>

<li className='py-0.5'>
  <Link
    to="/?tab=AI/ML"
    className="hover:underline flex items-center justify-between"
  >
    Mobile
    <ChevronRight className='w-4 h-4' />
  </Link>
</li>

<li className='py-0.5'>
  <Link
    to="/?tab=Cloud%20%26%20Infra"
    className="hover:underline flex items-center justify-between"
  >
    Cloud
    <ChevronRight className='w-4 h-4' />
  </Link>
</li>

<li className='py-0.5'>
  <Link
    to="/?tab=Database"
    className="hover:underline flex items-center justify-between"
  >
    Security
    <ChevronRight className='w-4 h-4' />
  </Link>
</li>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className='w-full lg:w-[24%] relative h-fit mt-8 lg:mt-0'>
                            <p className="text-2xl my-3 font-semibold text-[#A2D184]">Contact Us</p>
                            <ul className="space-y-2 text-base font-regular text-[#D9D9D9]">
                                <li className='py-1'>
                                    <Link to="mailto:hr@hifahtechnologies.com" target='_blank' className="hover:underline flex items-center gap-2">
                                        <Mail className='w-5 h-5' />hr@hifahtechnologies.com
                                    </Link>
                                </li>
                                <li className='py-1'>
                                    <Link to="https://wa.me/923177770287" target='_blank' className="hover:underline flex items-center gap-2">
                                        <Phone className='w-5 h-5' /> +923177770287
                                    </Link>
                                </li>
                                <li className='py-1'>
                                    <Link to="/" className="hover:underline flex items-start gap-2">
                                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0007 10.418C11.3814 10.418 12.5007 9.29868 12.5007 7.91797C12.5007 6.53726 11.3814 5.41797 10.0007 5.41797C8.61994 5.41797 7.50065 6.53726 7.50065 7.91797C7.50065 9.29868 8.61994 10.418 10.0007 10.418Z" stroke="#D9D9D9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.0007 18.3346C11.6673 15.0013 16.6673 12.8499 16.6673 8.33464C16.6673 4.65274 13.6825 1.66797 10.0007 1.66797C6.31875 1.66797 3.33398 4.65274 3.33398 8.33464C3.33398 12.8499 8.33398 15.0013 10.0007 18.3346Z" stroke="#D9D9D9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Jadoon Plaza Phase 2, Abbottabad
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className='text-[#475467] h-[2px] mt-4' />

                    <div className='flex-wrap md:flex w-full justify-between py-8'>
                        <div>
                            <p className='font-regular text-base text-[#FFFFFFCC]'>
                                Copyright © {new Date().getFullYear()} <span className='text-[#A2D184]'>Hifah Technologies</span>. All Rights Reserved.
                            </p>
                        </div>
                        <div>
                            <p className='font-regular text-base text-[#FFFFFFCC]'>Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer