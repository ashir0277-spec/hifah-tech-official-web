import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import logo from '../../../assets/icons/logo2.svg'
import menu from '../../../assets/icons/menu.svg'
import ServicesDropdown from './ServicesDropdown'
import AboutDropDown from './AboutDropDown'
import JoinDropDown from './JoinDropDown'
import { motion, AnimatePresence } from 'framer-motion'
import StaffDropDown from './StaffDropdown'

const ABOUT_LINKS = [
  { label: "About Us",                   path: "/about" },
  { label: "Blog",                       path: "/blog" },
  { label: "Our Team",                   path: "/our-team" },
  { label: "Life at Hifah Technologies", path: "/life-at-hifah-technologies" },
];
const SERVICES_CORE = [
  { label: "App Development",   path: "/services/app-development" },
  { label: "Web Development",   path: "/services/web-development" },
  { label: "UI UX Designing",   path: "/services/ui-ux-designing" },
  { label: "Digital Marketing", path: "/services/digital-marketing" },
  { label: "Video Editing",     path: "/services/video-editing" },
  { label: "AI Solutions",      path: "/services/ai-solutions" },
];
const CAREERS_LINKS = [
  { label: "Careers",      path: "/careers" },
  { label: "Join as Team", path: "/join-as-team" },
];
const STAFF_LINKS = [
  { label: "Staff Augmentation", path: "/staff-augmentation" },
  { label: "Hire Developers",    path: "/hire-developers" },
  { label: "Our Team",           path: "/our-team" },
];

const MobileAccordion = ({ id, label, links, closeNav, openId, setOpenId }) => {
  const isOpen = openId === id;
  return (
    <li className='cursor-pointer'>
      <div
        onClick={() => setOpenId(isOpen ? null : id)}
        className='flex items-center gap-2 text-[#f1f1f1] font-medium text-[15px] py-1'
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className='mt-1 bg-[#1E1E1E] w-full py-3 px-4 rounded-lg flex flex-col gap-1'>
          {links.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={closeNav}
              className={({ isActive }) =>
                `block py-1.5 text-sm font-medium rounded px-2 transition-colors
                 ${isActive ? 'text-[#4AC3D5]' : 'text-[#f1f1f1] hover:text-[#4AC3D5]'}`
              }
            >
              <span className='text-base pr-2'>•</span>{item.label}
            </NavLink>
          ))}
        </div>
      )}
    </li>
  );
};

const ServicesAccordion = ({ id, closeNav, openId, setOpenId }) => {
  const isOpen = openId === id;
  return (
    <li className='cursor-pointer'>
      <div
        onClick={() => setOpenId(isOpen ? null : id)}
        className='flex items-center gap-2 text-[#f1f1f1] font-medium text-[15px] py-1'
      >
        Services
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className='mt-1 bg-[#1E1E1E] w-full py-3 px-4 rounded-lg flex flex-col gap-1'>
          
          {/* New Main Services Link Added Here */}
          <NavLink
            to="/services"
            onClick={closeNav}
            className={({ isActive }) =>
              `block py-2 text-sm font-medium rounded px-2 transition-colors border-b border-[#333] mb-2
               ${isActive ? 'text-[#4AC3D5]' : 'text-[#f1f1f1] hover:text-[#4AC3D5]'}`
            }
          >
            <span className='text-base pr-2'>•</span>All Services
          </NavLink>

          <p className='text-xs text-[#4AC3D5] font-semibold uppercase tracking-wider mb-1 px-2'>Core Services</p>
          {SERVICES_CORE.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={closeNav}
              className={({ isActive }) =>
                `block py-1.5 text-sm font-medium rounded px-2 transition-colors
                 ${isActive ? 'text-[#4AC3D5]' : 'text-[#f1f1f1] hover:text-[#4AC3D5]'}`
              }
            >
              <span className='text-base pr-2'>•</span>{item.label}
            </NavLink>
          ))}
        </div>
      )}
    </li>
  );
};

const Navbar = ({ showForm, setShowForm }) => {
  const [navLinks, setNavLinks] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen]             = useState(false);
  const [openAbout, setOpenAbout]   = useState(false);
  const [openCareer, setOpenCareer] = useState(false);
  const [openStaff, setOpenStaff]   = useState(false);

  const timeoutRef = useRef(null);
  const aboutRef   = useRef(null);
  const careerRef  = useRef(null);
  const staffRef   = useRef(null);

  const [mobileOpenId, setMobileOpenId] = useState(null);

  const path = useLocation();
  useEffect(() => {
    setOpenCareer(false);
    setOpenAbout(false);
    setOpen(false);
    setNavLinks(false);
    setMobileOpenId(null);
  }, [path.pathname]);

  const closeNav = () => {
    setNavLinks(false);
    setMobileOpenId(null);
  };

  const makeHover = (setter, ref) => ({
    onMouseEnter: () => { if (ref.current) clearTimeout(ref.current); setter(true); },
    onMouseLeave: () => { ref.current = setTimeout(() => setter(false), 300); },
  });

  const [showNav, setShowNav] = useState(true);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY.current;
      if (dy > 3 && y > 80) setShowNav(false);
      if (dy < -3) setShowNav(true);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [isHero, setIsHero] = useState(true);
  useEffect(() => {
    const handleScroll = () => setIsHero(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = navLinks ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navLinks]);

  const router = useLocation();
  const isHome = router.pathname === '/' || router.pathname === '/staff-augmentation';

  // Sidebar rendered via portal directly into document.body
  // so it escapes any parent z-index stacking context
  const sidebar = (
    <AnimatePresence>
      {navLinks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0 }} onClick={closeNav} />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              width: '75%',
              maxWidth: '320px',
              height: '100%',
              backgroundColor: '#121212',
              borderRadius: '0 1rem 1rem 0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header — never scrolls */}
            <div className='flex justify-between items-center p-6 flex-shrink-0'>
              <img
                onClick={() => { navigate('/'); closeNav(); }}
                className='w-24 cursor-pointer'
                src={logo}
                alt="logo"
              />
              <button onClick={closeNav} className='text-white cursor-pointer'>
                <X className='w-6 h-6' />
              </button>
            </div>

            {/* Scrollable nav area */}
            <nav className='flex-1 overflow-y-auto px-6 pb-8'>
              <ul className='flex flex-col gap-5 font-medium'>

                <li>
                  <NavLink
                    to="/"
                    onClick={closeNav}
                    className={({ isActive }) =>
                      `text-[15px] font-medium ${isActive ? 'text-[#4AC3D5]' : 'text-[#f1f1f1]'}`
                    }
                  >Home</NavLink>
                </li>

                <MobileAccordion
                  id="about"
                  label="About Us"
                  links={ABOUT_LINKS}
                  closeNav={closeNav}
                  openId={mobileOpenId}
                  setOpenId={setMobileOpenId}
                />

                <ServicesAccordion
                  id="services"
                  closeNav={closeNav}
                  openId={mobileOpenId}
                  setOpenId={setMobileOpenId}
                />

                <li>
                  <NavLink
                    to="/portfolio"
                    onClick={closeNav}
                    className={({ isActive }) =>
                      `text-[15px] font-medium ${isActive ? 'text-[#4AC3D5]' : 'text-[#f1f1f1]'}`
                    }
                  >Portfolio</NavLink>
                </li>

                <MobileAccordion
                  id="careers"
                  label="Careers"
                  links={CAREERS_LINKS}
                  closeNav={closeNav}
                  openId={mobileOpenId}
                  setOpenId={setMobileOpenId}
                />

                <MobileAccordion
                  id="staff"
                  label="Staff Augmentation"
                  links={STAFF_LINKS}
                  closeNav={closeNav}
                  openId={mobileOpenId}
                  setOpenId={setMobileOpenId}
                />

                <li>
                  <button
                    onClick={() => { navigate('/contact'); closeNav(); }}
                    className='w-full text-white font-medium text-sm bg-[#4AC3D5] py-2.5 rounded-full text-center'
                  >
                    Contact Us
                  </button>
                </li>

              </ul>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <section
        className={`w-full fixed roboto top-0 shadow-[0px_0px_24px_0px_#00000010]
          transition-transform duration-300 will-change-transform z-20
          ${showNav ? 'translate-y-0' : '-translate-y-full'}
          ${isHome && isHero ? 'bg-transparent' : 'bg-[#121212]'}
        `}
      >
        {showForm && (
          <div className='w-full h-screen bg-[#00000080] fixed top-0 left-0 z-50 overflow-y-auto'>
            <div onClick={() => setShowForm(false)} className='w-full h-screen absolute z-[-1]' />
          </div>
        )}

        <div className='w-[90%] xl:w-[88%] m-auto flex justify-between items-center py-2 lg:py-3'>

          {/* Logo */}
          <div className='flex-shrink-0'>
            <img
              onClick={() => navigate('/')}
              className='w-35 cursor-pointer'
              src={logo}
              alt="logo"
            />
          </div>

          {/* Desktop nav */}
          <nav className='hidden lg:block'>
            <ul className='flex items-center gap-3 xl:gap-6 text-[#FFFFFF] font-medium
                           text-[13px] xl:text-[15px] 2xl:text-[16px] whitespace-nowrap'>

              <li className='inline-block py-0 cursor-pointer'>
                <NavLink to="/" className={({ isActive }) =>
                  isActive
                    ? 'text-[#4AC3D5] px-2 py-2 border-b-[2.5px] border-[#4AC3D5] font-medium'
                    : 'text-[#f1f1f1] hover:text-[#4AC3D5]'
                }>Home</NavLink>
              </li>

              <li className='inline-block relative py-0 cursor-pointer' {...makeHover(setOpenAbout, aboutRef)}>
                <NavLink to="/about" className={({ isActive }) =>
                  `flex items-center gap-1 ${isActive
                    ? 'text-[#4AC3D5] px-2 py-2 border-b-[2.5px] border-[#4AC3D5] font-medium'
                    : 'text-[#f1f1f1] hover:text-[#4AC3D5]'}`
                }>About Us <ChevronDown className='w-4 h-4' /></NavLink>
                <AboutDropDown open={openAbout} />
              </li>

              <li className='inline-block py-0 cursor-pointer' {...makeHover(setOpen, timeoutRef)}>
                <NavLink to="/services" className={({ isActive }) =>
                  `flex items-center gap-1 ${isActive
                    ? 'text-[#4AC3D5] px-2 py-2 border-b-[2.5px] border-[#4AC3D5] font-medium'
                    : 'text-[#f1f1f1] hover:text-[#4AC3D5]'}`
                }>Services <ChevronDown className='w-4 h-4' /></NavLink>
                <ServicesDropdown open={open} />
              </li>

              <li className='inline-block py-0 cursor-pointer'>
                <NavLink to="/portfolio" className={({ isActive }) =>
                  isActive
                    ? 'text-[#4AC3D5] px-2 py-2 border-b-[2.5px] border-[#4AC3D5] font-medium'
                    : 'text-[#f1f1f1] hover:text-[#4AC3D5]'
                }>Portfolio</NavLink>
              </li>

              <li className='inline-block py-0 cursor-pointer' {...makeHover(setOpenCareer, careerRef)}>
                <NavLink to="/careers" className={({ isActive }) =>
                  `flex items-center gap-1 ${isActive
                    ? 'text-[#4AC3D5] px-2 py-2 border-b-[2.5px] border-[#4AC3D5] font-medium'
                    : 'text-[#f1f1f1] hover:text-[#4AC3D5]'}`
                }>Careers <ChevronDown className='w-4 h-4' /></NavLink>
                <JoinDropDown open={openCareer} />
              </li>

              <li className='inline-block py-0 cursor-pointer' {...makeHover(setOpenStaff, staffRef)}>
                <NavLink to="/staff-augmentation" className={({ isActive }) =>
                  `flex items-center gap-1 whitespace-nowrap ${isActive
                    ? 'text-[#4AC3D5] px-2 py-2 border-b-[2.5px] border-[#4AC3D5] font-medium'
                    : 'text-[#f1f1f1] hover:text-[#4AC3D5]'}`
                }>Staff Augmentation <ChevronDown className='w-4 h-4' /></NavLink>
                <StaffDropDown open={openStaff} />
              </li>

            </ul>
          </nav>

          {/* Contact button desktop */}
          <div className='hidden lg:flex items-center flex-shrink-0'>
            <button
              onClick={() => navigate('/contact')}
              className='whitespace-nowrap text-white font-medium text-[13px] xl:text-sm
                         bg-[#4AC3D5] py-2.5 px-4 xl:px-5 rounded-full cursor-pointer'
            >
              Contact Us
            </button>
          </div>

          {/* Burger — mobile/tablet */}
          <div className='block lg:hidden'>
            <img
              onClick={() => setNavLinks(true)}
              src={menu}
              className='w-9 h-9 cursor-pointer'
              alt="menu"
            />
          </div>

        </div>
      </section>

      {/* Sidebar portal — renders directly into document.body, escapes all z-index stacking */}
      {createPortal(sidebar, document.body)}
    </>
  );
};

export default Navbar;