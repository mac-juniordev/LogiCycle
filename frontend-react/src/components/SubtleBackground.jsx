import { motion } from "framer-motion";

export default function SubtleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base: deep blue-slate — no glow, just flat */}
      <div className="absolute inset-0 bg-[#0a1219]" />

      {/* Very faint steel blue glow — top-left, subtle */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,95,143,0.08) 0%, transparent 65%)",
          width: 900,
          height: 900,
          top: "-25%",
          left: "-15%",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Very faint forest glow — bottom-right */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(42,176,119,0.05) 0%, transparent 65%)",
          width: 800,
          height: 800,
          bottom: "-20%",
          right: "-15%",
        }}
        animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hand-drawn water ripples — bottom-left, very subtle */}
      <svg
        className="absolute bottom-0 left-0 opacity-[0.04]"
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="120" cy="720" r="80" stroke="#3b82b8" strokeWidth="1.2" />
        <circle cx="120" cy="720" r="140" stroke="#3b82b8" strokeWidth="0.9" />
        <circle cx="120" cy="720" r="200" stroke="#3b82b8" strokeWidth="0.6" />
        <circle cx="120" cy="720" r="260" stroke="#3b82b8" strokeWidth="0.4" />
        <circle cx="120" cy="720" r="320" stroke="#3b82b8" strokeWidth="0.3" />
      </svg>

      {/* Grain texture — barely visible, adds materiality */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}