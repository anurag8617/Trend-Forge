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
//   /** Pixel size of the whole widget (square). */
//   size?: number;
//   className?: string;
//   /** Determines the color theme of the jellyfish */
//   tenant?: "gov" | "enterprise" | "default";
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
//     swimAmplitude: 25,
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
//     swimAmplitude: 35,
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
// }: DariaJellyfishProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const timeRef = useRef(0);

//   // Theme Colors
//   const themeHex =
//     tenant === "gov"
//       ? "#00E5FF"
//       : tenant === "enterprise"
//       ? "#6366F1"
//       : "#22d3ee";
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

//     // Handle high-DPI displays
//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = size * dpr;
//     canvas.height = size * dpr;
//     ctx.scale(dpr, dpr);

//     let raf: number;

//     // Initialize random phases for organic tentacle movement
//     const outerStrands = Array.from({ length: STRAND_COUNT_OUTER }, (_, i) => ({
//       phaseOffset: Math.random() * Math.PI * 2,
//       xOffset: (i / (STRAND_COUNT_OUTER - 1) - 0.5) * 2, // -1 to 1
//     }));

//     const innerStrands = Array.from({ length: STRAND_COUNT_INNER }, (_, i) => ({
//       phaseOffset: Math.random() * Math.PI * 2,
//       xOffset: (i / (STRAND_COUNT_INNER - 1) - 0.5) * 1.2, // Tighter cluster
//     }));

//     function draw() {
//       if (!ctx) return;
//       timeRef.current += 1;
//       const t = timeRef.current;

//       ctx.clearRect(0, 0, size, size);

//       // Add ethereal screen blending for bioluminescence
//       ctx.globalCompositeOperation = "screen";

//       const params = STATE_PARAMS[state];
//       const confRatio = confidence / 100;

//       // --- 1. SWIM CYCLE PHYSICS ---
//       // Creates a fast-contract, slow-expand organic pulse
//       const rawPhase = t * params.swimSpeed;
//       const swimPhase = rawPhase - Math.sin(rawPhase) * 0.6; 
//       const pulse = Math.sin(swimPhase); // Oscillates between -1 and 1

//       // Flicker logic for low confidence or signaling
//       const flicker =
//         params.glowPulse || state === "low-confidence"
//           ? 0.7 + Math.sin(t * 0.1) * 0.3
//           : 1;
//       const baseAlpha = (0.3 + 0.7 * confRatio) * flicker;

//       // Base coordinate math based on the canvas size
//       const cx = size / 2;
//       const baseCy = size * 0.45;
      
//       // The bell bobs up and down with the stroke
//       const bobbing = pulse * params.swimAmplitude * (size / 240);
//       const cy = baseCy + bobbing;

//       // Squash and stretch: bell gets taller/thinner when pushing up, wider/flatter when resting
//       const bellWidth = size * 0.45 + pulse * (size * 0.05);
//       const bellHeight = size * 0.32 - pulse * (size * 0.08);

//       // --- 2. DRAW TENTACLES ---
//       // We draw tentacles before the front edge of the bell so they appear to originate inside
      
//       const drawTentacles = (
//         strands: { phaseOffset: number; xOffset: number }[],
//         isInner: boolean
//       ) => {
//         strands.forEach((strand) => {
//           const tentacleBaseX = cx + strand.xOffset * (bellWidth * 0.45);
//           const tentacleLength = isInner ? size * 0.4 : size * 0.6;
//           const segments = 20;
//           const segmentLen = tentacleLength / segments;

//           ctx.beginPath();
//           ctx.moveTo(tentacleBaseX, cy);

//           for (let i = 1; i <= segments; i++) {
//             const progress = i / segments; // 0 to 1
            
//             // Tentacles drag behind the bell movement
//             const dragPhase = swimPhase - progress * 1.5;
//             const drag = Math.sin(dragPhase) * params.swimAmplitude;

//             // Flowing wave traveling down the tentacle
//             const wave = Math.sin(
//               t * params.tentacleSpeed + strand.phaseOffset - progress * 4
//             );
            
//             // Amplitude expands near the tips and with wider spread
//             const spread = params.tentacleSpread * (size / 240) * (isInner ? 10 : 25);
//             const xOffset = wave * spread * progress * (1 - progress * 0.2);

//             const tx = tentacleBaseX + xOffset;
//             // The Y position incorporates the drag so they compress/expand organically
//             const ty = cy + i * segmentLen - drag * progress;

//             ctx.lineTo(tx, ty);
//           }

//           // Styling
//           ctx.lineCap = "round";
//           ctx.lineJoin = "round";
          
//           if (isInner) {
//             // Oral arms: thick, highly visible, slightly brighter
//             ctx.lineWidth = (size / 240) * 8 * (1.2 - pulse * 0.2);
//             const grad = ctx.createLinearGradient(0, cy, 0, cy + tentacleLength);
//             grad.addColorStop(0, `rgba(${themeLightRgb}, ${0.6 * baseAlpha})`);
//             grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
//             ctx.strokeStyle = grad;
//           } else {
//             // Nematocysts: thin, wispy
//             ctx.lineWidth = (size / 240) * 1.5;
//             const grad = ctx.createLinearGradient(0, cy, 0, cy + tentacleLength);
//             grad.addColorStop(0, `rgba(${themeRgb}, ${0.8 * baseAlpha})`);
//             grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
//             ctx.strokeStyle = grad;
//           }
//           ctx.stroke();
//         });
//       };

//       // Draw Inner then Outer tentacles
//       drawTentacles(innerStrands, true);
//       drawTentacles(outerStrands, false);

//       // --- 3. DRAW THE BELL ---
//       // We draw the bell in layers to create 3D depth and glow

//       // Gradient for the bell cap
//       const bellGlow = ctx.createRadialGradient(
//         cx, cy - bellHeight * 0.3, 0,
//         cx, cy - bellHeight * 0.2, bellWidth
//       );
//       bellGlow.addColorStop(0, `rgba(${themeLightRgb}, ${0.9 * baseAlpha})`);
//       bellGlow.addColorStop(0.4, `rgba(${themeRgb}, ${0.5 * baseAlpha})`);
//       bellGlow.addColorStop(1, `rgba(${themeRgb}, 0)`);

//       // 3A. Draw the back inside edge of the bell opening (creates 3D cavity)
//       ctx.beginPath();
//       ctx.moveTo(cx - bellWidth / 2, cy);
//       ctx.quadraticCurveTo(cx, cy - (size * 0.05) - pulse * (size * 0.02), cx + bellWidth / 2, cy);
//       ctx.lineWidth = 3;
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.4 * baseAlpha})`;
//       ctx.stroke();

//       // 3B. Draw the main dome/cap
//       ctx.beginPath();
//       ctx.moveTo(cx - bellWidth / 2, cy);
//       // Main curved dome going upward
//       ctx.bezierCurveTo(
//         cx - bellWidth / 2, cy - bellHeight * 1.3,
//         cx + bellWidth / 2, cy - bellHeight * 1.3,
//         cx + bellWidth / 2, cy
//       );
//       // Bottom front edge (curves downwards, giving depth)
//       ctx.quadraticCurveTo(cx, cy + (size * 0.08) - pulse * (size * 0.03), cx - bellWidth / 2, cy);
      
//       ctx.fillStyle = bellGlow;
//       ctx.fill();

//       // 3C. Draw front rim highlight for volume
//       ctx.beginPath();
//       ctx.moveTo(cx - bellWidth / 2, cy);
//       ctx.quadraticCurveTo(cx, cy + (size * 0.08) - pulse * (size * 0.03), cx + bellWidth / 2, cy);
//       ctx.lineWidth = 2 * (size / 240);
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.7 * baseAlpha})`;
//       ctx.stroke();

//       raf = requestAnimationFrame(draw);
//     }

//     draw();

//     return () => {
//       cancelAnimationFrame(raf);
//     };
//   }, [size, state, confidence, themeHex, themeRgb, themeLightRgb]);

//   return (
//     <div
//       className={className}
//       style={{ 
//         position: "relative", 
//         width: size, 
//         height: size,
//         // Optional dark background for bioluminescence testing - remove if placing on your own dark UI
//         // backgroundColor: "#0f172a", 
//         // borderRadius: "100%" 
//       }}
//       role="img"
//       aria-label={`Daria AI status: ${state}, confidence ${confidence}%`}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       />
//     </div>
//   );
// }



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
//   /** Pixel size of the whole widget (square). */
//   size?: number;
//   className?: string;
//   /** Determines the color theme of the jellyfish */
//   tenant?: "gov" | "enterprise" | "default";
//   /**
//    * Tilt of the whole jellyfish, in degrees. 0 = upright (bell up, tentacles
//    * straight down). Positive tilts the bell to the right / tentacles trail
//    * left. Negative tilts the bell to the left / tentacles trail right-down,
//    * which is the "swimming diagonally" look in the reference image.
//    * Try -35 to -45 for that look.
//    */
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
//     swimAmplitude: 25,
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
//     swimAmplitude: 35,
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
//     canvas.width = size * dpr;
//     canvas.height = size * dpr;
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

//     const tiltRad = (tiltDeg * Math.PI) / -180;

//     function draw() {
//       if (!ctx) return;
//       timeRef.current += 1;
//       const t = timeRef.current;

//       ctx.clearRect(0, 0, size, size);
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

//       // Pivot point stays fixed on canvas; everything else is drawn in a
//       // rotated local frame so the whole animal (bell + tentacles) tilts
//       // together, and the bob happens along the tilted swim axis.
//       const cx = size / 2;
//       const pivotY = size * 0.45;

//       const bobbing = pulse * params.swimAmplitude * (size / 240);
//       const ly = bobbing; // local y (0,0 = pivot, before rotation)

//       const bellWidth = size * 0.45 + pulse * (size * 0.05);
//       const bellHeight = size * 0.32 - pulse * (size * 0.08);

//       ctx.save();
//       ctx.translate(cx, pivotY);
//       ctx.rotate(tiltRad);
//       // From here on draw in local space with (0, ly) as the bell center.

//       // --- TENTACLES (outer: thin wispy, inner: ruffled ribbons) ---
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

//       // Frilled, lettuce-edge oral arms: a filled ribbon whose width
//       // oscillates so the edges read as ruffles instead of a flat line.
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

//             // Ruffle: fast-oscillating width along the ribbon, tapering
//             // to a point at the tip.
//             const ruffle =
//               Math.sin(progress * 14 + strand.phaseOffset + t * 0.08) * 0.5 +
//               0.5;
//             const taper = 1 - progress * 0.9;
//             const halfWidth =
//               (size / 240) * (4 + ruffle * 6) * taper * (1.1 - pulse * 0.15);

//             // Perpendicular direction along the ribbon's local tangent.
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

//           // A thin brighter core line down the middle sells the "frill edge"
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

//       // --- BELL ---
//       const bellGlow = ctx.createRadialGradient(
//         0, ly - bellHeight * 0.3, 0,
//         0, ly - bellHeight * 0.2, bellWidth
//       );
//       bellGlow.addColorStop(0, `rgba(${themeLightRgb}, ${0.9 * baseAlpha})`);
//       bellGlow.addColorStop(0.4, `rgba(${themeRgb}, ${0.5 * baseAlpha})`);
//       bellGlow.addColorStop(1, `rgba(${themeRgb}, 0)`);

//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly);
//       ctx.quadraticCurveTo(0, ly - (size * 0.05) - pulse * (size * 0.02), bellWidth / 2, ly);
//       ctx.lineWidth = 3;
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.4 * baseAlpha})`;
//       ctx.stroke();

//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly);
//       ctx.bezierCurveTo(
//         -bellWidth / 2, ly - bellHeight * 1.3,
//         bellWidth / 2, ly - bellHeight * 1.3,
//         bellWidth / 2, ly
//       );
//       ctx.quadraticCurveTo(0, ly + (size * 0.08) - pulse * (size * 0.03), -bellWidth / 2, ly);
//       ctx.fillStyle = bellGlow;
//       ctx.fill();

//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly);
//       ctx.quadraticCurveTo(0, ly + (size * 0.08) - pulse * (size * 0.03), bellWidth / 2, ly);
//       ctx.lineWidth = 2 * (size / 240);
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.7 * baseAlpha})`;
//       ctx.stroke();

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
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       />
//     </div>
//   );
// }




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
//   /** Pixel size of the whole widget (square). */
//   size?: number;
//   className?: string;
//   /** Determines the color theme of the jellyfish */
//   tenant?: "gov" | "enterprise" | "default";
//   /**
//    * Tilt of the whole jellyfish, in degrees. 0 = upright (bell up, tentacles
//    * straight down). Positive tilts the bell to the right / tentacles trail
//    * left. Negative tilts the bell to the left / tentacles trail right-down,
//    * which is the "swimming diagonally" look in the reference image.
//    * Try -35 to -45 for that look.
//    */
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
//     swimAmplitude: 25,
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
//     swimAmplitude: 35,
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
//     canvas.width = size * dpr;
//     canvas.height = size * dpr;
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

//     const tiltRad = (tiltDeg * Math.PI) / 180;

//     function draw() {
//       if (!ctx) return;
//       timeRef.current += 1;
//       const t = timeRef.current;

//       ctx.clearRect(0, 0, size, size);
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

//       // Pivot point stays fixed on canvas; everything else is drawn in a
//       // rotated local frame so the whole animal (bell + tentacles) tilts
//       // together, and the bob happens along the tilted swim axis.
//       const cx = size / 2;
//       const pivotY = size * 0.45;

//       const bobbing = pulse * params.swimAmplitude * (size / 240);
//       const ly = bobbing; // local y (0,0 = pivot, before rotation)

//       const bellWidth = size * 0.45 + pulse * (size * 0.05);
//       const bellHeight = size * 0.32 - pulse * (size * 0.08);

//       ctx.save();
//       ctx.translate(cx, pivotY);
//       ctx.rotate(tiltRad);
//       // From here on draw in local space with (0, ly) as the bell center.

//       // --- TENTACLES (outer: thin wispy, inner: ruffled ribbons) ---
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

//       // Frilled, lettuce-edge oral arms: a filled ribbon whose width
//       // oscillates so the edges read as ruffles instead of a flat line.
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

//             // Ruffle: fast-oscillating width along the ribbon, tapering
//             // to a point at the tip.
//             const ruffle =
//               Math.sin(progress * 14 + strand.phaseOffset + t * 0.08) * 0.5 +
//               0.5;
//             const taper = 1 - progress * 0.9;
//             const halfWidth =
//               (size / 240) * (4 + ruffle * 6) * taper * (1.1 - pulse * 0.15);

//             // Perpendicular direction along the ribbon's local tangent.
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

//           // A thin brighter core line down the middle sells the "frill edge"
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

//       // --- BELL ---
//       // The reference image's bell has a scalloped, multi-lobed crown edge
//       // (like a flower rim), not a single smooth curve. Build that here.
//       const lobeCount = 9;
//       const lobeWidth = bellWidth / lobeCount;
//       const lobeDepth = size * 0.05 - pulse * (size * 0.018);

//       const bellGlow = ctx.createRadialGradient(
//         0, ly - bellHeight * 0.3, 0,
//         0, ly - bellHeight * 0.2, bellWidth
//       );
//       bellGlow.addColorStop(0, `rgba(${themeLightRgb}, ${0.9 * baseAlpha})`);
//       bellGlow.addColorStop(0.4, `rgba(${themeRgb}, ${0.5 * baseAlpha})`);
//       bellGlow.addColorStop(1, `rgba(${themeRgb}, 0)`);

//       // 3A. inner cavity edge, sits slightly above the scalloped rim
//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly - size * 0.015);
//       ctx.quadraticCurveTo(
//         0, ly - size * 0.05 - pulse * (size * 0.02),
//         bellWidth / 2, ly - size * 0.015
//       );
//       ctx.lineWidth = 3;
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.4 * baseAlpha})`;
//       ctx.stroke();

//       // 3B. dome + scalloped bottom edge, filled as one closed shape
//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly);
//       ctx.bezierCurveTo(
//         -bellWidth / 2, ly - bellHeight * 1.3,
//         bellWidth / 2, ly - bellHeight * 1.3,
//         bellWidth / 2, ly
//       );
//       for (let i = lobeCount - 1; i >= 0; i--) {
//         const x0 = -bellWidth / 2 + i * lobeWidth;
//         const x1 = x0 + lobeWidth;
//         const midX = (x0 + x1) / 2;
//         ctx.quadraticCurveTo(midX, ly + lobeDepth, x0, ly);
//       }
//       ctx.closePath();
//       ctx.fillStyle = bellGlow;
//       ctx.fill();

//       // 3C. scalloped rim highlight stroke
//       ctx.beginPath();
//       ctx.moveTo(-bellWidth / 2, ly);
//       for (let i = 0; i < lobeCount; i++) {
//         const x0 = -bellWidth / 2 + i * lobeWidth;
//         const x1 = x0 + lobeWidth;
//         const midX = (x0 + x1) / 2;
//         ctx.quadraticCurveTo(midX, ly + lobeDepth, x1, ly);
//       }
//       ctx.lineWidth = 2 * (size / 240);
//       ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.7 * baseAlpha})`;
//       ctx.stroke();

//       // 3D. small speckled highlight dots on each lobe, like the
//       // bioluminescent freckling visible on the bell in the reference image
//       for (let i = 0; i < lobeCount; i++) {
//         const x0 = -bellWidth / 2 + i * lobeWidth;
//         const midX = x0 + lobeWidth / 2;
//         ctx.beginPath();
//         ctx.arc(midX, ly + lobeDepth * 0.6, (size / 240) * 1.2, 0, Math.PI * 2);
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
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       />
//     </div>
//   );
// }



import { useEffect, useRef } from "react";

export type DariaState =
  | "standby"
  | "scanning"
  | "signal"
  | "low-confidence"
  | "executing";

interface DariaJellyfishProps {
  /** Current behavioral state DARIA is in */
  state?: DariaState;
  /** 0–100. Drives glow brightness/steadiness. */
  confidence?: number;
  /** Pixel size of the whole widget (square layout footprint). */
  size?: number;
  className?: string;
  /** Determines the color theme of the jellyfish */
  tenant?: "gov" | "enterprise" | "default";
  /** Tilt of the whole jellyfish */
  tiltDeg?: number;
}

// Behavioral parameters mapped to DARIA's states
const STATE_PARAMS: Record<
  DariaState,
  {
    swimSpeed: number;
    swimAmplitude: number;
    tentacleSpeed: number;
    tentacleSpread: number;
    glowPulse: boolean;
  }
> = {
  standby: {
    swimSpeed: 0.02,
    swimAmplitude: 15,
    tentacleSpeed: 0.015,
    tentacleSpread: 1.0,
    glowPulse: false,
  },
  scanning: {
    swimSpeed: 0.04,
    swimAmplitude: 25, // Restored high jump
    tentacleSpeed: 0.03,
    tentacleSpread: 1.4,
    glowPulse: false,
  },
  signal: {
    swimSpeed: 0.03,
    swimAmplitude: 10,
    tentacleSpeed: 0.02,
    tentacleSpread: 1.1,
    glowPulse: true,
  },
  "low-confidence": {
    swimSpeed: 0.01,
    swimAmplitude: 5,
    tentacleSpeed: 0.01,
    tentacleSpread: 0.8,
    glowPulse: true,
  },
  executing: {
    swimSpeed: 0.06,
    swimAmplitude: 35, // Restored highest jump
    tentacleSpeed: 0.05,
    tentacleSpread: 0.5,
    glowPulse: false,
  },
};

const STRAND_COUNT_OUTER = 8;
const STRAND_COUNT_INNER = 4;

export default function DariaJellyfish({
  state = "standby",
  confidence = 80,
  size = 240,
  className,
  tenant = "default",
  tiltDeg = -38,
}: DariaJellyfishProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  // We make the canvas 50% larger than the layout size so the jellyfish 
  // has room to jump outside the box without being clipped by the canvas edge.
  const overflowScale = 1.5; 
  const actualSize = size * overflowScale;

  // Theme Colors
  const themeRgb =
    tenant === "gov"
      ? "0,229,255"
      : tenant === "enterprise"
      ? "99,102,241"
      : "34,211,238";
  const themeLightRgb =
    tenant === "gov"
      ? "180,252,255"
      : tenant === "enterprise"
      ? "199,210,254"
      : "165,243,252";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = actualSize * dpr;
    canvas.height = actualSize * dpr;
    ctx.scale(dpr, dpr);

    let raf: number;

    const outerStrands = Array.from({ length: STRAND_COUNT_OUTER }, (_, i) => ({
      phaseOffset: Math.random() * Math.PI * 2,
      xOffset: (i / (STRAND_COUNT_OUTER - 1) - 0.5) * 2,
    }));

    const innerStrands = Array.from({ length: STRAND_COUNT_INNER }, (_, i) => ({
      phaseOffset: Math.random() * Math.PI * 2,
      xOffset: (i / (STRAND_COUNT_INNER - 1) - 0.5) * 1.2,
    }));

    const LOBE_COUNT = 10;
    const lobeVariants = Array.from({ length: LOBE_COUNT }, () => ({
      widthMul: 0.75 + Math.random() * 0.5,
      depthMul: 0.6 + Math.random() * 0.8,
      jitter: (Math.random() - 0.5) * 0.4,
    }));
    const domeAsymX = (Math.random() - 0.5) * size * 0.06;

    const tiltRad = (tiltDeg * Math.PI) / -180;

    function draw() {
      if (!ctx) return;
      timeRef.current += 1;
      const t = timeRef.current;

      // Clear the expanded canvas
      ctx.clearRect(0, 0, actualSize, actualSize);
      ctx.globalCompositeOperation = "screen";

      const params = STATE_PARAMS[state];
      const confRatio = confidence / 100;

      const rawPhase = t * params.swimSpeed;
      const swimPhase = rawPhase - Math.sin(rawPhase) * 0.6;
      const pulse = Math.sin(swimPhase);

      const flicker =
        params.glowPulse || state === "low-confidence"
          ? 0.7 + Math.sin(t * 0.1) * 0.3
          : 1;
      const baseAlpha = (0.3 + 0.7 * confRatio) * flicker;

      const cx = size / 2;
      const pivotY = size * 0.45;

      const bobbing = pulse * params.swimAmplitude * (size / 240);
      const ly = bobbing; 

      const bellWidth = size * 0.45 + pulse * (size * 0.05);
      const bellHeight = size * 0.32 - pulse * (size * 0.08);

      ctx.save();
      // Shift context to the center of our expanded canvas
      ctx.translate((actualSize - size) / 2, (actualSize - size) / 2);
      
      ctx.translate(cx, pivotY);
      ctx.rotate(tiltRad);

      const drawOuterTentacles = () => {
        outerStrands.forEach((strand) => {
          const baseX = strand.xOffset * (bellWidth * 0.45);
          const length = size * 0.6;
          const segments = 20;
          const segLen = length / segments;

          ctx.beginPath();
          ctx.moveTo(baseX, ly);
          for (let i = 1; i <= segments; i++) {
            const progress = i / segments;
            const dragPhase = swimPhase - progress * 1.5;
            const drag = Math.sin(dragPhase) * params.swimAmplitude;
            const wave = Math.sin(
              t * params.tentacleSpeed + strand.phaseOffset - progress * 4
            );
            const spread = params.tentacleSpread * (size / 240) * 25;
            const xOff = wave * spread * progress * (1 - progress * 0.2);
            const x = baseX + xOff;
            const y = ly + i * segLen - drag * progress;
            ctx.lineTo(x, y);
          }
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = (size / 240) * 1.5;
          const grad = ctx.createLinearGradient(0, ly, 0, ly + length);
          grad.addColorStop(0, `rgba(${themeRgb}, ${0.8 * baseAlpha})`);
          grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
          ctx.strokeStyle = grad;
          ctx.stroke();
        });
      };

      const drawInnerRuffledArms = () => {
        innerStrands.forEach((strand) => {
          const baseX = strand.xOffset * (bellWidth * 0.35);
          const length = size * 0.55;
          const segments = 26;
          const segLen = length / segments;

          const leftEdge: { x: number; y: number }[] = [];
          const rightEdge: { x: number; y: number }[] = [];

          for (let i = 0; i <= segments; i++) {
            const progress = i / segments;
            const dragPhase = swimPhase - progress * 1.3;
            const drag = Math.sin(dragPhase) * params.swimAmplitude * 0.8;
            const wave = Math.sin(
              t * params.tentacleSpeed * 0.8 +
                strand.phaseOffset -
                progress * 3
            );
            const spread = params.tentacleSpread * (size / 240) * 12;
            const centerX = baseX + wave * spread * progress;
            const centerY = ly + i * segLen - drag * progress;

            const ruffle =
              Math.sin(progress * 14 + strand.phaseOffset + t * 0.08) * 0.5 +
              0.5;
            const taper = 1 - progress * 0.9;
            const halfWidth =
              (size / 240) * (4 + ruffle * 6) * taper * (1.1 - pulse * 0.15);

            const perpX = 1;
            leftEdge.push({ x: centerX - halfWidth * perpX, y: centerY });
            rightEdge.push({ x: centerX + halfWidth * perpX, y: centerY });
          }

          ctx.beginPath();
          ctx.moveTo(leftEdge[0].x, leftEdge[0].y);
          for (const p of leftEdge) ctx.lineTo(p.x, p.y);
          for (let i = rightEdge.length - 1; i >= 0; i--) {
            ctx.lineTo(rightEdge[i].x, rightEdge[i].y);
          }
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, ly, 0, ly + length);
          grad.addColorStop(0, `rgba(${themeLightRgb}, ${0.75 * baseAlpha})`);
          grad.addColorStop(0.6, `rgba(${themeRgb}, ${0.35 * baseAlpha})`);
          grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(baseX, ly);
          for (let i = 0; i <= segments; i++) {
            const p = leftEdge[i];
            const q = rightEdge[i];
            ctx.lineTo((p.x + q.x) / 2, (p.y + q.y) / 2);
          }
          ctx.lineWidth = (size / 240) * 1;
          ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.5 * baseAlpha})`;
          ctx.stroke();
        });
      };

      drawInnerRuffledArms();
      drawOuterTentacles();

      const widthSum = lobeVariants.reduce((s, v) => s + v.widthMul, 0);
      const lobeWidths = lobeVariants.map((v) => (bellWidth * v.widthMul) / widthSum);
      const lobeDepthBase = size * 0.045 - pulse * (size * 0.015);

      const lobeXs: number[] = [-bellWidth / 2];
      lobeWidths.forEach((w) => lobeXs.push(lobeXs[lobeXs.length - 1] + w));

      const bellGlow = ctx.createRadialGradient(
        domeAsymX * 0.3, ly - bellHeight * 0.55, 0,
        domeAsymX * 0.3, ly - bellHeight * 0.5, bellWidth * 0.9
      );
      bellGlow.addColorStop(0, `rgba(${themeLightRgb}, ${0.9 * baseAlpha})`);
      bellGlow.addColorStop(0.45, `rgba(${themeRgb}, ${0.5 * baseAlpha})`);
      bellGlow.addColorStop(1, `rgba(${themeRgb}, 0)`);

      ctx.beginPath();
      ctx.moveTo(-bellWidth / 2, ly - size * 0.015);
      ctx.quadraticCurveTo(
        domeAsymX, ly - size * 0.04 - pulse * (size * 0.015),
        bellWidth / 2, ly - size * 0.015
      );
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.4 * baseAlpha})`;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-bellWidth / 2, ly);
      ctx.bezierCurveTo(
        -bellWidth * 0.62, ly - bellHeight * 0.95,
        -bellWidth * 0.32 + domeAsymX, ly - bellHeight * 1.18,
        domeAsymX * 0.6, ly - bellHeight * 1.08
      );
      ctx.bezierCurveTo(
        bellWidth * 0.32 + domeAsymX * 0.6, ly - bellHeight * 1.12,
        bellWidth * 0.62, ly - bellHeight * 0.88,
        bellWidth / 2, ly
      );
      for (let i = lobeWidths.length - 1; i >= 0; i--) {
        const x0 = lobeXs[i];
        const x1 = lobeXs[i + 1];
        const v = lobeVariants[i];
        const midX = (x0 + x1) / 2 + v.jitter * (size / 240) * 4;
        const depth = lobeDepthBase * v.depthMul;
        ctx.quadraticCurveTo(midX, ly + depth, x0, ly);
      }
      ctx.closePath();
      ctx.fillStyle = bellGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(lobeXs[0], ly);
      for (let i = 0; i < lobeWidths.length; i++) {
        const x0 = lobeXs[i];
        const x1 = lobeXs[i + 1];
        const v = lobeVariants[i];
        const midX = (x0 + x1) / 2 + v.jitter * (size / 240) * 4;
        const depth = lobeDepthBase * v.depthMul;
        ctx.quadraticCurveTo(midX, ly + depth, x1, ly);
      }
      ctx.lineWidth = 2 * (size / 240);
      ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.7 * baseAlpha})`;
      ctx.stroke();

      for (let i = 0; i < lobeWidths.length; i++) {
        const x0 = lobeXs[i];
        const x1 = lobeXs[i + 1];
        const v = lobeVariants[i];
        const midX = (x0 + x1) / 2 + v.jitter * (size / 240) * 4;
        const depth = lobeDepthBase * v.depthMul;
        ctx.beginPath();
        ctx.arc(midX, ly + depth * 0.55, (size / 240) * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${themeLightRgb}, ${0.6 * baseAlpha})`;
        ctx.fill();
      }

      ctx.restore();

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [size, state, confidence, themeRgb, themeLightRgb, tiltDeg]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
      role="img"
      aria-label={`Daria AI status: ${state}, confidence ${confidence}%`}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: actualSize,
          height: actualSize,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}