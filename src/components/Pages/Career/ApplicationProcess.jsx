import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, Calendar, DollarSign, Rocket } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    title: 'Submit Application', sub: 'Send us your CV',
    icon: <FileText size={20} />,
    bg: '#0E3847', border: '#31BBD052', color: '#31BBD0', glow: '#31BBD066',
  },
  {
    id: 2,
    title: 'Initial Interview', sub: 'Introductory call',
    icon: <Calendar size={20} />,
    bg: '#21162C', border: '#9333EA52', color: '#9333EA', glow: '#9b5de566',
  },
  {
    id: 3,
    title: 'Technical Assessment', sub: 'Prove your skills',
    icon: <DollarSign size={20} />,
    bg: '#0a2015', border: '#A3D183', color: '#A3D183', glow: '#A3D18366',
  },
  {
    id: 4,
    title: 'Final Interview', sub: 'Cultural fit check',
    icon: <FileText size={20} />,
    bg: '#2a1205', border: '#e07c3a', color: '#e07c3a', glow: '#e07c3a66',
  },
  {
    id: 5,
    title: 'Job Offer', sub: 'Welcome aboard!',
    icon: <Rocket size={20} />,
    bg: '#0d0d25', border: '#31BBD0', color: '#31BBD0', glow: '#31BBD066',
  },
]

// SVG viewBox
const VW = 1000
const VH = 520
const CR = 28

// 3 horizontal rows Y positions
const Y1 = 90    // Row 1 — steps 1,2,3 (labels below)
const Y2 = 240   // Row 2 — empty connector line
const Y3 = 400   // Row 3 — steps 4,5 (labels above)

// Row 1 step X positions (left→right)
const X1 = [220, 500, 780]

// Row 3 step X positions (left→right, centered under row1 gap)
const X3 = [340, 620]

// Right curve radius
const RCURVE = 80
// Left curve radius
const LCURVE = 80


// Path segments — animate one by one
const PATHS = [
  { d: `M ${X1[0]+CR} ${Y1} L ${X1[1]-CR} ${Y1}`,                                     delay: 0.5,  dur: 0.5 },
  { d: `M ${X1[1]+CR} ${Y1} L ${X1[2]-CR} ${Y1}`,                                     delay: 1.0,  dur: 0.5 },
  { d: `M ${X1[2]+CR} ${Y1} Q ${X1[2]+RCURVE+CR} ${Y1} ${X1[2]+RCURVE+CR} ${(Y1+Y2)/2} Q ${X1[2]+RCURVE+CR} ${Y2} ${X1[2]+CR-2} ${Y2}`, delay: 1.5, dur: 0.55 },
  { d: `M ${X1[2]+CR} ${Y2} L ${X1[0]-CR} ${Y2}`,                                     delay: 2.05, dur: 0.6 },
  { d: `M ${X1[0]-CR} ${Y2} Q ${X1[0]-LCURVE-CR} ${Y2} ${X1[0]-LCURVE-CR} ${(Y2+Y3)/2} Q ${X1[0]-LCURVE-CR} ${Y3} ${X1[0]-CR+2} ${Y3}`, delay: 2.65, dur: 0.55 },
  { d: `M ${X1[0]-CR+2} ${Y3} L ${X3[0]-CR} ${Y3}`,                                   delay: 3.2,  dur: 0.3  },
  { d: `M ${X3[0]+CR} ${Y3} L ${X3[1]-CR} ${Y3}`,                                     delay: 3.5,  dur: 0.45 },
]

// Node positions
const NODES = [
  { ...STEPS[0], x: X1[0], y: Y1, labelBelow: true,  animDelay: 0.3  },
  { ...STEPS[1], x: X1[1], y: Y1, labelBelow: true,  animDelay: 0.85 },
  { ...STEPS[2], x: X1[2], y: Y1, labelBelow: true,  animDelay: 1.35 },
  { ...STEPS[3], x: X3[0], y: Y3, labelBelow: false, animDelay: 2.8  },
  { ...STEPS[4], x: X3[1], y: Y3, labelBelow: false, animDelay: 3.3  },
]

const PulseRing = ({ cx, cy, color, delay, inView }) => (
  <motion.circle
    cx={cx} cy={cy} r={CR + 10}
    fill="none" stroke={color} strokeWidth="1"
    initial={{ opacity: 0 }}
    animate={inView ? { opacity: [0, 0.6, 0], scale: [0.9, 1.2, 0.9] } : {}}
    transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  />
)

const ApplicationProcess = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      className='w-full py-14 sm:py-10 mont overflow-hidden'
      style={{ backgroundColor: '#091114' }}
    >
      <div className='w-[88%] sm:w-[88%] mx-auto'>

        {/* Top label */}
        <div className='flex justify-center mb-3'>
          <span className='flex items-center gap-2 text-[#31BBD0] font-semibold text-[13px]'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#31BBD0] inline-block' />
            Step By Step Process
          </span>
        </div>

        {/* Heading */}
        <div className='text-center  '>
          <h1 className='text-white font-bold text-[24px] sm:text-[30px] md:text-[40px] leading-tight'>
            Application Process
          </h1>
          <p className='text-[#7a8e94] font-medium text-[15px] sm:text-[17px] mt-3'>
            Straightforward and transparent path to joining our team.
          </p>
        </div>

        {/* ── DESKTOP SVG ── */}
        <div ref={ref} className='hidden md:block w-full'>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className='w-full'
            style={{ overflow: 'visible' }}
          >
            {/* Connector paths */}
            {PATHS.map((seg, i) => (
              <motion.path
                key={i}
                d={seg.d}
                stroke="#A3D183"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: seg.dur, delay: seg.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* Step nodes */}
            {NODES.map((node) => {
              const titleY  = node.labelBelow ? node.y + CR + 24 : node.y - CR - 26
              const subY    = node.labelBelow ? node.y + CR + 42 : node.y - CR - 10
              const isFirst = node === NODES[0];
              const isLast = node === NODES[NODES.length - 1];

              return (
                <g key={node.id}>
                  {(isFirst || isLast) && (
                    <PulseRing cx={node.x} cy={node.y} color={node.border} delay={node.animDelay + 0.4} inView={inView} />
                  )}
                  {/* Circle */}
                  <motion.circle
                    cx={node.x} cy={node.y} r={CR}
                    fill={node.bg}
                    stroke={node.border}
                    strokeWidth=".5"
                    filter={`drop-shadow(0 0 10px ${node.glow})`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: node.animDelay, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                  

                  {/* Icon */}
                  <motion.foreignObject
                    x={node.x - 11} y={node.y - 11} width="22" height="22"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: node.animDelay + 0.2 }}
                  >
                    <div style={{
                      width: 22, height: 22,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: node.color,
                    }}>
                      {node.icon}
                    </div>
                  </motion.foreignObject>

                  {/* Title */}
                  <motion.text
                    x={node.x} y={titleY}
                    textAnchor="middle"
                    fill="white"
                    fontSize="13.5"
                    fontWeight="600"
                    fontFamily="Montserrat, sans-serif"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: node.animDelay + 0.3 }}
                  >
                    {node.title}
                  </motion.text>

                  {/* Sub */}
                  <motion.text
                    x={node.x} y={subY}
                    textAnchor="middle"
                    fill="#6b8088"
                    fontSize="12"
                    fontWeight="500"
                    fontFamily="Montserrat, sans-serif"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.35, delay: node.animDelay + 0.4 }}
                  >
                    {node.sub}
                  </motion.text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* ── MOBILE vertical ── */}
        <div className='md:hidden flex flex-col items-center'>
          {STEPS.map((step, i) => (
            <div key={step.id} className='flex flex-col items-center'>
              <motion.div
                className='text-center mb-3'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <p className='text-white font-semibold text-[14px]'>{step.title}</p>
                <p className='text-[12px] mt-0.5' style={{ color: '#6b8088' }}>{step.sub}</p>
              </motion.div>

              <motion.div
                className='w-14 h-14 rounded-full flex items-center justify-center'
                style={{
                  background: step.bg,
                  border: `1.5px solid ${step.border}`,
                  color: step.color,
                  boxShadow: `0 0 16px ${step.glow}`,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {step.icon}
              </motion.div>

              {i < STEPS.length - 1 && (
                <motion.div
                  style={{ width: 2, height: 44, background: '#A3D183', originY: 0 }}
                  className='my-2'
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default ApplicationProcess