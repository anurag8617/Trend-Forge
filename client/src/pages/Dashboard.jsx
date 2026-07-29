import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  const pipeline = [
    { title: "Ghost Mode", desc: "Fringe velocity, wide-bridge crossings" },
    { title: "Quantum Guess", desc: "Trajectory & saturation forecasting" },
    { title: "Bio-Feel", desc: "Emotional arousal scoring" },
    { title: "DisinfoDefender", desc: "Compliance & bot screening" },
    { title: "HoloBidder", desc: "Cross-channel bid execution" },
  ];

  return (
    <div 
      className="h-full flex flex-col"
      onMouseMove={handleMouseMove}
    >

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 flex-1 max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 mb-8">
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

              <div className="text-center mt-[-10px]">
                <h3 className="text-[#00E5FF] text-[11px] font-bold tracking-widest uppercase mb-1">
                  Daria
                </h3>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-[260px]">
                  Awaiting activation... all engines idle.
                  <br />
                  Last signal observed 6 hours ago.
                </p>
              </div>
            </div>

            {/* Right Column Stats */}
            <div className="flex flex-col gap-6">
              {/* Trend Score */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-8 flex-1 flex flex-col justify-center">
                <h2 className="text-[11px] text-white font-bold tracking-widest uppercase mb-4">
                  Trend Score
                </h2>
                <div className="text-4xl font-light text-[#52525b] mb-6">—</div>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-lg">
                  No active signal to score. DARIA never shows a placeholder
                  number — this stays empty until something real crosses
                  threshold.
                </p>
              </div>

              {/* Metrics */}
              <div className="bg-[#1C1C1E] border border-transparent rounded-xl p-6 grid grid-cols-3 divide-x divide-[#27272a]">
                <div className="px-6 flex flex-col justify-center">
                  <h3 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">
                    Lead Time
                  </h3>
                  <div className="text-2xl font-light text-[#52525b]">—</div>
                </div>
                <div className="px-6 flex flex-col justify-center">
                  <h3 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">
                    Confidence
                  </h3>
                  <div className="text-2xl font-light text-[#52525b]">—</div>
                </div>
                <div className="px-6 flex flex-col justify-center">
                  <h3 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-2">
                    Latency
                  </h3>
                  <div className="text-2xl font-medium text-white flex items-baseline gap-1">
                    38
                    <span className="text-[12px] text-[#71717a] font-semibold">
                      ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Section */}
          <div className="mt-2">
            <h2 className="text-[10px] text-[#71717a] font-bold tracking-widest uppercase mb-4 pl-1">
              Five Engine Pipeline
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {pipeline.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#1C1C1E] border border-transparent rounded-xl p-5 hover:border-[#27272a] transition-colors group cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#52525b] mb-4 group-hover:bg-[#00E5FF] transition-colors float-right"></div>
                  <div className="w-4 h-4 mb-3 text-[#71717a] group-hover:text-white transition-colors">
                    {/* Placeholder icon shapes for pipeline items */}
                    {i === 0 && (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {i === 3 && (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.95 11.95 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {i === 4 && (
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <h4 className="text-[13px] font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
