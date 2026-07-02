import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Home Page | Hifah Technologies",
  "/about": "About Us | Hifah Technologies",
  "/services": "Services | Hifah Technologies",
  "/portfolio": "Portfolio | Hifah Technologies",
  "/portfolio/:id": "Portfolio Detail | Hifah Technologies",
  "/our-team": "Team Members | Hifah Technologies",
  "/contact": "Contact Us | Hifah Technologies",
  "/faqs": "FAQs | Hifah Technologies",
  "/careers": "Careers | Hifah Technologies",
  "/life-at-hifah-technologies": "Life at Hifah Technologies | Hifah Technologies",
  "/hire-developers": "Hire Developers | Hifah Technologies",
  "/join-as-developer": "Join as Developer | Hifah Technologies",
  "/staff-augmentation": "Staff Augmentation | Hifah Technologies",
  "/blog": "Blogs | Hifah Technologies",
  // admin routes
  "/admin": "Login | Hifah Technologies",
  "/admin/dashboard": "Dashboard | Hifah Technologies",
  "/admin/hire-developers" : "Hire Developers | Hifah Technologies",
  "/admin/join-as-developer" : "Join as Developer | Hifah Technologies",
  "/admin/positions" : "Positions | Hifah Technologies",
  "/admin/messages" : "Messages | Hifah Technologies",
  "/admin/testimonials" : "Testimonials | Hifah Technologies",
};

export function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "Hifah Technologies";
  }, [location.pathname]);

  return null; // invisible component to change title of the page
}