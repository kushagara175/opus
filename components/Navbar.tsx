import React, { useState, useEffect } from 'react';
import { Box, ArrowRight } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface NavbarProps {
  onStart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStart }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 10) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="flex w-full max-w-5xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="font-bold tracking-tight text-slate-900 text-xl">
            Opus<span className="text-blue-600">.</span>
          </span>
        </div>

        {/* Links (Hidden on Mobile) */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">Product</a>
          <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">Templates</a>
          <a href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">Pricing</a>
        </div>

        {/* CTA - Transparent Liquid Glass macOS Style */}
        <button
          onClick={onStart}
          className="group relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-slate-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg overflow-hidden ring-1 ring-white/80 backdrop-blur-xl"
        >
          {/* Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10 transition-opacity group-hover:opacity-80" />

          {/* Subtle Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Content */}
          <span className="relative z-10">Get Started</span>
          <ArrowRight className="relative z-10 h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
        </button>
      </div>
    </motion.nav>
  );
};