import { motion } from "framer-motion";
import { Camera, ShieldCheck, Truck } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Camera,
    title: "Report",
    body: "A citizen photographs a clogged drain in 20 seconds. Four fields. Anonymous.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "Verify",
    body: "Our engine verifies EXIF timestamp and computes a priority score. Fraud-resistant.",
  },
  {
    n: "03",
    icon: Truck,
    title: "Dispatch",
    body: "The council receives a priority-ranked queue and dispatches crews to the right drains.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-semibold text-steel-400 uppercase tracking-[0.2em] mb-3">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-cream tracking-tight">
            Three steps. One rainy season.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative p-8 rounded-2xl bg-[#121e2b] border border-[#1e2d3d] hover:border-[#1e5f8f]/60 transition-colors group"
            >
              <div className="text-xs font-mono font-bold text-steel-500 mb-4 tracking-widest">
                {step.n}
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#1e5f8f]/15 border border-[#1e5f8f]/40 flex items-center justify-center mb-5 group-hover:bg-[#1e5f8f]/25 transition-colors">
                <step.icon className="w-6 h-6 text-steel-400" />
              </div>
              <h3 className="text-xl font-bold text-cream mb-2">{step.title}</h3>
              <p className="text-cream-muted text-sm leading-relaxed">{step.body}</p>

              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                  className="hidden md:block absolute top-1/2 -right-3 text-steel-500 text-2xl font-thin z-10"
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto text-center"
        >
          <Stat value="10" label="Zones · Bamenda" />
          <Stat value="6" label="Material types" />
          <Stat value="20s" label="To report" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="p-4">
      <div className="text-3xl font-bold text-steel-400 font-mono">{value}</div>
      <div className="text-xs text-cream-muted uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}