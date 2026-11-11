import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Copy, Check } from "lucide-react";
import Logo from "./Logo.jsx";
import toast from "react-hot-toast";

export default function Navbar({ onReportClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setContactOpen(false);
      }
    }
    if (contactOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [contactOpen]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied`);
    });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1219]/85 border-b border-[#1e2d3d]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <Logo size={36} />
          <span className="text-cream font-bold text-lg tracking-tight group-hover:text-steel-400 transition-colors">
            LogiCycle
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-cream-muted hover:text-steel-400 transition-colors relative group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-steel-600 group-hover:w-full transition-all duration-300" />
          </a>

          <div className="relative" ref={contactRef}>
            <button
              onClick={() => setContactOpen((v) => !v)}
              className="text-sm font-medium text-cream-muted hover:text-steel-400 transition-colors relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-steel-600 group-hover:w-full transition-all duration-300" />
            </button>

            <AnimatePresence>
              {contactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-72 p-4 rounded-xl bg-[#121e2b] border border-[#1e2d3d] shadow-2xl shadow-black/60"
                >
                  <div className="text-xs font-semibold text-steel-400 uppercase tracking-wider mb-3">
                    Contact Bamenda Council
                  </div>
                  <div className="space-y-2">
                    <ContactRow
                      icon={Phone}
                      label="+237 683 764 924"
                      value="+237683764924"
                      onCopy={copyToClipboard}
                    />
                    <ContactRow
                      icon={Mail}
                      label="junmac@gmail.com"
                      value="junmac@gmail.com"
                      onCopy={copyToClipboard}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReportClick}
            className="px-5 py-2.5 rounded-lg bg-steel-700 hover:bg-steel-600 text-white text-sm font-semibold shadow-lg shadow-steel-900/40 transition-colors"
          >
            Report a Hazard
          </motion.button>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-cream hover:bg-[#121e2b] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[#1e2d3d] bg-[#0a1219]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-3">
              <a
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-cream-muted hover:text-steel-400 font-medium transition-colors"
              >
                How It Works
              </a>
              <div className="py-2 border-t border-[#1e2d3d] space-y-2">
                <div className="text-xs font-semibold text-steel-400 uppercase tracking-wider">
                  Contact
                </div>
                <a href="tel:+237683764924" className="flex items-center gap-2 text-sm text-cream-muted py-1">
                  <Phone className="w-4 h-4 text-cream-dim" />
                  +237 683 764 924
                </a>
                <a href="mailto:junmac@gmail.com" className="flex items-center gap-2 text-sm text-cream-muted py-1">
                  <Mail className="w-4 h-4 text-cream-dim" />
                  junmac@gmail.com
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onReportClick?.();
                }}
                className="w-full mt-2 py-3 rounded-lg bg-steel-700 hover:bg-steel-600 text-white font-semibold transition-colors"
              >
                Report a Hazard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function ContactRow({ icon: Icon, label, value, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(value, label);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#1a2836] transition-colors text-left group"
    >
      <Icon className="w-4 h-4 text-steel-500 flex-shrink-0" />
      <span className="flex-1 text-sm text-cream truncate">{label}</span>
      {copied ? (
        <Check className="w-4 h-4 text-forest-400 flex-shrink-0" />
      ) : (
        <Copy className="w-4 h-4 text-cream-dim group-hover:text-steel-400 flex-shrink-0 transition-colors" />
      )}
    </button>
  );
}