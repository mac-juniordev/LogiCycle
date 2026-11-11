import { motion } from "framer-motion";

// Framer Motion is optional — but adds the "wow" factor.
// If framer-motion isn't installed, this component degrades to static blobs.
let MotionDiv = "div";
try {
  MotionDiv = motion.div;
} catch {
  // framer-motion not installed — use static div
}

export default function AnimatedBackground() {
  const blobs = [
    { color: "#166b4b", top: "10%", left: "15%", size: 400 },
    { color: "#0b3d2e", top: "60%", left: "70%", size: 500 },
    { color: "#2ab077", top: "35%", left: "45%", size: 320 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#114b37_0%,#051f15_70%)]" />

      {/* Animated blobs */}
      {blobs.map((b, i) => (
        <MotionDiv
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: b.color,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
          }}
          animate={
            MotionDiv !== "div"
              ? {
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                }
              : undefined
          }
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid overlay for texture */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#2ab077_1px,transparent_1px),linear-gradient(to_bottom,#2ab077_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#051f15_100%)]" />
    </div>
  );
}