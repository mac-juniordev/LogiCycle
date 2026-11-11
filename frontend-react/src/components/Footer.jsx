import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-[#1e2d3d] bg-[#0a1219]/80 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Logo size={32} />
              <span className="text-cream font-bold">LogiCycle</span>
            </div>
            <p className="text-sm text-cream-muted leading-relaxed">
              Dry Streets for a Safer Tomorrow.
              <br />
              SDG 13 Climate Action · Bamenda, Cameroon
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold text-steel-400 uppercase tracking-wider mb-3">
              Contact
            </div>
            <div className="space-y-2">
              <a
                href="tel:+237683764924"
                className="flex items-center gap-2 text-sm text-cream-muted hover:text-steel-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +237 683 764 924
              </a>
              <a
                href="mailto:junmac@gmail.com"
                className="flex items-center gap-2 text-sm text-cream-muted hover:text-steel-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                junmac@gmail.com
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-steel-400 uppercase tracking-wider mb-3">
              Built For
            </div>
            <p className="text-sm text-cream-muted leading-relaxed">
              Bamenda City Council · North West Region
              <br />
              Hackathon · SDG 13 Climate Action
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1e2d3d] flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream-dim">
          <div>© {new Date().getFullYear()} LogiCycle · All rights reserved</div>
          <div>Made in Cameroon 🇨🇲</div>
        </div>
      </div>
    </motion.footer>
  );
}