import { useState, useEffect, useRef } from "react";
import file from '../../../assets/icons/file.svg'
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Planning",
    description:
      "After collecting proper requirements, we start by breaking your project into clear milestones, with timelines and budgeting, to make sure every stage is organized and transparent.",
  },
  {
    id: 2,
    title: "Design",
    description:
      "We design all screens and workflows in Figma (or your preferred design tool) to ensure you are 100% confident before development begins. All requested changes are implemented before moving to development.",
    featured: false,
  },
  {
    id: 3,
    title: "Development",
    description:
      "Once the design is approved, we develop the product: frontend based on the approved design, and robust backend based on features, ensuring performance, scalability, and security.",
  },
  {
    id: 4,
    title: "Testing",
    description:
      "We conduct thorough testing to ensure your app is bug-free, responsive, and user-friendly. We handle the launch on App Store, Play Store, or web (domain, hosting, AWS or other platforms). We also provide all resources and code handover to you.",
  },
  {
    id: 5,
    title: "Launch",
    description:
      "Depending on your needs, we can also handle app marketing and ASO, ensuring your product reaches the right audience. Continuous maintenance keeps your app or web solution updated and performing optimally.",
  },
];


function ServiceRow({ service, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 110;

  return (
    <div
      className="pb-3 mb-2 lg:mb-4"
      style={{ position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* hover bg */}
      <div
        className="mb-3 bg-[#FFFFFF1A] border border-[#FFFFFF1A] shdaow-[0_2px_16px_0px_#00000005]"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          opacity: hovered ? 1 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />
      <div
        className="gap-3 lg:gap-6"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          padding: "20px 10px",
          cursor: "pointer",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: `opacity 0.6s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        }}
      >
        <div style={{ flex: 1 }} className="pl-2 lg:pl-3">
          <h3
            className="bg-[#FFFFFF1F] mb-3 lg:mb-5 rounded-full text-base w-11 h-11 flex items-center justify-center"
            style={{
              fontWeight: 600,
              color: service.featured ? "#fff" : "#fff",
            }}
          >
            0{service.id}
          </h3>
          <h3 className="mb-1 roboto lg:mb-4 font-medium text-sm lg:text-xl text-white">
            {service.title}
          </h3>
          <p
            className="font-regular text-sm leading-6 lg:leading-[1.75rem] lg:text-base mont text-white"
            style={{ color: "#FFFFFFCC" }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Large screens only: sticky left, scrolling right */
        @media (min-width: 1024px) {
          .ss-left {
            flex: 0 0 45%;
            position: sticky;
            top: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: start;
            padding: 80px 0;
          }
          .ss-right {
            flex: 1;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 80px 0;
          }
        }

        /* Below lg: stacked, no sticky */
        @media (max-width: 1023px) {
          .ss-left {
            position: relative;
            height: auto;
            padding: 40px 0 20px;
            width: 100%;
          }
          .ss-right {
            min-height: unset;
            padding: 0 0 10px;
            width: 100%;
          }
        }
      `}</style>

      <div className="w-full !bg-[#091114]" ref={sectionRef}>
        <div className="w-[88%] mx-auto py-10">

          <div className="flex flex-col lg:flex-row items-start justify-between lg:gap-20">

            {/* ── LEFT ── */}
            <div className="ss-left">
              <p className="text-base lg:text-xl text-[#fff] font-semibold -mt-8">Our Process</p>

              <h2 className="py-4 mont text-white font-semibold leading-8 lg:leading-13 text-[26px] lg:text-[48px] w-full">
                Our Product<br /> <span className="text-[#A5D283]">Development Process</span>
              </h2>

              <p className="text-[#FFFFFFCC] font-medium text-sm lg:text-base mt-1.5 lg:mt-0 mont">
                Our Product Development Process is designed to turn your ideas into impactful solutions. From discovery and planning to design, development, testing, and launch, we ensure a smooth journey.
              </p>

              {/* CTA card — visible on lg+ */}
              <div className="mt-10 lg:mt-26 py-5 px-6 w-full hidden lg:block lg:w-[85%] border border-[#FFFFFF14] bg-[#FFFFFF08] rounded-[16px]">
                <img src={file} className="lg:w-11 lg:h-11 w-8 h-8" alt="file" />
                <h2 className="mont text-white font-medium text-[17px] lg:text-[24px] mt-6 mb-3">Ready to build something great?</h2>
                <p className="text-[#FFFFFFCC] font-regular text-sm lg:text-base">
                  Let's turn your idea into a product your users will love.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-[#A5D283] w-full lg:w-auto border border-[#A5D283] rounded-full py-2 px-6 shadow-[0_4px_4px_0_#00000040] mt-6 font-medium text-sm lg:text-base"
                >
                  Start a project
                </button>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="ss-right relative">
              <div className="sticky">
                <div className="bg-[#4AC3D533] absolute right-0 w-[138px] h-[225px] rounded-full top-0 blur-[84px]"></div>
                <div className="bg-[#4AC3D533] absolute right-0 w-[138px] h-[225px] rounded-full top-100 blur-[84px]"></div>
              </div>
              {services.map((service, i) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  index={i}
                  visible={visible}
                />
              ))}
            </div>

            {/* CTA card — visible below lg */}
            <div className="py-5 px-6 w-full block lg:hidden border border-[#FFFFFF14] bg-[#FFFFFF08] rounded-[16px] mb-8">
              <img src={file} className="w-8 h-8" alt="file" />
              <h2 className="mont text-white font-medium text-[17px] mt-6 mb-3">Ready to build something great?</h2>
              <p className="text-[#FFFFFFCC] font-regular text-sm">
                Let's turn your idea into a product your users will love.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="text-[#A5D283] w-full border border-[#A5D283] rounded-full py-2 px-6 shadow-[0_4px_4px_0_#00000040] mt-6 font-medium text-sm"
              >
                Start a project
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}