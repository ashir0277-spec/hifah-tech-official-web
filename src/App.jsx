import React, {useEffect, useState} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './components/Pages/HomePage/HomePage'
import Whatsapp from './components/Sections/Hero/Whatsapp'
import { TitleUpdater } from './components/Pages/TitleUpdater';
import FAQs from './components/Pages/FAQs/FAQs';
import Login from './components/Admin/Login/Login';
import Layout from './layout/DashboardLayout';
import AboutPage from './components/Pages/About/AboutPage';
import Services from './components/Pages/Services/Services';
import Portfolio from './components/Pages/Portfolio/Portfolio';
import NewPortfolio from "./components/Pages/HomePage/NewPortfolio"
import Team from './components/Pages/Team/Team';
import Contact from './components/Pages/Contact/Contact';
import LifeAtHifah from './components/Pages/LifeAtHifah/LifeAtHifah';
import Career from './components/Pages/Career/Career';
import HireDevelopers from './components/Pages/Hire-Developer/Hire-developers';
import Blog from './components/Pages/Blog/Blog';
import BlogDetail from './components/Pages/Blog/BlogDetails';
import BlogDetailPage from './components/Pages/Blog/BlogDetailspage';
import PortfolioDetail from './components/Pages/Portfolio/PortfolioDetail';
import PortfolioDetailPage from './components/Pages/Portfolio/PortfolioDetailPage';
import JoinAsDeveloper from './components/Pages/Join-as-Developer/JoinasDeveloper';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// admin routes
import DashboardAdmin from './components/Admin/Admin/Dashboard/Dashboard';
import Dashboard from './components/Admin/Admin/Contactus/Dashboard';
import HireDeveloper from './components/Admin/Admin/DevelopersTabs/HireDeveloper';
import JoinasDev from './components/Admin/Admin/DevelopersTabs/JoinAsDev';
import Messages from './components/Admin/Admin/Messages';
import Positions from './components/Admin/Admin/DevelopersTabs/Positions';
import PortfolioAdmin from './components/Admin/Admin/Portfolio/Portfolio';
import TeamAdmin from './components/Admin/Admin/TeamAdmin/TeamAdmin';
import ServicesAdmin from './components/Admin/Admin/Services/Services';
import BlogsAdmin from './components/Admin/Admin/Blogs/Blogs';
import { NavProvider } from './components/Pages/NavProvider'
import StaffAugmentation from './components/Pages/StaffAugmentation/StaffAugmentation'
import ServicesDetailsPage from './components/Pages/Services/ServicesDetails/ServicesDetailsPage'
import Testimonials from './components/Admin/Admin/Testimonials/Testimonials'
import PortfolioContentDynamic from './components/Pages/Portfolio/PortfolioContentDynamic'
import PortfolioContent from './components/Pages/Portfolio/PortfolioContent'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function AppLayout() {

  useEffect(() => {
  window.history.scrollRestoration = "auto";
}, []);


  
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/enroll");

  return (
    <div className='mont'>
    {/* <Router> */}
      {/* <NavProvider> */}
      <ScrollToTop />
      <ToastContainer />
      <TitleUpdater/>
      {!isAdminRoute && (
        <Whatsapp/>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServicesDetailsPage />} />
        <Route path="/portfolio" element={<Portfolio />} />



        {/* <Route path="/portfolio/:id" element={<PortfolioDetailPage />} /> */}
        {/* <Route path="/portfolio/:id" element={<PortfolioContentDynamic />} /> */}
        <Route path="/portfolio/:id" element={<PortfolioContent />} />
        {/* <Route path="/NewPortfolio/:id" element={<NewPortfolio />} /> */}
        
        



        <Route path="/our-team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/staff-augmentation" element={<StaffAugmentation />} />
        {/* <Route path="/faqs" element={<FAQs />} /> */}
        <Route path="/life-at-hifah-technologies" element={<LifeAtHifah />} />
         <Route path="/careers" element={<Career/>} />
         <Route path="/hire-developers" element={<HireDevelopers />} />
         <Route path="/join-as-team" element={<JoinAsDeveloper />} />
         <Route path="/blog" element={<Blog />} />
         <Route path="/blog/:id" element={<BlogDetailPage/>} />


         <Route path="/admin" element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="contactus" element={<Dashboard />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="hire-developers" element={<HireDeveloper />} />
            <Route path="join-as-developer" element={<JoinasDev />} />
            <Route path="positions" element={<Positions />} />
            <Route path="messages" element={<Messages />} />
            <Route path="portfolio" element={<PortfolioAdmin />} />
            <Route path="team" element={<TeamAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="Blogs" element={<BlogsAdmin />} />
          </Route>
      </Routes>
      {/* </NavProvider> */}
    {/* </Router> */}
    </div>
  )
}

function App() {

 return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App