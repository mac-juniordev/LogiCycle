import { motion } from "framer-motion";
import { ArrowRight, Camera, ShieldCheck, Truck } from "lucide-react";
import SubtleBackground from "../components/SubtleBackground.jsx";
import Navbar from "../components/Navbar.jsx";
import HeroVisual from "../components/HeroVisual.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Footer from "../components/Footer.jsx";

export default function PublicReport() {
  const handleReport = () => {
    alert("Report form arrives in Phase 4 — this is the shell.");
  };

  return (
    <>
      <SubtleBackground />

      <Navbar onReportClick={handleReport} />

      <section id="top" className="relative min-h-[92vh] flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e5f8f]/15 border border-[#1e5f8f]/40 text-steel-400 text-xs font-semibold tracking-wider uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e07a1f] animate-pulse" />
              SDG 13 · Climate Action
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] tracking-tight mb-6 text-hero"
            >
              Dry Streets
              <br />
              for a Safer{" "}
              <span className="text-forest-500">Tomorrow.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-cream-muted max-w-lg mb-10 leading-relaxed"
            >
              Report clogged drains in Bamenda in 20 seconds. Anonymous.
              Help your city clean the right drain before the rains hit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReport}
                className="px-7 py-3.5 rounded-lg bg-steel-700 hover:bg-steel-600 text-white font-semibold shadow-xl shadow-steel-900/50 transition-colors inline-flex items-center gap-2"
              >
                Report a Hazard
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <a
                href="#how-it-works"
                className="px-7 py-3.5 rounded-lg border border-[#1e2d3d] hover:border-[#1e5f8f] hover:text-steel-400 text-cream font-semibold transition-colors inline-flex items-center gap-2"
              >
                How It Works
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex items-center gap-6 text-xs text-cream-muted/80"
            >
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Camera-only
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> EXIF verified
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Priority-routed
              </span>
            </motion.p>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </section>

      <HowItWorks />

      <Footer />
    </>
  );
}a