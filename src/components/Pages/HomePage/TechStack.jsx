import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  CodeSquare, Sparkles, Layers, Cpu, Bot, Brain, Figma,
  Palette, PenTool, Database, Server, Cloud, GitBranch,
  Container, Workflow, Code, Zap, RefreshCcw, Package,
  Shield, Flame, Table, Feather, FileCode
} from "lucide-react";

const TechStack = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
  const tab = searchParams.get("tab");

  if (tab && tools[tab]) {
    setActiveCategory(tab);

    setTimeout(() => {
      document
        .getElementById("technology-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }
}, [searchParams]);

  const tools = {
    Frontend: {
      Website: [
        { id: "web-development",       icon: <CodeSquare className="w-4 h-4 sm:w-5 sm:h-5" />, title: "React" },
        { id: "wordpress",             icon: <Layers     className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Tailwind CSS" },
        { id: "ecommerce-development", icon: <Code       className="w-4 h-4 sm:w-5 sm:h-5" />, title: "TypeScript" },
        { id: "frontend-development",  icon: <Code       className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Java" },
        { id: "frontend-development2", icon: <Sparkles   className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Next.js" },
      ],
      Application: [
        { id: "flutter-app", icon: <Server     className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Flutter" },
        { id: "vite",        icon: <Zap        className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Vite" },
        { id: "redux",       icon: <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Redux" },
        { id: "react-query", icon: <Server     className="w-4 h-4 sm:w-5 sm:h-5" />, title: "React Query" },
        { id: "swift",       icon: <Feather    className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Swift" },
      ],
    },
    "Backend": [
      { id: "nodejs",   icon: <Cpu        className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Node.js" },
      { id: "php",      icon: <FileCode   className="w-4 h-4 sm:w-5 sm:h-5" />, title: "PHP" },
      { id: "python",   icon: <CodeSquare className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Python" },
      { id: "django",   icon: <Shield     className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Django" },
      { id: "laravel",  icon: <Package    className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Laravel" },
      { id: "firebase", icon: <Flame      className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Firebase" },
      { id: "mongodb",  icon: <Database   className="w-4 h-4 sm:w-5 sm:h-5" />, title: "MongoDB" },
      { id: "mysql",    icon: <Table      className="w-4 h-4 sm:w-5 sm:h-5" />, title: "MySQL" },
    ],
    "AI/ML": [
      { id: "machine-learning", icon: <Cpu      className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Machine Learning" },
      { id: "deep-learning",    icon: <Brain    className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Deep Learning" },
      { id: "generative-ai",    icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Generative AI" },
      { id: "chatbots",         icon: <Bot      className="w-4 h-4 sm:w-5 sm:h-5" />, title: "AI Chatbots" },
      { id: "nlp",              icon: <Brain    className="w-4 h-4 sm:w-5 sm:h-5" />, title: "NLP" },
      { id: "ai-automation",    icon: <Workflow className="w-4 h-4 sm:w-5 sm:h-5" />, title: "AI Automation" },
    ],
    "UI/UX": [
      { id: "adobe-xd",    icon: <Palette  className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Adobe XD" },
      { id: "illustrator", icon: <PenTool  className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Illustrator" },
      { id: "figma",       icon: <Figma    className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Figma Design" },
      { id: "prototyping", icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Prototyping" },
    ],
    
    "Database": [
      { id: "db-mysql",    icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, title: "MySQL" },
      { id: "postgresql",  icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, title: "PostgreSQL" },
      { id: "db-mongodb",  icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, title: "MongoDB" },
      { id: "db-firebase", icon: <Flame    className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Firebase Database" },
      { id: "redis",       icon: <Server   className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Redis" },
      { id: "sql-server",  icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, title: "SQL Server" },
    ],
    "Cloud & Infra": [
      { id: "aws",            icon: <Cloud     className="w-4 h-4 sm:w-5 sm:h-5" />, title: "AWS Cloud" },
      { id: "google-cloud",   icon: <Cloud     className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Google Cloud" },
      { id: "docker",         icon: <Container className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Docker" },
      { id: "kubernetes",     icon: <Server    className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Kubernetes" },
      { id: "cicd",           icon: <GitBranch className="w-4 h-4 sm:w-5 sm:h-5" />, title: "CI/CD Pipelines" },
      { id: "infra-firebase", icon: <Flame     className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Firebase" },
      { id: "azure",          icon: <Workflow  className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Azure" },
      { id: "devops",         icon: <Workflow  className="w-4 h-4 sm:w-5 sm:h-5" />, title: "DevOps Automation" },
    ],
  };

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(Object.keys(tools)[0]);

  // Smart grid: max 5 cols, adjusts based on item count
  const getGridClass = (count) => {
    if (count <= 2) return "grid grid-cols-2";
    if (count === 3) return "grid grid-cols-2 sm:grid-cols-3";
    if (count === 4) return "grid grid-cols-2 sm:grid-cols-4";
    if (count === 5) return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
    if (count === 6) return "grid grid-cols-2 sm:grid-cols-3";
    // 7–8: 2 mobile → 4 tablet → 5 desktop
    return "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5";
  };

  // Single card — uses whileInView directly, NO external ref
  const CardItem = ({ course, delay = 0 }) => (
    <Link>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut", delay }}
        className="flex items-center justify-center gap-2 sm:gap-3 bg-[#f2f2f274] border border-[#3333331c] cursor-pointer py-3 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-6 rounded-full w-full hover:bg-[#4AC3D510] hover:border-[#4AC3D540] transition-colors duration-200"
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 text-[#333] flex items-center justify-center flex-shrink-0">
          {course.icon}
        </div>
        <h2 className="font-semibold text-[#333] text-xs sm:text-sm lg:text-base whitespace-nowrap">
          {course.title}
        </h2>
      </motion.div>
    </Link>
  );

  // Grid wrapper — no ref, no useInView
  const CardsGrid = ({ items }) => (
    <div className={`${getGridClass(items.length)} gap-3 sm:gap-4 lg:gap-5`}>
      {items.map((course, index) => (
        <CardItem key={course.id} course={course} delay={index * 0.07} />
      ))}
    </div>
  );

  return (
    <div
      id="technology-section"

    className="mont pt-16 sm:pt-0">
      <div className="w-full pt-0 sm:pt-14 pb-14 mx-auto min-h-[85vh] rounded-none px-4 sm:px-8 lg:px-10 relative">

        {/* Heading */}
        <div className="mb-4 sm:mb-8 mt-0 sm:mt-4 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#333] sm:text-4xl lg:text-[48px]">
            Technology We Use
          </h1>
        </div>

        {/* Tab Bar */}
        <div
          className="w-full overflow-x-auto my-2 mt-4 sm:mt-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.tab-scroll::-webkit-scrollbar{display:none}`}</style>
          <div className="flex justify-center px-3">
            <div className="tab-scroll flex items-center bg-[#f2f2f274] py-2 sm:py-3 px-2 sm:px-5 rounded-[20px] overflow-x-auto max-w-full">
              {Object.keys(tools).map((category) => (
                <button
                  key={category}
                  className={`whitespace-nowrap flex-shrink-0 px-3 sm:px-4 py-2 font-semibold cursor-pointer capitalize text-xs sm:text-sm lg:text-base transition-colors duration-200 ${
                    activeCategory === category
                      ? "text-white bg-[#4AC3D5] rounded-full"
                      : "text-[#333333E5] hover:text-[#4AC3D5]"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="px-0 sm:px-6 lg:px-9 mt-6 sm:mt-8 relative z-10">
          {activeCategory === "Frontend" ? (
            <div className="flex flex-col gap-6 sm:gap-8">
              {Object.entries(tools.Frontend).map(([group, items]) => (
                <div key={group}>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#333] mb-3 sm:mb-4">
                    {group}
                  </h3>
                  <CardsGrid items={items} />
                </div>
              ))}
            </div>
          ) : (
            <CardsGrid key={activeCategory} items={tools[activeCategory]} />
          )}
        </div>

      </div>
    </div>
  );
};

export default TechStack;