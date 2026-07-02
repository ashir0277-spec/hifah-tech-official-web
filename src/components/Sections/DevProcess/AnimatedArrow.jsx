import { useEffect, useRef, useState } from "react";

const LEFT_PATH = "M10 4.77356L0 5.67436e-05V11.5471L10 6.77356V4.77356ZM9 5.77356V6.77356H330V5.77356V4.77356H9V5.77356Z";
const RIGHT_PATH = "M320 6.77356L330 11.5471V5.67436e-05L320 4.77356V6.77356ZM0 5.77356V6.77356H321V5.77356V4.77356H0V5.77356Z";

function AnimatedArrow({ path, direction = "left", delay = 0, inView }) {
  const isLeft = direction === "left";

  return (
    <svg
      className={`absolute top-20 ${isLeft ? "left-60" : "right-60"}`}
      width="330"
      height="12"
      viewBox="0 0 330 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id={`clip-${direction}`}>
          <rect
            x={isLeft ? 0 : 330}
            y={0}
            width={330}
            height={12}
            style={{
              transformOrigin: isLeft ? "0 0" : "330px 0",
              transform: inView ? "scaleX(1)" : "scaleX(0)",
              transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
            }}
          />
        </clipPath>
      </defs>
      <path d={path} fill="#00BD5F" clipPath={`url(#clip-${direction})`} />
    </svg>
  );
}

export default function AnimatedArrows() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-24 flex items-center justify-center"
      style={{ minHeight: 80 }}
    >
      <AnimatedArrow
        path={LEFT_PATH}
        direction="left"
        delay={500}
        inView={inView}
      />
      <AnimatedArrow
        path={RIGHT_PATH}
        direction="right"
        delay={1050}
        inView={inView}
      />
    </div>
  );
}