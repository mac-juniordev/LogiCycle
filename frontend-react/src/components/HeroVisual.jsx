import { motion } from "framer-motion";
import Logo from "./Logo.jsx";

export default function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Hand-drawn water ripple SVG behind logo */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden
      >
        <motion.circle
          cx="300"
          cy="300"
          r="180"
          stroke="#3b82b8"
          strokeWidth="1"
          opacity="0.15"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.circle
          cx="300"
          cy="300"
          r="240"
          stroke="#3b82b8"
          strokeWidth="0.75"
          opacity="0.08"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
        <motion.circle
          cx="300"
          cy="300"
          r="300"
          stroke="#3b82b8"
          strokeWidth="0.5"
          opacity="0.04"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.04 }}
          transition={{ duration: 1.5, delay: 0.9 }}
        />
      </svg>

      {/* Oversized offset logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        className="relative"
      >
        <Logo size={420} className="drop-shadow-2xl opacity-95" />
      </motion.div>

      {/* Amber pulse ring around the dot — subtle signal */}
      <motion.div
        className="absolute rounded-full border-2 border-[#e07a1f]/30"
        style={{ width: 480, height: 480 }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}