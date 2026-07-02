import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
// mobile app
import fitme from '../../../assets/mockups2/mockups/fitme.jpeg'
import gbc from '../../../assets/mockups2/mockups/gbc.png'
import rafik from '../../../assets/mockups2/mockups/ABU RAFIK BUTCHER.png'
import AfroNeta from '../../../assets/mockups2/mockups/AfroNeta.png'
import ANIATPNA from '../../../assets/mockups2/mockups/ANIATPNA Mobile App.png'
import zipzap from '../../../assets/mockups2/mockups/Zipzap talk.png'
import aura from '../../../assets/mockups2/mockups/Aura VPN.png'
import BlinkBack from '../../../assets/mockups2/mockups/BlinkBack.png'
import blush from '../../../assets/mockups2/mockups/blush.png'
import BLOCKATIE from '../../../assets/mockups2/mockups/BLOCKATIE.png'
import flaty from '../../../assets/mockups2/mockups/Flaty.pk.png'
import gdrive from '../../../assets/mockups2/mockups/Gdrive Final.png'
import harmon from '../../../assets/mockups2/mockups/Harmonized1.png'
import meCloset from '../../../assets/mockups2/mockups/MeCloset.png'
import mego from '../../../assets/mockups2/mockups/Mego Final.png'
import noly from '../../../assets/mockups2/mockups/Noly.png'
import pakTruck from '../../../assets/mockups2/mockups/PakTRuck.png'
import quickly from '../../../assets/mockups2/mockups/Quickly final mockup.png'
import revealit from '../../../assets/mockups2/mockups/Revealt.png'
import sbp from '../../../assets/mockups2/mockups/Service Booking App.png'
import helth from '../../../assets/mockups2/mockups/So Helthful.png'
import filsx from '../../../assets/mockups2/mockups/filsx.jpg'

// web development
import web1 from '../../../assets/web/web/web (1).png'
import web2 from '../../../assets/web/web/web (2).png'
import web3 from '../../../assets/web/web/web (3).png'
import web4 from '../../../assets/web/web/web (4).png'
import web5 from '../../../assets/web/web/web (5).png'
import web6 from '../../../assets/web/web/web (6).png'
import web7 from '../../../assets/web/web/web (7).png'
import web8 from '../../../assets/web/web/web (8).png'
import web9 from '../../../assets/web/web/Fresh Steps.png'
import web10 from '../../../assets/web/web/web (10).png'
import web11 from '../../../assets/web/web/web (11).png'
import web12 from '../../../assets/web/web/web (12).png'
import web13 from '../../../assets/web/web/web (13).png'
import web14 from '../../../assets/web/web/web (14).png'
import web15 from '../../../assets/web/web/web (15).png'
import web16 from '../../../assets/web/web/web (16).png'
import web17 from '../../../assets/web/web/web (17).png'
import web18 from '../../../assets/web/web/web (18).png'
import web19 from '../../../assets/web/web/web (19).png'
import web20 from '../../../assets/web/web/web (20).png'
import web21 from '../../../assets/web/web/web (21).png'
import flatyweb from '../../../assets/web/web/flaty.png'

import brum from '../../../assets/web/web/brum-mobile.png'
import diamond from '../../../assets/web/web/diamond.png'
import visaera from '../../../assets/web/web/visaera.png'
import techkyo from '../../../assets/web/web/techkyo.png'
import meqr from '../../../assets/web/web/me-qr.png'
import tutor from '../../../assets/web/web/tutor-site.png'
import oxmmarket from '../../../assets/web/web/oxmmarket.png'
import glassgow from '../../../assets/web/web/glasgow-mobile.png'
// import visaera from '../../../assets/web/.png'

import { Link, useLocation, useNavigate } from 'react-router-dom';

// Fisher-Yates shuffle — returns a new shuffled array, never mutates the original
const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const Portfoliopage = () => {

    const images = [
    // app 
    fitme, gbc, rafik, AfroNeta, ANIATPNA, 
    aura, BlinkBack, blush, BLOCKATIE, flaty, gdrive,
    harmon, meCloset, mego, noly, pakTruck, quickly,
    revealit, sbp, helth, filsx,
    //web
    web1, web2, web3, web4, web5, web6, web7, web8, web9, 
    web10, web11, web12, web13, web14, web15, web16, web17,
    web18, web19, web20, web21, flatyweb, brum, diamond, visaera, techkyo, meqr, tutor, glassgow, oxmmarket
    ];
     useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

const projects = {
    "Mobile Apps": [
         {
            id: 'gbc',
            image: gbc,
            title: 'GBC',
            description: "GBC is a mobile app that connects learners with verified mentors, enabling real-time collaboration, interactive forums, and live sessions, making learning practical, personalized, and full of opportunities.",
        },
         {
            id: 'butcher-shop',
            image: rafik,
            title: 'Abu Rafiq Butcher Shop',
            description: "Abu Rafiq Butcher offers a seamless food delivery experience with easy location setup, multiple ordering options (delivery, pickup, or dine-in), and secure payment methods. ",
        },
        {
            id: 'afroneta',
            image: AfroNeta,
            title: 'AfroNeta',
            description: "AfroNeta streamlines user, content, analytics, payment, and community management through a secure, all-in-one platform.",
        },
        {
            id: 'anipartna',
            image: ANIATPNA,
            title: 'Anipartna Mobile App',
            description: "In Anipartna, users can seamlessly buy and sell properties, explore exclusive real estate listings, and invest in promising property opportunities, ensuring secure transactions and profitable growth within a trusted digital property marketplace.",
        },
        {
            id: 'auravpn',
            image: aura,
            title: 'aura VPN',
            description: "A fast and secure VPN with Wire Guard for high-speed browsing and Supabase for reliable data protection.", 
        },
         {
            id: 'on-the-dot',
            image: sbp,
            title: 'service booking app',
            description: "We built it to make service discovery, booking, and scheduling seamless for customers, while enabling businesses to manage requests, appointments, and completed projects efficiently", 
        },
        {
            id: 'revealit',
            image: revealit,
            title: 'revealit',
            description: "RevealIt lets you scan food, cosmetic, and personal care products to learn what’s inside. Get simple ingredient explanations, allergen alerts, and educational insights to make informed choices.",
        },
        // {
        //     id: 'zipzap',
        //     image: zipzap,
        //     title: 'zipzap talk',
        //     description: "Zipzap is a smart language exchange app that helps users learn new languages for free. It offers engaging conversation practice, vocabulary tools, and premium features for advanced learning and personalized progress tracking.",
        // },
        {
            id: 'noly',
            image: noly,
            title: 'noly',
            description: "Designed for speed and accuracy, Noly transforms your audio into clear transcripts and concise summaries, helping you stay organized, productive, and stress-free.",
        },
        {
            id: 'gdrive',
            image: gdrive,
            title: 'GDrive',
            description: "A dedicated app for mastering the German driving license exam with interactive quizzes, featuring questions with attached videos and images for better understanding.",    
        },
        {
            id: 'paktruck',
            image: pakTruck,
            title: 'pak truck',
            description: "Pak Truck is a powerful platform for seamlessly buying, selling, and promoting trucks, buses, and spare parts.",
        },
        {
            id: 'blink-back',
            image: BlinkBack,
            title: 'blink back',
            description: "BlinkBack is a memories app that lets users capture and relive their special moments with ease, combining intuitive design and smooth navigation for a meaningful experience.",
        },
        //  {
        //     id: 'fitme',
        //     image: fitme,
        //     title: 'Fitme Stylish',
        //     description: "Fitme Stylish is global AI-powered fashion plateform that helps users visualize outfits, style their wardrobe, and receive peronalized daily outfit sugestions",    
        // },
        // {
        //     id: 'blush-lounge',
        //     image: blush,
        //     title: 'blush lounge',
        //     description: "Blush Lounge to bring dining, entertainment, and engagement together featuring exclusive lounge menus, exciting games, event access, and a rewarding points system that keeps every visit memorable.",
        // },
        // {
        //     id: 'filsx',
        //     image: filsx,
        //     title: 'filx digital wallet',
        //     description: "FilsX Digital Wallet empowers you to send, receive, and manage money securely anytime, anywhere. Enjoy instant transactions, smart budgeting tools, and a seamless digital experience designed for your everyday financial freedom.",
        // },
       
        // {
        //     id: 'blockatie',
        //     image: BLOCKATIE,
        //     title: 'blockatie',
        //     description: "Blockatie is a modern delivery and logistics platform designed to simplify the shipping process for both clients and drivers. The app allows users to easily create and manage shipments, track delivery progress in real time, and stay updated with detailed order insights.", 
        // },
        {
            id: 'flaty',
            image: flaty,
            title: 'Flaty.pk',
            description: "Flaty offers a seamless real estate experience where users can explore, buy, and sell properties effortlessly.", 
        },
        // {
        //     id: 'harmonized',
        //     image: harmon,
        //     title: 'harmonized',
        //     description: "Harmonized is a modern dating app built to explore profiles and connect effortlessly through smart matching and location-based search.",
        // },
        {
            id: 'meCloset',
            image: meCloset,
            title: 'Me Closet',
            description: "MeCloset is a digital wardrobe app where users can save outfit photos, create stylish clothing pairs, and organize their looks by saving them in a built-in calendar for future use.", 
        },
        // {
        //     id: 'mego',
        //     image: mego,
        //     title: 'mego',
        //     description: "A secure and seamless digital marketplace for effortless online buying and selling, featuring a built-in reward system to enhance user engagement and benefits.", 
        // },
        // {
        //     id: 'quickly',
        //     image: quickly,
        //     title: 'quickly',
        //     description: "Quickly brings together books, podcasts, blogs, and news in one intelligent platform. With AI-generated summaries, translations, and audio listening options, it transforms how you consume information.", 
        // },
        // {
        //     id: 'healthful',
        //     image: helth,
        //     title: 'so healthful',
        //     description: "An AI-powered health app for seamless connections, medication tracking, health record management, and real-time vitals monitoring with smartwatch integration.",  
        // },
        {
    id: 'safe-choice',
    image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782726418/Hand_and_iPhone_16_Pro_gmthdn.png',
    title: 'SafeChoice',
    description: "SafeChoice helps you make healthier grocery decisions by scanning product barcodes and analyzing ingredients, offering health scores, allergen alerts, and better product recommendations.",
},
{
    id: 'yazboz',
    image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782726660/YAZBOZ_and_iPhone_16_Pro_om7dvu.png',
    title: 'Yazboz',
    description: "Yazboz is a digital score tracker for Okey board games, letting players manage live matches, log points, and review complete game history without pen and paper.",
},
        
    ],

    "UI / UX Design": [
        // {
        //     id: 'blush-lounge',
        //     image: blush,
        //     title: 'blush lounge',
        //     description: "Blush Lounge to bring dining, entertainment, and engagement together featuring exclusive lounge menus, exciting games, event access, and a rewarding points system that keeps every visit memorable.",
        // },
        {
            id: 'gbc',
            image: gbc,
            title: 'GBC',
            description: "GBC is a mobile app that connects learners with verified mentors, enabling real-time collaboration, interactive forums, and live sessions, making learning practical, personalized, and full of opportunities.",
        },
         {
            id: 'butcher-shop',
            image: rafik,
            title: 'Abu Rafiq Butcher Shop',
            description: "Abu Rafiq Butcher offers a seamless food delivery experience with easy location setup, multiple ordering options (delivery, pickup, or dine-in), and secure payment methods. ",
        },
         {
            id: "supply-king",
            image: web17,
            title: 'supply king',
            description: "Supply King is an e-commerce platform that simplifies bulk ordering and supply management with a clean interface and reliable tracking.",
        },
        // {
        //     id: "vendcommm",
        //     image: web19,
        //     title: 'vendcomm',
        //     description: "VendComm  simplifies collaboration between vendors and event managers with centralized dashboards, automated invoicing, real-time communication, and progress tracking, ensuring every campaign runs efficiently from planning to completion.",
        // },
        {
            id: 'afroneta',
            image: AfroNeta,
            title: 'AfroNeta',
            description: "AfroNeta streamlines user, content, analytics, payment, and community management through a secure, all-in-one platform.",
        },
        {
            id: 'anipartna',
            image: ANIATPNA,
            title: 'Anipartna Mobile App',
            description: "In Anipartna, users can seamlessly buy and sell properties, explore exclusive real estate listings, and invest in promising property opportunities, ensuring secure transactions and profitable growth within a trusted digital property marketplace.",
        },
         {
            id: "we-scale-hq",
            image: web20,
            title: 'we scale hq',
            description: "Fix sales leaks, train teams, and scale faster with We Scale HQ.",
        },
        // {
        //     id: 'zipzap',
        //     image: zipzap,
        //     title: 'zipzap talk',
        //     description: "Zipzap is a smart language exchange app that helps users learn new languages for free. It offers engaging conversation practice, vocabulary tools, and premium features for advanced learning and personalized progress tracking.",
        // },
        {
            id: 'aura-vpn',
            image: aura,
            title: 'aura VPN',
            description: "A fast and secure VPN with Wire Guard for high-speed browsing and Supabase for reliable data protection.", 
        },
        // {
        //     id: 'blockatie',
        //     image: BLOCKATIE,
        //     title: 'blockatie',
        //     description: "Blockatie is a modern delivery and logistics platform designed to simplify the shipping process for both clients and drivers. The app allows users to easily create and manage shipments, track delivery progress in real time, and stay updated with detailed order insights.", 
        // },
        {
            id: 'flatty',
            image: flaty,
            title: 'Flaty.pk',
            description: "Flaty offers a seamless real estate experience where users can explore, buy, and sell properties effortlessly. ", 
        },
        {
            id: "ubk-towing",
            image: web18,
            title: 'ubk towing',
            description: "UBK streamlines transportation operations by connecting admins, drivers, and vehicles in one unified system. We built a platform that simplifies vehicle assignments, document tracking, inspection monitoring, and performance analytics.",
        },
        {
            id: 'revealit',
            image: revealit,
            title: 'revealit',
            description: "RevealIt lets you scan food, cosmetic, and personal care products to learn what’s inside. Get simple ingredient explanations, allergen alerts, and educational insights to make informed choices. ",
        },
        {
            id: 'noly',
            image: noly,
            title: 'noly',
            description: "Designed for speed and accuracy, Noly transforms your audio into clear transcripts and concise summaries, helping you stay organized, productive, and stress-free.",
        },
        {
            id: 'gdrive',
            image: gdrive,
            title: 'GDrive',
            description: "A dedicated app for mastering the German driving license exam with interactive quizzes, featuring questions with attached videos and images for better understanding.",    
        },
        // {
        //     id: "green-wave",
        //     image: web10,
        //     title: 'green wave eco Loyalty Card',
        //     description: "An all-in-one VPN solution that keeps your data fully encrypted and securely protects you on any network you use.",
        // },
        // {
        //     id: "hen-bun",
        //     image: web11,
        //     title: "Hen'N Bun",
        //     description: "Hen’ N Bun is a modern restaurant that brings you the perfect blend of juicy grilled chicken, gourmet burgers, and flavorful sides.",
        // },
        // {
        //     id: "herbal-homeo",
        //     image: web12,
        //     title: 'herbal homeo',
        //     description: "We built Herbal Home Wellness as a user-friendly website that promotes natural healing through homeopathic care. The platform allows users to explore remedies, learn about treatments, and connect with practitioners all in one place.",
        // },
        // {
        //     id: "fitme",
        //     image: web13,
        //     title: 'fitme stylish',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        {
            id: "pak-truck",
            image: web14,
            title: 'pak truck',
            description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        },
        // {
        //     id: "sohaagan",
        //     image: web15,
        //     title: 'sohaagan',
        //     description: "We developed Sohaagan, a modern jewelry eCommerce platform with clean layouts, trending collections, advanced filters, and detailed product views for a seamless shopping experience.",
        // },
        // {
        //     id: 'filsx',
        //     image: filsx,
        //     title: 'filx digital wallet',
        //     description: "FilsX Digital Wallet empowers you to send, receive, and manage money securely anytime, anywhere. Enjoy instant transactions, smart budgeting tools, and a seamless digital experience designed for your everyday financial freedom.",
        // },
        // {
        //     id: "specoptics",
        //     image: web16,
        //     title: 'specoptics',
        //     description: "SpecOptics is an e-commerce platform designed to make choosing the perfect eyewear effortless and enjoyable.",
        // },
        // {
        //     id: "fresh-steps",
        //     image: web9,
        //     title: 'fresh steps',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        {
            id: 'paktruck',
            image: pakTruck,
            title: 'pak truck',
            description: "Pak Truck is a powerful platform for seamlessly buying, selling, and promoting trucks, buses, and spare parts.",
        },
        {
            id: 'blink-back',
            image: BlinkBack,
            title: 'blink back',
            description: "BlinkBack is a memories app that lets users capture and relive their special moments with ease, combining intuitive design and smooth navigation for a meaningful experience.",
        },
        //  {
        //     id: 'fitme',
        //     image: fitme,
        //     title: 'Fitme Stylish',
        //     description: "Fitme Stylish is global AI-powered fashion plateform that helps users visualize outfits, style their wardrobe, and receive peronalized daily outfit sugestions",    
        // },
        
        
        // {
        //     id: 'harmonized',
        //     image: harmon,
        //     title: 'harmonized',
        //     description: "Harmonized is a modern dating app built to explore profiles and connect effortlessly through smart matching and location-based search.",
        // },
         {
            id: "ubk-towing",
            image: web18,
            title: 'ubk towing',
            description: "UBK streamlines transportation operations by connecting admins, drivers, and vehicles in one unified system. We built a platform that simplifies vehicle assignments, document tracking, inspection monitoring, and performance analytics.",
        },
        {
            id: 'meCloset',
            image: meCloset,
            title: 'Me Closet',
            description: "MeCloset is a digital wardrobe app where users can save outfit photos, create stylish clothing pairs, and organize their looks by saving them in a built-in calendar for future use.", 
        },
        // {
        //     id: 'mego',
        //     image: mego,
        //     title: 'mego',
        //     description: "A secure and seamless digital marketplace for effortless online buying and selling, featuring a built-in reward system to enhance user engagement and benefits.", 
        // },
        // {
        //     id: 'quickly',
        //     image: quickly,
        //     title: 'quickly',
        //     description: "Quickly brings together books, podcasts, blogs, and news in one intelligent platform. With AI-generated summaries, translations, and audio listening options, it transforms how you consume information.", 
        // },
        {
            id: 'on-the-dot',
            image: sbp,
            title: 'service booking app',
            description: "We built it to make service discovery, booking, and scheduling seamless for customers, while enabling businesses to manage requests, appointments, and completed projects efficiently", 
        },
        // {
        //     id: 'healthful',
        //     image: helth,
        //     title: 'so healthful',
        //     description: "An AI-powered health app for seamless connections, medication tracking, health record management, and real-time vitals monitoring with smartwatch integration.",  
        // },
    ],
    
    "Web Development": [
        {
            id: "ubk-towing",
            image: web18,
            title: 'ubk towing',
            description: "UBK streamlines transportation operations by connecting admins, drivers, and vehicles in one unified system. We built a platform that simplifies vehicle assignments, document tracking, inspection monitoring, and performance analytics.",
        },
        {
            id: "flaty-web",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816184/Tanbnil_yujxor.png',
            title: 'Flaty.pk',
            description: "Flaty offers a seamless real estate experience where users can explore, buy, and sell properties effortlessly. ",
        },

        {
    id: "earning-dashboard",
    image: web3,
    title: 'earning dashboard',
    description: "An advanced analytics dashboard that enables businesses to monitor revenue, track financial performance, visualize key metrics, and generate real-time insights for smarter decision-making.",
},
        //  {
        //     id: "fresh-steps",
        //     image: web9,
        //     title: 'fresh steps',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "green-wave",
        //     image: web10,
        //     title: 'green wave eco Loyalty Card',
        //     description: "An all-in-one VPN solution that keeps your data fully encrypted and securely protects you on any network you use.",
        // },
        // {
        //     id: "hen-bun",
        //     image: web11,
        //     title: "Hen'N Bun",
        //     description: "Hen’ N Bun is a modern restaurant that brings you the perfect blend of juicy grilled chicken, gourmet burgers, and flavorful sides.",
        // },
        // {
        //     id: "herbal-homeo",
        //     image: web12,
        //     title: 'herbal homeo',
        //     description: "We built Herbal Home Wellness as a user-friendly website that promotes natural healing through homeopathic care. The platform allows users to explore remedies, learn about treatments, and connect with practitioners all in one place.",
        // },
        // {
        //     id: "fitme",
        //     image: web13,
        //     title: 'fitme stylish',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
       {
  id: "pak-truck",
  image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816195/Tanbnil_uurjnc.png',
  title: "Pak Truck",
  description:
    "A responsive logistics and transportation website designed to showcase trucking services, fleet information, shipment solutions, and customer-focused business operations.",
},
        // {
        //     id: "sohaagan",
        //     image: web15,
        //     title: 'sohaagan',
        //     description: "We developed Sohaagan, a modern jewelry eCommerce platform with clean layouts, trending collections, advanced filters, and detailed product views for a seamless shopping experience.",
        // },
        // {
        //     id: "specoptics",
        //     image: web16,
        //     title: 'specoptics',
        //     description: "SpecOptics is an e-commerce platform designed to make choosing the perfect eyewear effortless and enjoyable.",
        // },
        {
            id: "supply-king",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816196/Supply_king_kriepq.png',
            title: 'supply king',
            description: "Supply King is an e-commerce platform that simplifies bulk ordering and supply management with a clean interface and reliable tracking.",
        },
        // {
        //     id: "vendcommm",
        //     image: web19,
        //     title: 'vendcomm',
        //     description: "VendComm  simplifies collaboration between vendors and event managers with centralized dashboards, automated invoicing, real-time communication, and progress tracking, ensuring every campaign runs efficiently from planning to completion.",
        // },
        {
            id: "we-scale-hq",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816247/Tanbnil_aqcabk.png',
            title: 'we scale hq',
            description: "Fix sales leaks, train teams, and scale faster with We Scale HQ.",
        },
        // {
        //     id: "brum-mobile-tyre",
        //     image: brum,
        //     title: 'Mobile Tyre Service Website',
        //     description: "",
        // },
        // {
        //     id: "oxzmarkets",
        //     image: oxmmarket,
        //     title: 'Oxzmarkets',
        //     description: "A Trading website promoting Oxzmarkets, offering Forex and crypto trading, account types, platforms, and FAQs, highlighting easy access, global users, and opportunities to earn through investing and networking.",
        // },
        // {
        //     id: "diamond-yarm",
        //     image: diamond,
        //     title: 'diamond yarm',
        //     description: "This is an e-commerce website for a yarn and knitting supplies company that offers a wide range of products including yarn, needles, and crochet tools. The platform showcases various international brands and primarily caters to both retail and wholesale customers.",
        // },
        {
    id: "glasgow-mobile-car-wash",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816188/Tanbnil_fx9cux.png",
    title: "Glasgow Mobile Car Wash Website",
    description: "Glasgow Mobile Car Wash is a professional service platform that allows customers to conveniently book mobile car washing and detailing services. Experienced technicians travel directly to homes, workplaces, or preferred locations, delivering premium vehicle cleaning with a seamless online booking experience.",
},
        {
            id: "visaera",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816205/Tanbnil_idqvvd.png',
            title: 'visaera worldwide',
            description: "This platform is designed to provide comprehensive visa-related services and information for all countries worldwide. Users can access guidance, apply for visas, and explore requirements for different travel purposes through a single, convenient website.",
        },
        {
    id: "developers-door",
    image: "https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816121/Tanbnil_qtlfyd.png",
    title: "Developers Door",
    description: "Developers Door is a modern platform built for developers to discover learning resources, showcase projects, explore career opportunities, and stay connected with the latest technologies through a clean and intuitive user experience.",
},
        // {
        //     id: "techkyo-services",
        //     image: techkyo,
        //     title: 'Techkyo Services',
        //     description: "This is a corporate website for a technology company that offers a wide range of modern IT services. The platform showcases the company’s expertise in areas such as web development, cloud computing, and data center solutions.",
        // },
        // {
        //     id: "qrcode",
        //     image: meqr,
        //     title: 'QR Code Generator',
        //     description: "This is a web-based platform that allows users to generate QR codes for any link or text input. Simply paste your desired content, and the website will create a QR code instantly. The service is completely free of cost, and the generated QR codes do not expire, ensuring long-term usability.",
        // },
        // {
        //     id: "gulf-tutor",
        //     image: tutor,
        //     title: 'Gulf Tutor',
        //     description: "This is an online platform where both teachers and students can register separately. Students can search for suitable teachers and send a request for their preferred tutor. The request is reviewed by the admin, and upon approval, the teacher is assigned to the student.",
        // },
        // {
        //     id: "earning-dashboard-driver",
        //     image: web1,
        //     title: 'earning dashboard (driver side)',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "earning-dashboard-admin",
        //     image: web21,
        //     title: 'earning dashbaord admin side',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "add-main",
        //     image: web2,
        //     title: 'add main dashboard builder',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "earning-dashboard",
        //     image: web3,
        //     title: 'earning dashboard (admin side)',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "addmain-dashboard",
        //     image: web4,
        //     title: 'earning add main dashboard',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "fieldtrip-dashboard",
        //     image: web5,
        //     title: 'fieldTrip link driver dashboard',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "fieldtrip-landing",
        //     image: web6,
        //     title: 'fieldtrip link landing page',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        // {
        //     id: "fieldtrip-school",
        //     image: web7,
        //     title: 'fieldTrip link school dashboard',
        //     description: "UX Case Study: Kitab Cloud – A Comprehensive Reading Experience for Global Audiences",
        // },
        {
            id: "fieldtrip-link",
            image: 'https://res.cloudinary.com/dxsr1xve0/image/upload/v1782816177/Landing_Page_-_Tanbnil_mvc4xv.png',
            title: 'fieldTrip link',
            description: "FieldTrip – Safe School Travel, Simplified",
        },
       
    ],
};

// load all images
const allImages = Object.values(projects).flat().map(p => p.image);

useEffect(() => {
  allImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, []);

const categoryLabels = {
  "Mobile Apps": {
    mobile: "Mobile",
    desktop: "Mobile Apps"
  },
  "UI / UX Design": {
    mobile: "UI / UX",
    desktop: "UI / UX Design"
  },
  "Web Development": {
    mobile: "Web",
    desktop: "Web Development"
  }
};
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

const getLabel = (category) => {
  return isMobile
    ? categoryLabels[category]?.mobile || category
    : categoryLabels[category]?.desktop || category;
};

const [activeCategory, setActiveCategory] = useState(
  sessionStorage.getItem('activeCategory') || Object.keys(projects)[0]
);

// Copy of the active category's projects that gets rendered.
// Only the "UI / UX Design" category gets re-shuffled on each click (see onClick below).
const [displayedProjects, setDisplayedProjects] = useState(() => {
  const startCategory = sessionStorage.getItem('activeCategory') || Object.keys(projects)[0];
  return startCategory === "UI / UX Design"
    ? shuffleArray(projects[startCategory])
    : projects[startCategory];
});

// Save to sessionStorage whenever activeCategory changes
useEffect(() => {
  sessionStorage.setItem('activeCategory', activeCategory);
}, [activeCategory]);

useEffect(() => {
  const handleUnload = () => sessionStorage.removeItem('activeCategory');
  window.addEventListener('beforeunload', handleUnload);
  return () => window.removeEventListener('beforeunload', handleUnload);
}, []);


  const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0,    
    });

    const hasAnimated = useRef(false);

useEffect(() => {
  if (inView) hasAnimated.current = true;
}, [inView]);

    const container = {
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.3, // gap between cards
            },
        },
    };
    const items = {
        hidden: { y: 60, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

  const zoomIn = {
  hidden: {
    opacity: 0,
    scale: 0.15,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const [hovered, setHovered] = useState(false)
const [hoverId, setHoverId] = useState('')

  return (
     <section className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-4xl mx-auto mb-6">
      {/* <p className='text-base sm:text-lg text-primary font-medium mb-3'>My Portfolio</p> */}
    <motion.h2
    variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
    className="text-3xl font-semibold tracking-tight text-[#333] sm:text-4xl">My Previous Work</motion.h2>
    <motion.p
    variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
    className="mt-4 text-lg text-gray-500 w-full sm:w-[80%] mx-auto">You can explore my previous projects and see how I’ve helped clients turn ideas into engaging and high-performing products.</motion.p>
    </div>
    <div className='overflow-auto' style={{scrollbarWidth: 'none'}}>
    <div className='flex justify-center pl-3 w-full overflow-auto sm:w-full' style={{scrollbarWidth: 'none'}}>
        <div
        className="relative mb-5 w-fit overflow-auto sm:w-fit rounded-full bg-[#6E708B1F] flex poppins p-1">
            {Object.keys(projects).map((category) => (
             <button
  key={category}
  onClick={() => {
    setActiveCategory(category);
    setDisplayedProjects(
      category === "UI / UX Design"
        ? shuffleArray(projects[category])
        : projects[category]
    );
  }}
  className={`relative px-6 py-2.5 cursor-pointer sm:px-8 sm:py-2.5 capitalize font-medium text-sm sm:text-lg z-10
    transition-all duration-300
    ${
      activeCategory === category
        ? "text-white"
        : "text-[#6E708B] hover:text-gray-900  rounded-full"
    }
  `}
>
  {activeCategory === category && (
    <motion.span
      layoutId="activeTab"
      className="absolute inset-0 rounded-full bg-[#4ac3d5]"
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 40,
      }}
      style={{ zIndex: -1 }}
    />
  )}

  {getLabel(category)}
</button>
            ))}
        </div>
        </div>

    </div>
    <div>
      {/* cards */}
      <motion.div 
       ref={ref}
    variants={container}
    initial="hidden"
    animate={hasAnimated.current ? "visible" : (inView ? "visible" : "hidden")}
    // {...(isMobile
    //           ? { animate: "visible" } // no animation on mobile
    //           : { animate: inView ? "visible" : "hidden" })} 

      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
       {displayedProjects.map((item, index) => (
      <Link to={`/portfolio/${item.id}`}
            state={{ category: activeCategory }} 
        >

  <motion.div
//   ref={ref}
// variants={items}
// transition={{ duration: 0.3, ease: "easeOut" }}
    key={index}
    onMouseEnter={() => {setHovered(true); setHoverId(item.id)}}
    onMouseLeave={() => {setHovered(false); setHoverId('')}}
    className="relative rounded-xl overflow-hidden shadow-[0_2px_16px_0_#E3EBFC] hover:shadow-[0_4px_20px_0_#E3EBFC] transition-all duration-300 cursor-pointer "
  >
    {/* Image */}
    <img
      src={item.image}
      alt={item.title}
      className={`w-full h-[250px] sm:h-[400px] object-center sm:object-cover transition-transform duration-500 ${hovered && hoverId === item.id? 'scale-110' : ''}`}
    />

    {/* Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent ${hovered && hoverId === item.id? 'opacity-100' : 'opacity-0 '} transition-opacity duration-300`}></div>

    {/* Text Content */}
    <div className={`absolute bottom-6 right-16 pl-4 text-white transition-all duration-300  ${hovered && hoverId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
      <h3 className="text-2xl font-semibold mb-1 capitalize">
        {item.title}
      </h3>
      <p className="text-sm mb-2">
        {item.description}
      </p>
            {/* Hidden Link for SEO/Accessibility */}
            <a href={item.id} className="absolute inset-0">
              <span className="sr-only">View {item.title}</span>
            </a>
    </div>
  </motion.div>
  </Link>
))}
      </motion.div>
    </div>
    </div>
    </section>
  )
}

export default Portfoliopage