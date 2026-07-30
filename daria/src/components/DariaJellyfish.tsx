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
  /** Pixel size of the whole widget (square). */
  size?: number;
  className?: string;
  /** Determines the color theme of the jellyfish */
  tenant?: "gov" | "enterprise" | "default";
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
    swimAmplitude: 25,
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
    swimAmplitude: 35,
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
}: DariaJellyfishProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  // Theme Colors
  const themeHex =
    tenant === "gov"
      ? "#00E5FF"
      : tenant === "enterprise"
      ? "#6366F1"
      : "#22d3ee";
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

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let raf: number;

    // Initialize random phases for organic tentacle movement
    const outerStrands = Array.from({ length: STRAND_COUNT_OUTER }, (_, i) => ({
      phaseOffset: Math.random() * Math.PI * 2,
      xOffset: (i / (STRAND_COUNT_OUTER - 1) - 0.5) * 2, // -1 to 1
    }));

    const innerStrands = Array.from({ length: STRAND_COUNT_INNER }, (_, i) => ({
      phaseOffset: Math.random() * Math.PI * 2,
      xOffset: (i / (STRAND_COUNT_INNER - 1) - 0.5) * 1.2, // Tighter cluster
    }));

    function draw() {
      if (!ctx) return;
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, size, size);

      // Add ethereal screen blending for bioluminescence
      ctx.globalCompositeOperation = "screen";

      const params = STATE_PARAMS[state];
      const confRatio = confidence / 100;

      // --- 1. SWIM CYCLE PHYSICS ---
      // Creates a fast-contract, slow-expand organic pulse
      const rawPhase = t * params.swimSpeed;
      const swimPhase = rawPhase - Math.sin(rawPhase) * 0.6; 
      const pulse = Math.sin(swimPhase); // Oscillates between -1 and 1

      // Flicker logic for low confidence or signaling
      const flicker =
        params.glowPulse || state === "low-confidence"
          ? 0.7 + Math.sin(t * 0.1) * 0.3
          : 1;
      const baseAlpha = (0.3 + 0.7 * confRatio) * flicker;

      // Base coordinate math based on the canvas size
      const cx = size / 2;
      const baseCy = size * 0.45;
      
      // The bell bobs up and down with the stroke
      const bobbing = pulse * params.swimAmplitude * (size / 240);
      const cy = baseCy + bobbing;

      // Squash and stretch: bell gets taller/thinner when pushing up, wider/flatter when resting
      const bellWidth = size * 0.45 + pulse * (size * 0.05);
      const bellHeight = size * 0.32 - pulse * (size * 0.08);

      // --- 2. DRAW TENTACLES ---
      // We draw tentacles before the front edge of the bell so they appear to originate inside
      
      const drawTentacles = (
        strands: { phaseOffset: number; xOffset: number }[],
        isInner: boolean
      ) => {
        strands.forEach((strand) => {
          const tentacleBaseX = cx + strand.xOffset * (bellWidth * 0.45);
          const tentacleLength = isInner ? size * 0.4 : size * 0.6;
          const segments = 20;
          const segmentLen = tentacleLength / segments;

          ctx.beginPath();
          ctx.moveTo(tentacleBaseX, cy);

          for (let i = 1; i <= segments; i++) {
            const progress = i / segments; // 0 to 1
            
            // Tentacles drag behind the bell movement
            const dragPhase = swimPhase - progress * 1.5;
            const drag = Math.sin(dragPhase) * params.swimAmplitude;

            // Flowing wave traveling down the tentacle
            const wave = Math.sin(
              t * params.tentacleSpeed + strand.phaseOffset - progress * 4
            );
            
            // Amplitude expands near the tips and with wider spread
            const spread = params.tentacleSpread * (size / 240) * (isInner ? 10 : 25);
            const xOffset = wave * spread * progress * (1 - progress * 0.2);

            const tx = tentacleBaseX + xOffset;
            // The Y position incorporates the drag so they compress/expand organically
            const ty = cy + i * segmentLen - drag * progress;

            ctx.lineTo(tx, ty);
          }

          // Styling
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          
          if (isInner) {
            // Oral arms: thick, highly visible, slightly brighter
            ctx.lineWidth = (size / 240) * 8 * (1.2 - pulse * 0.2);
            const grad = ctx.createLinearGradient(0, cy, 0, cy + tentacleLength);
            grad.addColorStop(0, `rgba(${themeLightRgb}, ${0.6 * baseAlpha})`);
            grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
            ctx.strokeStyle = grad;
          } else {
            // Nematocysts: thin, wispy
            ctx.lineWidth = (size / 240) * 1.5;
            const grad = ctx.createLinearGradient(0, cy, 0, cy + tentacleLength);
            grad.addColorStop(0, `rgba(${themeRgb}, ${0.8 * baseAlpha})`);
            grad.addColorStop(1, `rgba(${themeRgb}, 0)`);
            ctx.strokeStyle = grad;
          }
          ctx.stroke();
        });
      };

      // Draw Inner then Outer tentacles
      drawTentacles(innerStrands, true);
      drawTentacles(outerStrands, false);

      // --- 3. DRAW THE BELL ---
      // We draw the bell in layers to create 3D depth and glow

      // Gradient for the bell cap
      const bellGlow = ctx.createRadialGradient(
        cx, cy - bellHeight * 0.3, 0,
        cx, cy - bellHeight * 0.2, bellWidth
      );
      bellGlow.addColorStop(0, `rgba(${themeLightRgb}, ${0.9 * baseAlpha})`);
      bellGlow.addColorStop(0.4, `rgba(${themeRgb}, ${0.5 * baseAlpha})`);
      bellGlow.addColorStop(1, `rgba(${themeRgb}, 0)`);

      // 3A. Draw the back inside edge of the bell opening (creates 3D cavity)
      ctx.beginPath();
      ctx.moveTo(cx - bellWidth / 2, cy);
      ctx.quadraticCurveTo(cx, cy - (size * 0.05) - pulse * (size * 0.02), cx + bellWidth / 2, cy);
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.4 * baseAlpha})`;
      ctx.stroke();

      // 3B. Draw the main dome/cap
      ctx.beginPath();
      ctx.moveTo(cx - bellWidth / 2, cy);
      // Main curved dome going upward
      ctx.bezierCurveTo(
        cx - bellWidth / 2, cy - bellHeight * 1.3,
        cx + bellWidth / 2, cy - bellHeight * 1.3,
        cx + bellWidth / 2, cy
      );
      // Bottom front edge (curves downwards, giving depth)
      ctx.quadraticCurveTo(cx, cy + (size * 0.08) - pulse * (size * 0.03), cx - bellWidth / 2, cy);
      
      ctx.fillStyle = bellGlow;
      ctx.fill();

      // 3C. Draw front rim highlight for volume
      ctx.beginPath();
      ctx.moveTo(cx - bellWidth / 2, cy);
      ctx.quadraticCurveTo(cx, cy + (size * 0.08) - pulse * (size * 0.03), cx + bellWidth / 2, cy);
      ctx.lineWidth = 2 * (size / 240);
      ctx.strokeStyle = `rgba(${themeLightRgb}, ${0.7 * baseAlpha})`;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [size, state, confidence, themeHex, themeRgb, themeLightRgb]);

  return (
    <div
      className={className}
      style={{ 
        position: "relative", 
        width: size, 
        height: size,
        // Optional dark background for bioluminescence testing - remove if placing on your own dark UI
        // backgroundColor: "#0f172a", 
        // borderRadius: "100%" 
      }}
      role="img"
      aria-label={`Daria AI status: ${state}, confidence ${confidence}%`}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}