import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TreePine, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest-800/50 border border-forest-700 mb-6">
          <TreePine className="w-10 h-10 text-forest-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">Lost in the woods</h1>
        <p className="text-slate-400 mb-8">
          This path doesn't exist. The storm might have washed it away.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-forest-900/50"
        >
          <Home className="w-4 h-4" />
          Back to LogiCycle
        </Link>
      </motion.div>
    </div>
  );
}