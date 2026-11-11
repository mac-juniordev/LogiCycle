import { motion } from "framer-motion";
import {Leaf, Zap, MapPin, Droplets } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Logo from "../components/Logo.jsx";

export default function PublicReport() {
  return (
    <>
      <AnimatedBackground />

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-6 py-5 border-b border-forest-800/40 backdrop-blur-sm bg-forest-950/60"
        >
          <div className="flex items-center gap-2.5">
            <Logo size={40} />
            <span className="text-white font-bold text-lg tracking-tight">
              LogiCycle
            </span>
          </div>
          <div className="text-xs text-forest-500 font-medium tracking-widest uppercase">
            SDG 13 · Bamenda
          </div>
        </motion.header>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/40 border border-forest-700 text-forest-500 text-xs font-semibold tracking-wide mb-8">
              <Leaf className="w-3.5 h-3.5" />
              CLIMATE ACTION · CAMEROON
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Dry Streets for a{" "}
              <span className="bg-gradient-to-r from-forest-500 to-forest-600 bg-clip-text text-transparent">
                Safer
              </span>{" "}
              Tomorrow.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
              Report clogged drainage hazards in Bamenda. Anonymous. 20 seconds.
              Help your city clean the right drain before the rains hit.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-2xl shadow-xl shadow-forest-500/30 transition-colors inline-flex items-center gap-2.5 text-lg"
              onClick={() =>
                alert("Report form arrives in Phase 4 — this is the shell.")
              }
            >
              <MapPin className="w-5 h-5" />
              Report a Hazard
            </motion.button>

            <p className="text-xs text-slate-500 mt-4">
              No account needed · Your identity stays anonymous
            </p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20 max-w-4xl w-full"
          >
            <FeatureCard
              icon={Zap}
              title="20 Seconds"
              body="Four fields. One photo. Done."
            />
            <FeatureCard
              icon={Droplets}
              title="Before the Rains"
              body="Clean the right drains first."
            />
            <FeatureCard
              icon={MapPin}
              title="Bamenda-First"
              body="10 zones across the North West capital."
            />
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-6 text-center text-xs text-slate-500 border-t border-forest-800/40">
          LogiCycle · Dry Streets for a Safer Tomorrow · Bamenda, Cameroon ·{" "}
          {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}

function FeatureCard({ icon: Icon, title, body }) {
  return (
    <div className="p-5 rounded-2xl bg-forest-900/50 border border-forest-800/60 backdrop-blur-sm text-left hover:border-forest-600 transition-colors">
      <Icon className="w-5 h-5 text-forest-500 mb-3" />
      <div className="text-white font-semibold mb-1">{title}</div>
      <div className="text-sm text-slate-400">{body}</div>
    </div>
  );
}