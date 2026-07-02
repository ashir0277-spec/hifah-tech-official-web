import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    stars: 5,
    quote:
      "We were struggling to find quality React developers for months. Developer Door matched us with DevSquad in 48 hours. The project was delivered ahead of schedule.",
    name: "Sarah Jenkins",
    title: "CTO, FinTech Global",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    stars: 4,
    quote:
      "The quality of developers we found through Developer Door was exceptional. Our startup went from zero to product in 6 weeks. Couldn't have done it without them.",
    name: "Marcus Reeve",
    title: "Founder, NovaTech",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    stars: 4,
    quote:
      "We scaled our engineering team by 3x in a single quarter. Developer Door's vetting process saved us months of recruiting headaches and the talent quality speaks for itself.",
    name: "Priya Mehta",
    title: "VP Engineering, ScaleAI",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

function StarIcon({ filled }) {
  return (
    <svg
      className={`sm:w-8 sm:h-8 h-7 w-7 ${filled ? "text-[#FFB70E]" : "text-white/20"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ChevronIcon({ direction }) {
  return (
    <ArrowRight className={`text-white w-4 h-4 ${direction === "left" ? '-rotate-180' : ''}`} />
  );
}

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [slideState, setSlideState] = useState("idle"); // idle | exit | enter
  const [direction, setDirection] = useState(null);
  const [displayed, setDisplayed] = useState(0);
  const timeoutRef = useRef(null);

  const navigate = (nextIndex, dir) => {
    if (slideState !== "idle") return;
    setDirection(dir);
    setSlideState("exit");

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayed(nextIndex);
      setCurrent(nextIndex);
      setSlideState("enter");
      timeoutRef.current = setTimeout(() => {
        setSlideState("idle");
        setDirection(null);
      }, 400);
    }, 300);
  };

  const prev = () => navigate((current - 1 + testimonials.length) % testimonials.length, "right");
  const next = () => navigate((current + 1) % testimonials.length, "left");

  const t = testimonials[displayed];

  const contentStyle = (() => {
    if (slideState === "exit") {
      return {
        opacity: 0,
        transform: direction === "left" ? "translateX(-40px)" : "translateX(40px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      };
    }
    if (slideState === "enter") {
      return {
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
      };
    }
    return { opacity: 1, transform: "translateX(0)", transition: "none" };
  })();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div>

        <motion.div 
         initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        viewport={{ once: true }}
        className="relative w-full max-w-7xl mx-auto mt-4 sm:mt-10 mont">
          {/* Card */}
          <div className="relative overflow-hidden bg-[#F2F2F2] rounded-lg py-6 sm:py-11 py-4 sm:px-15">
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px"/>

            {/* Animated content */}
            <div className="px-5 items-center" style={contentStyle}>
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < t.stars} />
                ))}
              </div>

            <p className="text-[#555] text-center text-xl sm:text-2xl font-semibold leading-7 sm:leading-relaxed">Help us improve our productivity</p>
             
                <div>

              {/* Quote */}
              <p
                className="text-[#454648] text-center font-medium text-sm sm:text-base w-[80%] mx-auto leading-relaxed mb-4 sm:mb-8 mt-4 mont"
              >
                {t.quote}
              </p>

              <div className="flex justify-center">

              {/* Author */}
              <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[#101828] font-medium text-sm sm:text-base" style={{ letterSpacing: "0.01em" }}>
                   {t.name}
                  </p>
                  <p className="text-[#475467] font-medium text-sm sm:text-base mt-0.5" style={{ letterSpacing: "0.04em" }}>
                    {t.title}
                  </p>
                </div>
              </div>
              </div>

              </div>

            </div>
          </div>
        </motion.div>
        {/* Arrows */}
              <div className="flex items-center justify-center gap-3 mt-6">
                {[
                  { label: "prev", fn: prev, dir: "left" },
                  { label: "next", fn: next, dir: "right" },
                ].map(({ label, fn, dir }) => (
                  <button
                    key={label}
                    onClick={fn}
                    disabled={slideState !== "idle"}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 group"
                    style={{
                      background: "#4AC3D5",
                    }}
                   
                  >
                    <span className="text-black transition-colors duration-200">
                      <ChevronIcon direction={dir} />
                    </span>
                  </button>
                ))}
              </div>
      </div>
    </>
  );
}