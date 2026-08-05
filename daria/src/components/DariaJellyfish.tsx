// import { useEffect, useRef } from "react";

// export type DariaState =
//   | "standby"
//   | "scanning"
//   | "signal"
//   | "low-confidence"
//   | "executing";

// interface DariaJellyfishProps {
//   /** Current behavioral state DARIA is in */
//   state?: DariaState;
//   /** 0–100. Drives glow brightness/steadiness. */
//   confidence?: number;
//   /** Pixel size of the whole widget (square layout footprint). */
//   size?: number;
//   className?: string;
//   /** Determines the color theme of the jellyfish */
//   tenant?: "gov" | "enterprise" | "default";
//   /** Tilt of the whole jellyfish */
//   tiltDeg?: number;
// }

// // Behavioral parameters mapped to DARIA's states
// const STATE_PARAMS: Record<
//   DariaState,
//   {
//     swimSpeed: number;
//     swimAmplitude: number;
//     tentacleSpeed: number;
//     tentacleSpread: number;
//     glowPulse: boolean;
//   }
// > = {
//   standby: {
//     swimSpeed: 0.02,
//     swimAmplitude: 15,
//     tentacleSpeed: 0.015,
//     tentacleSpread: 1.0,
//     glowPulse: false,
//   },
//   scanning: {
//     swimSpeed: 0.04,
//     swimAmplitude: 25, // Restored high jump
//     tentacleSpeed: 0.03,
//     tentacleSpread: 1.4,
//     glowPulse: false,
//   },
//   signal: {
//     swimSpeed: 0.03,
//     swimAmplitude: 10,
//     tentacleSpeed: 0.02,
//     tentacleSpread: 1.1,
//     glowPulse: true,
//   },
//   "low-confidence": {
//     swimSpeed: 0.01,
//     swimAmplitude: 5,
//     tentacleSpeed: 0.01,
//     tentacleSpread: 0.8,
//     glowPulse: true,
//   },
//   executing: {
//     swimSpeed: 0.06,
//     swimAmplitude: 35, // Restored highest jump
//     tentacleSpeed: 0.05,
//     tentacleSpread: 0.5,
//     glowPulse: false,
//   },
// };

// const STRAND_COUNT_OUTER = 8;
// const STRAND_COUNT_INNER = 4;

// export default function DariaJellyfish({
//   state = "standby",
//   confidence = 80,
//   size = 240,
//   className,
//   tenant = "default",
//   tiltDeg = -38,
// }: DariaJellyfishProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const timeRef = useRef(0);

//   // We make the canvas 50% larger than the layout size so the jellyfish 
//   // has room to jump outside the box without being clipped by the canvas edge.
//   const overflowScale = 1.5; 
//   const actualSize = size * overflowScale;

//   // Theme Colors
//   const themeRgb =
//     tenant === "gov"
//       ? "0,229,255"
//       : tenant === "enterprise"
//       ? "99,102,241"
//       : "34,211,238";
//   const themeLightRgb =
//     tenant === "gov"
//       ? "180,252,255"
//       : tenant === "enterprise"
//       ? "199,210,254"
//       : "165,243,252";

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d", { alpha: true });
//     if (!ctx) return;

//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = actualSize * dpr;
//     canvas.height = actualSize * dpr;
//     ctx.scale(dpr, dpr);

//     let raf: number;

//     const outerStrands = Array.from({ length: STRAND_COUNT_OUTER }, (_, i) => ({
//       phaseOffset: Math.random() * Math.PI * 2,
//       xOffset: (i / (STRAND_COUNT_OUTER - 1) - 0.5) * 2,
//     }));

//     const innerStrands = Array.from({ length: STRAND_COUNT_INNER }, (_, i) => ({
//       phaseOffset: Math.random() * Math.PI * 2,
//       xOffset: (i / (STRAND_COUNT_INNER - 1) - 0.5) * 1.2,
//     }));

//     const LOBE_COUNT = 10;
//     const lobeVariants = Array.from({ length: LOBE_COUNT }, () => ({
//       widthMul: 0.75 + Math.random() * 0.5,
//       depthMul: 0.6 + Math.random() * 0.8,
//       jitter: (Math.random() - 0.5) * 0.4,
//     }));
//     const domeAsymX = (Math.random() - 0.5) * size * 0.06;

//     const tiltRad = (tiltDeg * Math.PI) / 0;

//     function draw() {
//       if (!ctx) return;
//       timeRef.current += 1;
//       const t = timeRef.current;

//       // Clear the expanded canvas
//       ctx.clearRect(0, 0, actualSize, actualSize);
//       ctx.globalCompositeOperation = "screen";

//       const params = STATE_PARAMS[state];
//       const confRatio = confidence / 100;

//       const rawPhase = t * params.swimSpeed;
//       const swimPhase = rawPhase - Math.sin(rawPhase) * 0.6;
//       const pulse = Math.sin(swimPhase);

//       const flicker =
//         params.glowPulse || state === "low-confidence"
//           ? 0.7 + Math.sin(t * 0.1) * 0.3
//           : 1;
//       const baseAlpha = (0.3 + 0.7 * confRatio) * flicker;

//       const cx = size / 2;
//       const pivotY = size * 0.45;

//       const bobbing = pulse * params.swimAmplitude * (size / 240);
//       const ly = bobbing; 

//       const bellWidth = size * 0.45 + pulse * (size * 0.05);
//       const bellHeight = size * 0.32 - pulse * (size * 0.08);

//       ctx.save();
//       // Shift context to the center of our expanded canvas
//       ctx.translate((actualSize - size) / 2, (actualSize - size) / 2);
      
//       ctx.translate(cx, pivotY);
//       ctx.rotate(tiltRad);

//       const drawOuterTentacles = () => {
//         outerStrands.forEach((strand) => {
//           const baseX = strand.xOffset * (bellWidth * 0.45);
//           const length = size * 0.6;
//           const segments = 20;
//           const segLen = length / segments;

//           ctx.beginPath();
//           ctx.moveTo(baseX, ly);
//           for (let i = 1; i <= segments; i++) {
//             const progress = i / segments;
//             const dragPhase = swimPhase - progress * 1.5;
//             const drag = Math.sin(dragPhase) * params.swimAmplitude;
//             const wave = Math.sin(
//               t * params.tentacleSpeed + strand.phaseOffset - progress * 4
//             );
//             const spread = params.tentacleSpread * (size / 240) * 25;
//             const xOff = wave * spread * progress * (1 - progress * 0.2);
//             const x = baseX + xOff;
//             const y = ly + i * segLen - drag * progress;
//             ctx.lineTo(x, y);
//           }
//           ctx.lineCap = "round";
//           ctx.lineJoin = "round";
//           ctx.lineWidth = (size / 240) * 1.5;
//           const grad = ctx.createLinearGradient(0, ly, 0, ly + length);
//           grad.addColorStop(0, `rgba(${themeRgb}, ${0.8 * baseAlpha})`);
//           grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
//           ctx.strokeStyle = grad;
//           ctx.stroke();
//         });
//       };

//       const drawInnerRuffledArms = () => {
//         innerStrands.forEach((strand) => {
//           const baseX = strand.xOffset * (bellWidth * 0.35);
//           const length = size * 0.55;
//           const segments = 26;
//           const segLen = length / segments;

//           const leftEdge: { x: number; y: number }[] = [];
//           const rightEdge: { x: number; y: number }[] = [];

//           for (let i = 0; i <= segments; i++) {
//             const progress = i / segments;
//             const dragPhase = swimPhase - progress * 1.3;
//             const drag = Math.sin(dragPhase) * params.swimAmplitude * 0.8;
//             const wave = Math.sin(
//               t * params.tentacleSpeed * 0.8 +
//                 strand.phaseOffset -
//                 progress * 3
//             );
//             const spread = params.tentacleSpread * (size / 240) * 12;
//             const centerX = baseX + wave * spread * progress;
//             const centerY = ly + i * segLen - drag * progress;

//             const ruffle =
//               Math.sin(progress * 14 + strand.phaseOffset + t * 0.08) * 0.5 +
//               0.5;
//             const taper = 1 - progress * 0.9;
//             const halfWidth =
//               (size / 240) * (4 + ruffle * 6) * taper * (1.1 - pulse * 0.15);

//             const perpX = 1;
//             leftEdge.push({ x: centerX - halfWidth * perpX, y: centerY });
//             rightEdge.push({ x: centerX + halfWidth * perpX, y: centerY });
//           }

//           ctx.beginPath();
//           ctx.moveTo(leftEdge[0].x, leftEdge[0].y);
//           for (const p of leftEdge) ctx.lineTo(p.x, p.y);
//           for (let i = rightEdge.length - 1; i >= 0; i--) {
//             ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
//           }
//           ctx.closePath();

//           const grad = ctx.createLinearGradient(0, ly, 0, ly + length);
//           grad.addColorStop(0, `rgba(${themeLightRgb}, ${0.75 * baseAlpha})`);
//           grad.addColorStop(0.6, `rgba(${themeRgb}, ${0.35 * baseAlpha})`);
//           grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
//           ctx.fillStyle = grad;
//           ctx.fill();

//           ctx.beginPath();
//           ctx.moveTo(baseX, ly);
//           for (let i = 0; i <= segments; i++) {
//             const p = leftEdge[i];
//             const q = rightEdge[i];
//             ctx.lineTo((p.x + q.x) / 2, (p.y + q.y) / 2);
//           }
//           ctx.lineWidth = (size / 240) * 1;
//           ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.5 * baseAlpha})`;
//           ctx.stroke();
//         });
//       };

//       drawInnerRuffledArms();
//       drawOuterTentacles();

//       const widthSum = lobeVariants.reduce((s, v) => s + v.widthMul, 0);
//       const lobeWidths = lobeVariants.map((v) => (bellWidth * v.widthMul) / widthSum);
//       const lobeDepthBase = size * 0.045 - pulse * (size * 0.015);

//       const lobeXs: number[] = [-bellWidth / 2];
//       lobeWidths.forEach((w) => lobeXs.push(lobeXs[lobeXs.length - 1] + w));

//       const bellGlow = ctx.createRadialGradient(
//         domeAsymX * 0.3, ly - bellHeight * 0.55, 0,
//         domeAsymX * 0.3, ly - bellHeight * 0.5, bellWidth * 0.9
//       );
//       bellGlow.addColorStop(0, `rgba(${themeLightRgb}, ${0.9 * baseAlpha})`);
//       bellGlow.addColorStop(0.45, `rgba(${themeRgb}, ${0.5 * baseAlpha})`);
//       bellGlow.addColorStop(1, `rgba(${themeRgb}, 0)`);

//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly - size * 0.015);
//       ctx.quadraticCurveTo(
//         domeAsymX, ly - size * 0.04 - pulse * (size * 0.015),
//         bellWidth / 2, ly - size * 0.015
//       );
//       ctx.lineWidth = 3;
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.4 * baseAlpha})`;
//       ctx.stroke();

//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly);
//       ctx.bezierCurveTo(
//         -bellWidth * 0.62, ly - bellHeight * 0.95,
//         -bellWidth * 0.32 + domeAsymX, ly - bellHeight * 1.18,
//         domeAsymX * 0.6, ly - bellHeight * 1.08
//       );
//       ctx.bezierCurveTo(
//         bellWidth * 0.32 + domeAsymX * 0.6, ly - bellHeight * 1.12,
//         bellWidth * 0.62, ly - bellHeight * 0.88,
//         bellWidth / 2, ly
//       );
//       for (let i = lobeWidths.length - 1; i >= 0; i--) {
//         const x0 = lobeXs[i];
//         const x1 = lobeXs[i + 1];
//         const v = lobeVariants[i];
//         const midX = (x0 + x1) / 2 + v.jitter * (size / 240) * 4;
//         const depth = lobeDepthBase * v.depthMul;
//         ctx.quadraticCurveTo(midX, ly + depth, x0, ly);
//       }
//       ctx.closePath();
//       ctx.fillStyle = bellGlow;
//       ctx.fill();

//       ctx.beginPath();
//       ctx.moveTo(lobeXs[0], ly);
//       for (let i = 0; i < lobeWidths.length; i++) {
//         const x0 = lobeXs[i];
//         const x1 = lobeXs[i + 1];
//         const v = lobeVariants[i];
//         const midX = (x0 + x1) / 2 + v.jitter * (size / 240) * 4;
//         const depth = lobeDepthBase * v.depthMul;
//         ctx.quadraticCurveTo(midX, ly + depth, x1, ly);
//       }
//       ctx.lineWidth = 2 * (size / 240);
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.7 * baseAlpha})`;
//       ctx.stroke();

//       for (let i = 0; i < lobeWidths.length; i++) {
//         const x0 = lobeXs[i];
//         const x1 = lobeXs[i + 1];
//         const v = lobeVariants[i];
//         const midX = (x0 + x1) / 2 + v.jitter * (size / 240) * 4;
//         const depth = lobeDepthBase * v.depthMul;
//         ctx.beginPath();
//         ctx.arc(midX, ly + depth * 0.55, (size / 240) * 1.2, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${themeLightRgb}, ${0.6 * baseAlpha})`;
//         ctx.fill();
//       }

//       ctx.restore();

//       raf = requestAnimationFrame(draw);
//     }

//     draw();

//     return () => {
//       cancelAnimationFrame(raf);
//     };
//   }, [size, state, confidence, themeRgb, themeLightRgb, tiltDeg]);

//   return (
//     <div
//       className={className}
//       style={{
//         position: "relative",
//         width: size,
//         height: size,
//       }}
//       role="img"
//       aria-label={`Daria AI status: ${state}, confidence ${confidence}%`}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: actualSize,
//           height: actualSize,
//           pointerEvents: "none",
//         }}
//       />
//     </div>
//   );
// }



import { useEffect, useRef, useId } from "react";

export type DariaState =
  | "standby"
  | "scanning"
  | "signal"
  | "low-confidence"
  | "executing";

interface DariaJellyfishProps {
  /** Current behavioral state DARIA is in */
  state?: DariaState;
  /** 0–100. Drives glow brightness/steadiness (kept for prop compatibility). */
  confidence?: number;
  /** Pixel size of the layout footprint. */
  size?: number;
  className?: string;
  /** Determines the color theme of the jellyfish (kept for prop compatibility). */
  tenant?: "gov" | "enterprise" | "default";
  /** Tilt of the whole jellyfish (kept for prop compatibility). */
  tiltDeg?: number;
}

// Map the DARIA state to the swimming pulse cycle speed (in milliseconds)
const STATE_SPEEDS: Record<DariaState, number> = {
  standby: 3500,        // Slow, relaxed breathing
  "low-confidence": 4500, // Very slow, hesitant
  scanning: 2200,       // Active searching
  signal: 1800,         // Spiked activity
  executing: 1200,      // Fast, aggressive swimming
};

export default function DariaJellyfish({
  state = "standby",
  size = 240,
  className,
}: DariaJellyfishProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // SVG Group Refs
  const jellyGroupRef = useRef<SVGGElement>(null);
  const tentaclesGroupRef = useRef<SVGGElement>(null);
  const canalsGroupRef = useRef<SVGGElement>(null);
  const oralArmsGroupRef = useRef<SVGGElement>(null);
  const gonadsGroupRef = useRef<SVGGElement>(null);
  
  // SVG Gradient/Element Refs
  const shimmer1Ref = useRef<SVGStopElement>(null);
  const shimmer2Ref = useRef<SVGStopElement>(null);
  const shimmer3Ref = useRef<SVGStopElement>(null);
  const shimmerCircleRef = useRef<SVGCircleElement>(null);

  // Generate a unique ID for this instance so SVG filters/masks don't conflict
  const uid = useId().replace(/:/g, "");

  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  // We make the internal canvas 2.5x larger than the layout size. 
  // This gives the background particles and caustics room to roam without hitting a hard invisible edge.
  const overflowScale = 2.5;
  const areaSize = size * overflowScale;
  const offset = (areaSize - size) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas dimensions to the expanded area size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = areaSize * dpr;
    canvas.height = areaSize * dpr;
    ctx.scale(dpr, dpr);

    // Clear previous DOM children to prevent duplicates on React re-renders (Strict Mode)
    if (tentaclesGroupRef.current) tentaclesGroupRef.current.innerHTML = '';
    if (canalsGroupRef.current) canalsGroupRef.current.innerHTML = '';
    if (oralArmsGroupRef.current) oralArmsGroupRef.current.innerHTML = '';
    if (gonadsGroupRef.current) gonadsGroupRef.current.innerHTML = '';

    // --- 1. DOM Setup ---
    const tentacles: any[] = [];
    const numTentacles = 180;
    for (let i = 0; i < numTentacles; i++) {
      const angle = (i / numTentacles) * Math.PI * 2 + random(-0.02, 0.02);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const op = random(0.15, 0.45);
      
      path.setAttribute("stroke", `rgba(220, 240, 255, ${op})`);
      path.setAttribute("stroke-width", random(0.5, 1.8).toFixed(1));
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-linecap", "round");
      
      tentaclesGroupRef.current?.appendChild(path);
      tentacles.push({ 
        path, angle, 
        offset: random(0, Math.PI * 2), 
        length: random(10, 50),
        curveBias: random(-15, 15)
      });
    }

    for (let i = 0; i < 24; i++) {
      const baseAngle = (i / 24) * Math.PI * 2;
      const angle = baseAngle + random(-0.03, 0.03); 
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      const rStart = 15;
      const rEnd = 138;
      const bend = angle + 0.18; 
      
      const x1 = Math.cos(angle) * rStart;
      const y1 = Math.sin(angle) * rStart;
      const cx = Math.cos(bend) * (rStart + rEnd)/2;
      const cy = Math.sin(bend) * (rStart + rEnd)/2;
      const x2 = Math.cos(angle) * rEnd;
      const y2 = Math.sin(angle) * rEnd;
      
      path.setAttribute("d", `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`);
      path.setAttribute("stroke", "rgba(255, 255, 255, 0.35)");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("fill", "none");
      canalsGroupRef.current?.appendChild(path);
    }

    const oralArms: any[] = [];
    for (let i = 0; i < 4; i++) {
      const angleOffset = (i / 4) * Math.PI * 2 + random(-0.2, 0.2);
      
      const outerPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      outerPath.setAttribute("fill", "rgba(220, 235, 255, 0.45)");
      outerPath.setAttribute("stroke", "rgba(255, 255, 255, 0.9)");
      outerPath.setAttribute("stroke-width", "0.8");
      outerPath.setAttribute("filter", `url(#soft-blur-${uid})`); 
      oralArmsGroupRef.current?.appendChild(outerPath);
      
      const innerPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      innerPath.setAttribute("fill", "rgba(240, 225, 255, 0.65)");
      innerPath.setAttribute("stroke", "rgba(255, 255, 255, 1)");
      innerPath.setAttribute("stroke-width", "1");
      oralArmsGroupRef.current?.appendChild(innerPath);

      oralArms.push({ 
        outerPath, innerPath, angleOffset, 
        phase: random(0, Math.PI * 2), 
        freq: random(0.8, 1.2) 
      });
    }

    const gonads: any[] = [];
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + random(-0.1, 0.1); 
      const offsetR = 55 + random(-4, 4); 
      
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", `rotate(${(angle * 180) / Math.PI}) translate(0, -${offsetR})`);
      
      const outerPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      outerPath.setAttribute("d", "M -18, 20 A 20,20 0 1,1 18, 20");
      outerPath.setAttribute("fill", "none");
      outerPath.setAttribute("stroke", "rgba(180, 80, 160, 0.45)"); 
      outerPath.setAttribute("stroke-width", "16");
      outerPath.setAttribute("stroke-linecap", "round");
      outerPath.setAttribute("filter", `url(#glow-${uid})`);
      
      const innerPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      innerPath.setAttribute("d", "M -15, 20 A 17,17 0 1,1 15, 20");
      innerPath.setAttribute("fill", "none");
      innerPath.setAttribute("stroke", "rgba(255, 210, 255, 0.85)");
      innerPath.setAttribute("stroke-width", "6");
      innerPath.setAttribute("stroke-linecap", "round");
      innerPath.setAttribute("filter", `url(#soft-blur-${uid})`);

      g.appendChild(outerPath);
      g.appendChild(innerPath);
      gonadsGroupRef.current?.appendChild(g);
      
      gonads.push({ g, phase: random(0, Math.PI * 2) });
    }

    // --- 2. Parallax Setup ---
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;
      mouseX = ((e.clientX - cx) / bounds.width) * (size * 0.1); 
      mouseY = ((e.clientY - cy) / bounds.height) * (size * 0.1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- 3. Caustics & Background Setup ---
    const scaleRatio = size / 800; 
    
    const caustics: any[] = [];
    for (let i = 0; i < 70; i++) {
      caustics.push({
        x: random(0, areaSize),
        y: random(0, areaSize),
        r: random(5, 25) * scaleRatio, 
        vx: random(-0.1, 0.1),
        vy: random(-0.2, -0.4),
        opacity: random(0.02, 0.12),
        phase: random(0, Math.PI * 2)
      });
    }
    
    const bgJellies: any[] = [];
    for (let i=0; i<3; i++) {
      bgJellies.push({
        x: random(areaSize*0.1, areaSize*0.9),
        y: random(areaSize*0.1, areaSize*0.9),
        r: random(40, 70) * scaleRatio,
        phase: random(0, Math.PI*2)
      });
    }

    // --- 4. Main Animation Loop ---
    let frameId: number;
    let pulseCycle = STATE_SPEEDS[state]; 

    const animate = (t: number) => {
      pulseCycle = STATE_SPEEDS[state];

      ctx.clearRect(0, 0, areaSize, areaSize);
      
      // Render out-of-focus background jellies
      bgJellies.forEach(bj => {
        bj.y -= 0.1;
        if (bj.y < -50) bj.y = areaSize + 50;
        
        const bjCycle = ((t + bj.phase * 1000) % pulseCycle) / pulseCycle;
        let scale = 1.0;
        if (bjCycle < 0.25) scale = 1.0 - (0.5 - 0.5 * Math.cos(bjCycle/0.25*Math.PI)) * 0.15;
        else scale = 0.85 + (0.5 - 0.5 * Math.cos((bjCycle-0.25)/0.75*Math.PI)) * 0.15;
        
        ctx.beginPath();
        ctx.arc(bj.x, bj.y, bj.r * scale, 0, Math.PI*2);
        const grad = ctx.createRadialGradient(bj.x, bj.y, 0, bj.x, bj.y, bj.r * scale);
        grad.addColorStop(0, "rgba(180, 220, 255, 0.09)");
        grad.addColorStop(1, "rgba(180, 220, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Render drifting caustics
      caustics.forEach(p => {
        p.x += p.vx + Math.sin(t * 0.001 + p.phase) * 0.2;
        p.y += p.vy;
        if (p.y < -30) p.y = areaSize + 30;
        if (p.x < -30) p.x = areaSize + 30;
        if (p.x > areaSize + 30) p.x = -30;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 200, 255, ${p.opacity * (0.5 + 0.5 * Math.sin(t*0.002 + p.phase))})`;
        ctx.fill();
      });

      const cyclePos = (t % pulseCycle) / pulseCycle;
      
      // Eased contraction/relaxation scale
      let pulseScale = 1.0;
      if (cyclePos < 0.25) {
        pulseScale = 1.0 - (0.5 - 0.5 * Math.cos(cyclePos / 0.25 * Math.PI)) * 0.18;
      } else {
        pulseScale = 0.82 + (0.5 - 0.5 * Math.cos((cyclePos - 0.25) / 0.75 * Math.PI)) * 0.18;
      }

      // Radial Shimmer Band
      let sweep = cyclePos;
      shimmer1Ref.current?.setAttribute('offset', Math.max(0, sweep - 0.15) * 100 + "%");
      shimmer2Ref.current?.setAttribute('offset', sweep * 100 + "%");
      shimmer3Ref.current?.setAttribute('offset', Math.min(1, sweep + 0.15) * 100 + "%");
      
      let shimmerOp = 1.0;
      if (sweep > 0.8) shimmerOp = 1.0 - (sweep - 0.8) / 0.2;
      else if (sweep < 0.2) shimmerOp = sweep / 0.2;
      shimmerCircleRef.current?.setAttribute('opacity', shimmerOp.toFixed(2));

      // Gonads independent breathing opacity
      gonads.forEach((gObj) => {
        const op = 0.75 + 0.25 * Math.sin(cyclePos * Math.PI * 2 + gObj.phase);
        gObj.g.setAttribute("opacity", op.toFixed(2));
      });

      // Autonomous drift (scaled down so it doesn't leave the bounds)
      const floatY = Math.sin(t * 0.0005) * 15 * scaleRatio;
      const floatX = Math.cos(t * 0.0004) * 10 * scaleRatio;
      const rotation = Math.sin(t * 0.0003) * 6;
      jellyGroupRef.current?.setAttribute("transform", `translate(${floatX}, ${floatY}) scale(${pulseScale}) rotate(${rotation})`);
      
      // Parallax application
      currentX += (mouseX - currentX) * 0.03;
      currentY += (mouseY - currentY) * 0.03;
      if (containerRef.current) {
        const svgElement = containerRef.current.querySelector('svg');
        if (svgElement) svgElement.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentX * 0.05}deg)`;
      }

      // EXAGGERATED Phase-delayed Ripple
      const tentaclePhase = (cyclePos - 0.12 + 1.0) % 1.0;
      let tentaclePulse = 1.0;
      if (tentaclePhase < 0.25) {
        tentaclePulse = 1.0 - (0.5 - 0.5 * Math.cos(tentaclePhase / 0.25 * Math.PI)) * 0.22;
      } else {
        tentaclePulse = 0.78 + (0.5 - 0.5 * Math.cos((tentaclePhase - 0.25) / 0.75 * Math.PI)) * 0.22;
      }
      const tipScale = tentaclePulse / pulseScale;

      tentacles.forEach((tent) => {
        const wave = Math.sin(t * 0.002 + tent.offset) * 8; 
        const r1 = 140; 
        const r2 = 140 + (tent.length * tipScale * tipScale); 
        const sway = Math.sin(t * 0.001 + tent.angle * 2) * 15 + tent.curveBias;
        
        const x1 = Math.cos(tent.angle) * r1;
        const y1 = Math.sin(tent.angle) * r1;
        const x2 = Math.cos(tent.angle) * r2 + Math.cos(tent.angle + Math.PI/2) * sway;
        const y2 = Math.sin(tent.angle) * r2 + Math.sin(tent.angle + Math.PI/2) * sway;
        
        const rMid = (r1 + r2) / 2;
        const cx = Math.cos(tent.angle) * rMid + Math.cos(tent.angle + Math.PI/2) * (sway * 0.5 + wave);
        const cy = Math.sin(tent.angle) * rMid + Math.sin(tent.angle + Math.PI/2) * (sway * 0.5 + wave);
        
        tent.path.setAttribute("d", `M ${x1.toFixed(1)},${y1.toFixed(1)} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`);
      });

      // Independent Organic Frilly Sway
      oralArms.forEach((arm) => {
        const ptsOuter = [];
        const ptsInner = [];
        const numPts = 25; 
        const armLength = 75 + 20 * Math.sin(t * 0.001 * arm.freq + arm.phase);
        
        for(let j=0; j<=numPts; j++) {
          const r = (j/numPts) * armLength;
          const a = arm.angleOffset + Math.sin(t * 0.0005 * arm.freq + arm.phase + j*0.1) * 0.6;
          
          const frillOuter = Math.sin(j * 4 + t * 0.002 + arm.phase) * (j/numPts) * 15;
          const frillInner = Math.sin(j * 5 + t * 0.0025 + arm.phase) * (j/numPts) * 10;
          
          const xo = Math.cos(a) * r + Math.cos(a + Math.PI/2) * frillOuter;
          const yo = Math.sin(a) * r + Math.sin(a + Math.PI/2) * frillOuter;
          ptsOuter.push(`${xo.toFixed(1)},${yo.toFixed(1)}`);
          
          const xi = Math.cos(a) * r + Math.cos(a + Math.PI/2) * frillInner;
          const yi = Math.sin(a) * r + Math.sin(a + Math.PI/2) * frillInner;
          ptsInner.push(`${xi.toFixed(1)},${yi.toFixed(1)}`);
        }
        
        for(let j=numPts; j>=0; j--) {
          const r = (j/numPts) * armLength;
          const a = arm.angleOffset + Math.sin(t * 0.0005 * arm.freq + arm.phase + j*0.1) * 0.6;
          
          const frillOuter = -Math.sin(j * 3.5 + t * 0.0025 + arm.phase) * (j/numPts) * 15;
          const frillInner = -Math.sin(j * 4.5 + t * 0.003 + arm.phase) * (j/numPts) * 10;
          
          const xo = Math.cos(a) * r + Math.cos(a + Math.PI/2) * frillOuter;
          const yo = Math.sin(a) * r + Math.sin(a + Math.PI/2) * frillOuter;
          ptsOuter.push(`${xo.toFixed(1)},${yo.toFixed(1)}`);
          
          const xi = Math.cos(a) * r + Math.cos(a + Math.PI/2) * frillInner;
          const yi = Math.sin(a) * r + Math.sin(a + Math.PI/2) * frillInner;
          ptsInner.push(`${xi.toFixed(1)},${yi.toFixed(1)}`);
        }
        
        arm.outerPath.setAttribute("d", "M " + ptsOuter[0] + " L " + ptsOuter.slice(1).join(" L ") + " Z");
        arm.innerPath.setAttribute("d", "M " + ptsInner[0] + " L " + ptsInner.slice(1).join(" L ") + " Z");
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size, state, uid, areaSize]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        backgroundColor: "transparent",
        overflow: "visible", // ALLOW ELEMENTS TO BLEED OUTSIDE
      }}
      role="img"
      aria-label={`Daria AI status: ${state}`}
    >
      {/* Expanded Canvas for background particles & caustics */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: -offset,
          left: -offset,
          width: areaSize,
          height: areaSize,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Container holding the SVG without a circular mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 5,
          overflow: "visible",
        }}
      >
        <svg
          viewBox="-200 -200 400 400"
          style={{
            width: "90%",
            height: "90%",
            overflow: "visible", // PREVENT TENTACLES CLIPPING
            filter: "drop-shadow(0 0 40px rgba(100, 180, 255, 0.15))",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id={`heavy-glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id={`soft-blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
            </filter>

            <radialGradient id={`bellGrad-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
              <stop offset="35%" stopColor="rgba(220, 240, 255, 0.3)" />
              <stop offset="70%" stopColor="rgba(140, 180, 220, 0.15)" />
              <stop offset="95%" stopColor="rgba(100, 150, 200, 0.4)" />
              <stop offset="100%" stopColor="rgba(80, 130, 180, 0.1)" />
            </radialGradient>

            <radialGradient id={`shimmerGrad-${uid}`} cx="50%" cy="50%" r="50%">
              <stop ref={shimmer1Ref} offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop ref={shimmer2Ref} offset="10%" stopColor="rgba(255, 255, 255, 0.5)" />
              <stop ref={shimmer3Ref} offset="20%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>

            <radialGradient id={`centerGrad-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.35)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>

            <mask id={`canalMask-${uid}`}>
              <radialGradient id={`canalMaskGrad-${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="15%" stopColor="white" stopOpacity="1" />
                <stop offset="85%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <circle r="140" fill={`url(#canalMaskGrad-${uid})`} />
            </mask>
          </defs>

          <g ref={jellyGroupRef}>
            <g ref={tentaclesGroupRef}></g>
            
            <circle id="bell" r="140" fill={`url(#bellGrad-${uid})`} filter={`url(#glow-${uid})`} />
            <g ref={canalsGroupRef} mask={`url(#canalMask-${uid})`}></g>
            
            <circle
              ref={shimmerCircleRef}
              r="140"
              fill={`url(#shimmerGrad-${uid})`}
              style={{ mixBlendMode: "overlay" }}
            />
            
            <circle r="55" fill={`url(#centerGrad-${uid})`} filter={`url(#heavy-glow-${uid})`} />
            <g ref={oralArmsGroupRef}></g>
            <g ref={gonadsGroupRef}></g>
          </g>
        </svg>
      </div>

      {/* Cinematic Noise Overlay */}
      <div
        style={{
          position: "absolute",
          top: -offset,
          left: -offset,
          width: areaSize,
          height: areaSize,
          zIndex: 10,
          opacity: 0.04,
          pointerEvents: "none",
          background: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`,
        }}
      />
    </div>
  );
}