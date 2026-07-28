import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function Signals() {
  const anomalies = [
    { title: "Mob-wife aesthetic", category: "Beauty - Fashion / Reddit, Fringe", confidence: 94, time: "5h ago" },
    { title: "Norm-core gaming chairs", category: "Entertainment - Gaming / Discord", confidence: 88, time: "8h ago" },
    { title: "Quiet luxury fits", category: "Fashion - Mens / TikTok", confidence: 72, time: "12h ago" },
    { title: "Cozy productivity aesthetics", category: "Lifestyle - Reddit", confidence: 41, time: "1d ago", flag: "early flagged" },
  ];

  // Reference and motion values for cursor tracking
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Update mouse position relative to the DARIA graphic box
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Smooth the mouse values for a fluid, aquatic feel
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 50 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 50 });

  // Create layered parallax rotations (X-axis) and stretches (Y-axis) for the legs
  const backLegRotate = useTransform(smoothX, [-500, 500], [-5, 5]);
  const midLegRotate = useTransform(smoothX, [-500, 500], [-12, 12]);
  const frontLegRotate = useTransform(smoothX, [-500, 500], [-20, 20]);

  const backScale = useTransform(smoothY, [-500, 0, 500], [0.9, 1, 1.05]);
  const midScale = useTransform(smoothY, [-500, 0, 500], [0.85, 1, 1.1]);
  const frontScale = useTransform(smoothY, [-500, 0, 500], [0.8, 1, 1.15]);

  // Set transform origins to the top of the legs so they stay connected to the head
  const styleBack = { rotate: backLegRotate, scaleY: backScale, originX: 0.5, originY: 0 };
  const styleMid = { rotate: midLegRotate, scaleY: midScale, originX: 0.5, originY: 0 };
  const styleFront = { rotate: frontLegRotate, scaleY: frontScale, originX: 0.5, originY: 0 };

  return (
    <div onMouseMove={handleMouseMove} className="h-full flex flex-col">
        <div className="p-6 sm:p-8 flex-1 max-w-[1400px] w-full mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 mb-6">
            
            {/* DARIA Graphic Box */}
            <div 
              ref={containerRef}
              className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex flex-col items-center justify-center relative min-h-[360px]"
            >
               <div className="relative flex items-center justify-center mb-10">
                <svg
                  width="280"
                  height="340"
                  viewBox="0 0 280 340"
                  className="relative z-10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#77F8FF" stopOpacity="0.9" />
                      <stop
                        offset="60%"
                        stopColor="#45EFFF"
                        stopOpacity="0.7"
                      />
                      <stop offset="100%" stopColor="#45EFFF" stopOpacity="0" />
                    </linearGradient>

                    <radialGradient id="orb" cx="50%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop
                        offset="25%"
                        stopColor="#B8FFFF"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="70%"
                        stopColor="#59F3FF"
                        stopOpacity="0.6"
                      />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </radialGradient>

                    <filter
                      id="glow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="legBlur">
                      <feGaussianBlur stdDeviation="1" />
                    </filter>
                  </defs>

                  {/* Entire Octopus breathing container */}
                  <motion.g
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Glowing Aura behind Mantle */}
                    <circle
                      cx="140"
                      cy="50"
                      r="45"
                      fill="url(#orb)"
                      filter="url(#glow)"
                      opacity="0.5"
                    />

                    {/* Legs (Layered back to front) */}
                    <g filter="url(#legBlur)">
                      {/* Leg 1: Back Left (Slowest, widest) */}
                      <motion.path
                        style={styleBack}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.4"
                        animate={{
                          d: [
                            "M 105 74 C 80 110, 50 140, 70 180 C 90 220, 40 250, 50 290",
                            "M 105 74 C 90 120, 40 150, 60 190 C 80 230, 50 260, 40 280",
                            "M 105 74 C 70 115, 60 145, 50 185 C 40 225, 60 255, 60 295",
                            "M 105 74 C 80 110, 50 140, 70 180 C 90 220, 40 250, 50 290",
                          ],
                        }}
                        transition={{
                          duration: 7.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Leg 8: Back Right */}
                      <motion.path
                        style={styleBack}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.4"
                        animate={{
                          d: [
                            "M 175 74 C 200 110, 230 140, 210 180 C 190 220, 240 250, 230 290",
                            "M 175 74 C 190 120, 240 150, 220 190 C 200 230, 230 260, 240 280",
                            "M 175 74 C 210 115, 220 145, 230 185 C 240 225, 220 255, 220 295",
                            "M 175 74 C 200 110, 230 140, 210 180 C 190 220, 240 250, 230 290",
                          ],
                        }}
                        transition={{
                          duration: 8,
                          delay: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Leg 2: Mid Left */}
                      <motion.path
                        style={styleMid}
                        stroke="url(#lineGradient)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        opacity="0.6"
                        animate={{
                          d: [
                            "M 115 76 C 100 120, 70 150, 90 190 C 110 230, 70 270, 80 300",
                            "M 115 76 C 90 110, 80 160, 100 180 C 120 200, 60 260, 90 310",
                            "M 115 76 C 110 130, 60 140, 80 185 C 100 230, 80 280, 70 290",
                            "M 115 76 C 100 120, 70 150, 90 190 C 110 230, 70 270, 80 300",
                          ],
                        }}
                        transition={{
                          duration: 6.2,
                          delay: 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Leg 7: Mid Right */}
                      <motion.path
                        style={styleMid}
                        stroke="url(#lineGradient)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        opacity="0.6"
                        animate={{
                          d: [
                            "M 165 76 C 180 120, 210 150, 190 190 C 170 230, 210 270, 200 300",
                            "M 165 76 C 190 110, 200 160, 180 180 C 160 200, 220 260, 190 310",
                            "M 165 76 C 170 130, 220 140, 200 185 C 180 230, 200 280, 210 290",
                            "M 165 76 C 180 120, 210 150, 190 190 C 170 230, 210 270, 200 300",
                          ],
                        }}
                        transition={{
                          duration: 6.5,
                          delay: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Leg 3: Front Left */}
                      <motion.path
                        style={styleFront}
                        stroke="url(#lineGradient)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        opacity="0.85"
                        animate={{
                          d: [
                            "M 125 78 C 110 130, 130 160, 110 200 C 90 240, 130 270, 110 310",
                            "M 125 78 C 130 120, 100 170, 120 210 C 140 250, 100 280, 120 305",
                            "M 125 78 C 120 140, 110 150, 100 190 C 90 230, 120 260, 100 315",
                            "M 125 78 C 110 130, 130 160, 110 200 C 90 240, 130 270, 110 310",
                          ],
                        }}
                        transition={{
                          duration: 5.5,
                          delay: 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Leg 6: Front Right */}
                      <motion.path
                        style={styleFront}
                        stroke="url(#lineGradient)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        opacity="0.85"
                        animate={{
                          d: [
                            "M 155 78 C 170 130, 150 160, 170 200 C 190 240, 150 270, 170 310",
                            "M 155 78 C 150 120, 180 170, 160 210 C 140 250, 180 280, 160 305",
                            "M 155 78 C 160 140, 170 150, 180 190 C 190 230, 160 260, 180 315",
                            "M 155 78 C 170 130, 150 160, 170 200 C 190 240, 150 270, 170 310",
                          ],
                        }}
                        transition={{
                          duration: 5.8,
                          delay: 0.7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Leg 4: Center Left (Thickest, foreground) */}
                      <motion.path
                        style={styleFront}
                        stroke="url(#lineGradient)"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        opacity="1"
                        animate={{
                          d: [
                            "M 135 79 C 130 140, 150 170, 135 210 C 120 250, 160 280, 140 320",
                            "M 135 79 C 145 130, 120 180, 145 220 C 170 260, 130 290, 150 310",
                            "M 135 79 C 125 150, 140 160, 125 200 C 110 240, 150 270, 130 325",
                            "M 135 79 C 130 140, 150 170, 135 210 C 120 250, 160 280, 140 320",
                          ],
                        }}
                        transition={{
                          duration: 4.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Leg 5: Center Right (Thickest, foreground) */}
                      <motion.path
                        style={styleFront}
                        stroke="url(#lineGradient)"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        opacity="1"
                        animate={{
                          d: [
                            "M 145 79 C 150 140, 130 170, 145 210 C 160 250, 120 280, 140 320",
                            "M 145 79 C 135 130, 160 180, 135 220 C 110 260, 150 290, 130 310",
                            "M 145 79 C 155 150, 140 160, 155 200 C 170 240, 130 270, 150 325",
                            "M 145 79 C 150 140, 130 170, 145 210 C 160 250, 120 280, 140 320",
                          ],
                        }}
                        transition={{
                          duration: 5.2,
                          delay: 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </g>

                    {/* Octopus Mantle (Head) - Unaffected by cursor tracking */}
                    <path
                      d="M 105 74 C 95 30, 115 15, 140 15 C 165 15, 185 30, 175 74 C 165 80, 115 80, 105 74 Z"
                      fill="url(#orb)"
                      opacity="0.95"
                      filter="url(#glow)"
                    />

                    {/* AI Eyes / Sensor Nodes */}
                    <motion.circle
                      cx="128"
                      cy="60"
                      r="2"
                      fill="#FFFFFF"
                      filter="url(#glow)"
                      animate={{ opacity: [1, 1, 0.2, 1, 1] }}
                      transition={{
                        duration: 4,
                        times: [0, 0.45, 0.5, 0.55, 1],
                        repeat: Infinity,
                      }}
                    />
                    <motion.circle
                      cx="152"
                      cy="60"
                      r="2"
                      fill="#FFFFFF"
                      filter="url(#glow)"
                      animate={{ opacity: [1, 1, 0.2, 1, 1] }}
                      transition={{
                        duration: 4,
                        times: [0, 0.45, 0.5, 0.55, 1],
                        repeat: Infinity,
                      }}
                    />
                  </motion.g>
                </svg>
              </div>

              <div className="text-center">
                <h3 className="text-[#00E5FF] text-[11px] font-bold tracking-widest uppercase mb-2">Daria</h3>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-[280px]">
                  Mob-wife aesthetic just crossed a 4H wide-bridge — from fringe into mainstream fashion forums.
                </p>
              </div>
            </div>

            {/* Right Column Stack */}
            <div className="flex flex-col gap-6">
              
              {/* Anomaly Detected */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex-1 flex flex-col justify-center">
                <h2 className="text-[10px] text-white font-bold tracking-widest uppercase mb-4">Anomaly Detected</h2>
                <div className="text-4xl font-medium text-white mb-2 flex items-baseline gap-2">
                  4 <span className="text-sm font-normal text-[#a1a1aa]">wide-bridge crossings</span>
                </div>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-lg mt-2">
                  Beauty - Fringe cluster -&gt; mainstream/reddit fashion subs
                </p>
              </div>

              {/* What Ghost Mode Does */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex-1 flex flex-col justify-center">
                <h2 className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase mb-4">What Ghost Mode Does</h2>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-2xl">
                  Ghost Mode watches for fragmentation and cross-community bridges — not algorithmic values. It flags where a trend goes <em>before</em> the masses. It does not predict where it crashes, that's Quantum Cluster's job.
                </p>
              </div>

            </div>
          </div>

          {/* Anomaly feed */}
          <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6">
            <div className="flex justify-between items-center mb-6 px-2">
              <h2 className="text-[11px] text-white font-bold tracking-widest uppercase">Anomaly feed</h2>
              <span className="text-[11px] text-[#00E5FF] font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                Live
              </span>
            </div>
            
            <div className="flex flex-col divide-y divide-[#27272a]">
              {anomalies.map((item, i) => (
                <Link to="/signals/1" key={i} className="flex items-center justify-between py-4 px-2 hover:bg-[#27272a]/30 transition-colors block cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></div>
                    <div>
                      <h4 className="text-[14px] font-medium text-white mb-0.5">{item.title}</h4>
                      <p className="text-[11px] text-[#71717a]">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-medium text-white">
                      {item.confidence}% confidence {item.flag && <span className="text-[#71717a] font-normal">— {item.flag}</span>}
                    </div>
                    <div className="text-[11px] text-[#71717a] mt-0.5">{item.time}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
  );
}

export default Signals;