import { motion } from "framer-motion";
import { Truck, Lock } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground.jsx";

export default function DispatchPanel() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-hazard/10 border border-hazard/30 mb-6">
            <Truck className="w-10 h-10 text-hazard" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/50 border border-forest-700 text-forest-500 text-xs font-semibold mb-4">
            <Lock className="w-3 h-3" />
            RESTRICTED ROUTE
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Fleet Dispatch Unit
          </h1>
          <p className="text-slate-400">
            This panel arrives in Phase 6. It will fire a siren when a route
            dispatches, show a live stop-by-stop timeline, and let crews
            acknowledge cleared stops.
          </p>
          <div className="mt-8 text-xs text-slate-500 font-mono">
            /node-fleet-driver-beta
          </div>
        </motion.div>
      </div>
    </>
  );
}