import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const StarIcon = ({ filled }) => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill={filled ? "#FBBF24" : "#E5E7EB"}>
    <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75z" />
  </svg>
);

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

function Avatar({ url, name, size = "md" }) {
  const [err, setErr] = useState(false);
  const dim = size === "sm" ? "w-8 h-8 text-xs" : "w-12 h-12 text-sm";
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  if (url && !err) {
    return (
      <img
        src={url}
        alt={name}
        onError={() => setErr(true)}
        className={`${dim} rounded-full object-cover ring-2 ring-white shadow-sm`}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br from-[#00bad6] to-[#03a5be] flex items-center justify-center text-white font-semibold ring-2 ring-white shadow-sm`}
    >
      {initials}
    </div>
  );
}

export default function TestimonialSlider({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const [isSingleView, setIsSingleView] = useState(false);
  const trackRef = useRef(null);

  const perPage = isSingleView ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / perPage);

  useEffect(() => {
    const check = () => setIsSingleView(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setCurrent(0); }, [isSingleView]);

  const cardWidthPercent = 100 / perPage;
  const gap = 16;

  return (
    <div className="w-full mt-10">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
          style={{
            transform: `translateX(calc(-${current * cardWidthPercent}% - ${current * gap}px))`,
            gap: `${gap}px`,
          }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              {...fadeUp(0.2 + idx * 0.1)}
              key={idx}
              // ── flex flex-col so mt-auto on author pins it to the bottom ──
              className="flex-shrink-0 flex flex-col px-5 py-9 bg-[#F7F7F7] rounded-3xl"
              style={{ width: `calc(${cardWidthPercent}% - ${gap * (perPage - 1) / perPage}px)` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < t.stars} />
                ))}
              </div>

              {/* Quote — grows to fill available space */}
              <p className="flex-1 text-[#64748B] font-medium text-sm sm:text-lg leading-relaxed mb-4 sm:mb-8 mt-4 mont">
                "{t.review}"
              </p>

              {/* Author — always pinned to the bottom */}
              <div className="flex items-center gap-4 mt-auto pt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Avatar url={t.avatarUrl} name={t.name} />
                </div>
                <div>
                  <p className="text-[#131B2E] font-semibold text-sm sm:text-base" style={{ letterSpacing: "0.01em" }}>
                    {t.name}
                  </p>
                  <p className="text-[#45464D] font-medium text-xs mt-0.5" style={{ letterSpacing: "0.04em" }}>
                    {t.designation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="#131B2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-1.5 items-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full border-none transition-all duration-300 ${
                i === current ? "w-2 h-2 bg-[#131B2E] scale-125" : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent((p) => Math.min(totalPages - 1, p + 1))}
          disabled={current >= totalPages - 1}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="#131B2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}