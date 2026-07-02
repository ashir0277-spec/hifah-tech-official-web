import { BarChart3, Brain, Cpu, Database, DessertIcon, Figma, GalleryHorizontal, Grid, Layers, Layout, MessageSquare, Palette, Pen, Search, ShieldCheck, ShoppingCart, Smartphone, Target, TrendingUp, User, Users, Zap, Mail, Globe, Scissors, Music, Sparkles, Play, Clock, Film } from 'lucide-react'

 export const ServicesData = {
  "ui-ux-designing": {
    hero: {
        tag: 'UI/UX Design',
        title: 'Creative Digital',
        colorTitle: 'User Experiences',
        description: 'We craft intuitive, engaging, and visually appealing designs that enhance user satisfaction and drive meaningful interactions across digital products.',
    },
    experties :[
        {
            icon: <Palette className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'UI Design',
            w: 47,
            desc: 'Designing modern, visually engaging interfaces using tools like Figma to strengthen your brand identity and boost user engagement.',  
        },
        {
            icon: <Users className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'UX Research',
            w: 24,
            desc: 'Analyzing user behavior to improve experience.',  
        },
        {
            icon: <Layout className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Wireframing',
            w: 23,
            desc: 'Creating structured user flows and layouts.',  
        },
        {
            icon: <Smartphone className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 47,
            title: 'Mobile App Design',
            desc: 'Designing high-performance mobile experiences using modern design systems to ensure smooth usability, consistency, and better user retention.',  
        },
        {
            icon: <Layers className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 48,
            title: 'Prototyping',
            desc: 'Building interactive prototypes with tools like Figma and Adobe XD to test ideas, validate flows, and reduce development risks before launch.',  
        },
    ],
    tools: [ "Figma", "Adobe XD", "Sketch", "InVision", "Photoshop", "Illustrator"],
    points: [
        {
            icon: <User className='w-5 h-5 sm:w-6 sm:h-6' />, 
            title: 'User-Centered Design',
            text: 'Built around user needs.'
        },
        {
            icon: <Search className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Research Driven',
            text: 'Insights-based design.'
        },
        {
            icon: <Grid className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Structured Layouts',
            text: 'Clear visual hierarchy.'
        },
        {
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Usability Focused',
            text: 'Easy and intuitive use.'
        },
        {
            icon: <Palette className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Visual Excellence',
            text: 'Modern, engaging UI.'
        },
    ]
},
  "web-development": {
    hero: {
        tag: 'Web Development',
        title: 'Streamlined Enterprise',
        colorTitle: 'Workflow Design',
        description: 'Optimize your business operations with our expert-led architectural analysis. We map, measure, and modernize your internal service delivery systems.',
    },
    experties :[
        {
            icon: <DessertIcon className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Frontend Development',
            w: 47,
            desc: 'Building immersive, responsive user interfaces using modern frameworks like React and Next.js.',  
        },
        {
            icon: <Database className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Backend',
            w: 24,
            desc: 'Robust API design and secure server architectures.',  
        },
        {
            icon: <ShoppingCart className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'E-commerce',
            w: 23,
            desc: 'Conversion-focused online stores.',  
        },
        {
            icon: <DessertIcon className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 47,
            title: 'Full Stack Solutions',
            desc: 'End-to-end development tailored to your business logic, ensuring seamless communication between the UI and the data layer.',  
        },
        {
            icon: <Layers className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 48,
            title: 'WordPress',
            desc: 'End-to-end development tailored to your business logic, ensuring seamless communication between the UI and the data layer.',  
        },
    ],
    tools: [ "HTML5", "CSS", "JavaScript", "React", "Next.js", "Node.js"],
    points: [
        {
            icon: (<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 22.5V6.25H6.25V0H22.5V22.5H0ZM16.25 20H20V2.5H8.75V6.25H16.25V20ZM8.75 20H13.75V8.75H8.75V20ZM2.5 20H6.25V8.75H2.5V20ZM16.25 6.25V8.75V6.25Z" fill="#4AC3D5"/>
</svg>
),
            title: 'User-Centered Design',
            text: 'Built around real user needs.'
        },
        {
            icon: <Search className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Seamless Experiences',
            text: 'Smooth user journeys.'
        },
        {
            icon: (<svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5625 14.375C11.0625 14.875 11.7083 15.1198 12.5 15.1094C13.2917 15.099 13.875 14.8125 14.25 14.25L21.25 3.75L10.75 10.75C10.1875 11.125 9.89062 11.6979 9.85938 12.4688C9.82812 13.2396 10.0625 13.875 10.5625 14.375ZM12.5 0C13.7292 0 14.9115 0.171875 16.0469 0.515625C17.1823 0.859375 18.25 1.375 19.25 2.0625L16.875 3.5625C16.1875 3.20833 15.474 2.94271 14.7344 2.76562C13.9948 2.58854 13.25 2.5 12.5 2.5C9.72917 2.5 7.36979 3.47396 5.42188 5.42188C3.47396 7.36979 2.5 9.72917 2.5 12.5C2.5 13.375 2.61979 14.2396 2.85938 15.0938C3.09896 15.9479 3.4375 16.75 3.875 17.5H21.125C21.6042 16.7083 21.9531 15.8854 22.1719 15.0312C22.3906 14.1771 22.5 13.2917 22.5 12.375C22.5 11.625 22.4115 10.8958 22.2344 10.1875C22.0573 9.47917 21.7917 8.79167 21.4375 8.125L22.9375 5.75C23.5625 6.72917 24.0573 7.77083 24.4219 8.875C24.7865 9.97917 24.9792 11.125 25 12.3125C25.0208 13.5 24.8854 14.6354 24.5938 15.7188C24.3021 16.8021 23.875 17.8333 23.3125 18.8125C23.0833 19.1875 22.7708 19.4792 22.375 19.6875C21.9792 19.8958 21.5625 20 21.125 20H3.875C3.4375 20 3.02083 19.8958 2.625 19.6875C2.22917 19.4792 1.91667 19.1875 1.6875 18.8125C1.14583 17.875 0.729167 16.8802 0.4375 15.8281C0.145833 14.776 0 13.6667 0 12.5C0 10.7708 0.328125 9.15104 0.984375 7.64062C1.64062 6.13021 2.53646 4.80729 3.67188 3.67188C4.80729 2.53646 6.13542 1.64062 7.65625 0.984375C9.17708 0.328125 10.7917 0 12.5 0Z" fill="#4AC3D5"/>
</svg>
),
            title: 'Consistent Interfaces',
            text: 'Unified design language.'
        },
        {
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Accessibility Focused',
            text: 'Designs that are usable.'
        },
        {
            icon: <Palette className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Engaging Visual Design',
            text: 'Modern, conversion-driven UI.'
        },
    ]
  },
  "app-development": {
    hero: {
        tag: 'App Development',
        title: 'Next-Gen Mobile',
        colorTitle: 'App Solutions',
        description: 'Transform your ideas into high-performing mobile applications. We design, build, and optimize apps that deliver seamless user experiences and real business impact.',
    },
    experties :[
        {
            icon: <DessertIcon className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Mobile App Development',
            w: 47,
            desc: 'Building fast, scalable, and user-friendly mobile applications for Android and iOS platforms.',  
        },
        {
            icon: <Database className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Backend Integration',
            w: 24,
            desc: 'Secure APIs and efficient server-side architecture.',  
        },
        {
            icon: <Palette className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'App UI/UX Design',
            w: 23,
            desc: 'User-focused, clean mobile interfaces.',  
        },
        {
            icon: <DessertIcon className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 47,
            title: 'Cross-Platform Apps',
            desc: 'End-to-end development ensuring smooth performance across multiple devices and operating systems.',  
        },
        {
    icon: <DessertIcon className='w-5 h-5 sm:w-7 sm:h-7' />,
    w: 47,
    title: 'App Deployment',
    desc: 'From CI/CD pipelines to cloud infrastructure, we handle seamless deployments with zero downtime across staging and production environments.',
},
        {
            icon: <Layers className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 48,
            title: 'App Maintenance',
            desc: 'Continuous updates, performance optimization, bug fixing, and ensuring long-term app stability and reliability.',  
        },
    ],
    tools: [ "Flutter", "React Native", "Firebase", "Node.js", "Android Studio", "Figma"],
    points: [
        {
            icon: <Search className='w-5 h-5 sm:w-6 sm:h-6' />, 
            title: 'Performance Driven',
            text: 'Optimized for speed.'
        },
        {
            icon: <Search className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Seamless Experience',
            text: 'Smooth app navigation.'
        },
        {
            icon: <Search className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Scalable Solutions',
            text: 'Built for future growth.'
        },
        {
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Secure Architecture',
            text: 'Data protection focused.'
        },
        {
            icon: <Palette className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Modern UI Design',
            text: 'Clean, engaging layouts.'
        },
    ]
},
  "digital-marketing": {
    hero: {
        tag: 'Digital Marketing',
        title: 'Growth Focused',
        colorTitle: 'Marketing Strategies',
        description: 'We help businesses grow online with data-driven marketing strategies that increase visibility, attract the right audience, and drive real conversions.',
    },
    experties :[
        {
            icon: <TrendingUp className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Social Media Marketing',
            w: 47,
            desc: 'We run high-performing campaigns to boost brand awareness, engagement, and audience growth.',  
        },
        {
            icon: <Search className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'SEO Optimization',
            w: 24,
            desc: 'Improving rankings to drive organic traffic.',  
        },
        {
            icon: <Mail className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Email Marketing',
            w: 23,
            desc: 'Engaging users through targeted campaigns.',  
        },
        {
            icon: <BarChart3 className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 47,
            title: 'Paid Advertising',
            desc: 'We run targeted ad campaigns to maximize ROI, generate quality leads, and grow your business efficiently.',  
        },
        {
            icon: <Globe className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 48,
            title: 'Content Marketing',
            desc: 'Creating valuable, SEO-friendly content that builds authority, attracts the right audience, and turns visitors into long-term customers.',  
        },
    ],
    tools: [ "Google Ads", "Meta Ads Manager", "Google Analytics", "SEMrush", "Ahrefs", "Mailchimp"],
    points: [
        {
            icon: <Target className='w-5 h-5 sm:w-6 sm:h-6' />, 
            title: 'Targeted Reach',
            text: 'Right audience focus.'
        },
        {
            icon: <TrendingUp className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Growth Driven',
            text: 'Scalable strategies.'
        },
        {
            icon: <BarChart3 className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Data Insights',
            text: 'Performance tracking.'
        },
        {
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Brand Trust',
            text: 'Credibility building.'
        },
        {
            icon: <Zap className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'High Conversions',
            text: 'Results that matter.'
        },
    ]
},
  "ai-solutions": {
    hero: {
        tag: 'AI & Machine Learning',
        title: 'Intelligent Digital',
        colorTitle: 'Automation Systems',
        description: 'We build smart AI-powered solutions that automate processes, uncover insights, and help businesses make faster, data-driven decisions.',
    },
    experties :[
        {
            icon: <Brain className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'AI Solutions',
            w: 47,
            desc: 'We develop smart systems that automate processes, improve efficiency, and deliver better business results.',  
        },
        {
            icon: <Database className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Data Processing',
            w: 24,
            desc: 'Handling data for accurate predictions.',  
        },
        {
            icon: <MessageSquare className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Chatbots',
            w: 23,
            desc: 'Automated customer interaction systems.',  
        },
        {
            icon: <Cpu className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 47,
            title: 'Machine Learning Models',
            desc: 'Building and training predictive models using advanced algorithms to analyze patterns, forecast trends, and support better decision-making.',  
        },
        {
            icon: <Layers className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 48,
            title: 'AI Integration',
            desc: 'Seamlessly integrating AI capabilities into existing systems and applications to enhance performance, automation, and overall user experience.',  
        },
    ],
    tools: [ "Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Pandas"],
    points: [
        {
            icon: <Zap className='w-5 h-5 sm:w-6 sm:h-6' />, 
            title: 'Smart Automation',
            text: 'Reduce manual work.'
        },
        {
            icon: <TrendingUp className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Predictive Insights',
            text: 'Data-driven decisions.'
        },
        {
            icon: <BarChart3 className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Advanced Analytics',
            text: 'Deep data analysis.'
        },
        {
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Secure Systems',
            text: 'Reliable AI solutions.'
        },
        {
            icon: <Cpu className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Scalable Models',
            text: 'Built for growth.'
        },
    ]
},



  "business-strategy": {
    hero: {
        tag: 'Business Strategy',
        title: 'Streamlined Enterprise',
        colorTitle: 'Workflow Design',
        description: 'Optimize your business operations with our expert-led architectural analysis. We map, measure, and modernize your internal service delivery systems.',
    },
    experties :[
        {
            icon: <DessertIcon className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Frontend Development',
            w: 47,
            desc: 'Building immersive, responsive user interfaces using modern frameworks like React and Next.js.',  
        },
        {
            icon: <Database className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Backend',
            w: 24,
            desc: 'Robust API design and secure server architectures.',  
        },
        {
            icon: <ShoppingCart className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'E-commerce',
            w: 23,
            desc: 'Conversion-focused online stores.',  
        },
        {
            icon: <DessertIcon className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 47,
            title: 'Full Stack Solutions',
            desc: 'End-to-end development tailored to your business logic, ensuring seamless communication between the UI and the data layer.',  
        },
        {
            icon: <Layers className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 48,
            title: 'WordPress',
            desc: 'End-to-end development tailored to your business logic, ensuring seamless communication between the UI and the data layer.',  
        },
    ],
    tools: [ "HTML5", "CSS", "JavaScript", "React", "Next.js", "Node.js"],


   points: [
        {
            icon: (<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 22.5V6.25H6.25V0H22.5V22.5H0ZM16.25 20H20V2.5H8.75V6.25H16.25V20ZM8.75 20H13.75V8.75H8.75V20ZM2.5 20H6.25V8.75H2.5V20ZM16.25 6.25V8.75V6.25Z" fill="#4AC3D5"/>
            </svg>),
            title: 'Strategic Planning',
            text: 'Clear growth roadmap.'
        },
        {
            icon: <Search className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Market Research',
            text: 'Insights-driven decisions.'
        },
        {
            icon: (<svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5625 14.375C11.0625 14.875 11.7083 15.1198 12.5 15.1094C13.2917 15.099 13.875 14.8125 14.25 14.25L21.25 3.75L10.75 10.75C10.1875 11.125 9.89062 11.6979 9.85938 12.4688C9.82812 13.2396 10.0625 13.875 10.5625 14.375ZM12.5 0C13.7292 0 14.9115 0.171875 16.0469 0.515625C17.1823 0.859375 18.25 1.375 19.25 2.0625L16.875 3.5625C16.1875 3.20833 15.474 2.94271 14.7344 2.76562C13.9948 2.58854 13.25 2.5 12.5 2.5C9.72917 2.5 7.36979 3.47396 5.42188 5.42188C3.47396 7.36979 2.5 9.72917 2.5 12.5C2.5 13.375 2.61979 14.2396 2.85938 15.0938C3.09896 15.9479 3.4375 16.75 3.875 17.5H21.125C21.6042 16.7083 21.9531 15.8854 22.1719 15.0312C22.3906 14.1771 22.5 13.2917 22.5 12.375C22.5 11.625 22.4115 10.8958 22.2344 10.1875C22.0573 9.47917 21.7917 8.79167 21.4375 8.125L22.9375 5.75C23.5625 6.72917 24.0573 7.77083 24.4219 8.875C24.7865 9.97917 24.9792 11.125 25 12.3125C25.0208 13.5 24.8854 14.6354 24.5938 15.7188C24.3021 16.8021 23.875 17.8333 23.3125 18.8125C23.0833 19.1875 22.7708 19.4792 22.375 19.6875C21.9792 19.8958 21.5625 20 21.125 20H3.875C3.4375 20 3.02083 19.8958 2.625 19.6875C2.22917 19.4792 1.91667 19.1875 1.6875 18.8125C1.14583 17.875 0.729167 16.8802 0.4375 15.8281C0.145833 14.776 0 13.6667 0 12.5C0 10.7708 0.328125 9.15104 0.984375 7.64062C1.64062 6.13021 2.53646 4.80729 3.67188 3.67188C4.80729 2.53646 6.13542 1.64062 7.65625 0.984375C9.17708 0.328125 10.7917 0 12.5 0Z" fill="#4AC3D5"/>
            </svg>),
            title: 'Performance Tracking',
            text: 'Measurable outcomes.'
        },
        {
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Risk Management',
            text: 'Proactive risk control.'
        },
        {
            icon: <Palette className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Brand Positioning',
            text: 'Stand out in market.'
        },
    ]
    
  },




  "video-editing": {
    hero: {
        tag: 'Video Editing',
        title: 'Creative Visual',
        colorTitle: 'Storytelling Content',
        description: 'We create high-quality, engaging video content that captures attention, tells your story, and drives audience engagement across digital platforms.',
    },
    experties :[
        {
            icon: <Film className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Video Editing',
            w: 47,
            desc: 'Crafting professional videos using tools like Premiere Pro to deliver smooth cuts, engaging storytelling, and high-quality visual output for your brand.',  
        },
        {
            icon: <Scissors className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Cut & Trim',
            w: 24,
            desc: 'Precise editing for clean visuals.',  
        },
        {
            icon: <Music className='w-5 h-5 sm:w-7 sm:h-7' />,
            title: 'Sound Design',
            w: 23,
            desc: 'Enhancing videos with audio.',  
        },
        {
            icon: <Sparkles className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 47,
            title: 'Motion Graphics',
            desc: 'Adding dynamic animations and visual effects using tools like After Effects to make your content more engaging, professional, and visually impactful.',  
        },
        {
            icon: <Layers className='w-5 h-5 sm:w-7 sm:h-7' />,
            w: 48,
            title: 'Color Grading',
            desc: 'Enhancing video visuals with cinematic color correction techniques to create consistent tone, mood, and a polished professional look across all content.',  
        },
    ],
    tools: [ "Adobe Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve", "CapCut", "Filmora"],
    points: [
        {
            icon: <Play className='w-5 h-5 sm:w-6 sm:h-6' />, 
            title: 'Engaging Content',
            text: 'Captures attention fast.'
        },
        {
            icon: <Zap className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'High Quality',
            text: 'Crisp, clean visuals.'
        },
        {
            icon: <Clock className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Fast Delivery',
            text: 'Quick turnaround time.'
        },
        {
            icon: <ShieldCheck className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Professional Output',
            text: 'Polished final results.'
        },
        {
            icon: <Sparkles className='w-5 h-5 sm:w-6 sm:h-6' />,
            title: 'Creative Touch',
            text: 'Unique visual style.'
        },
    ]
},
};