import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, Sparkles } from 'lucide-react';
import { FloatingProduct } from './FloatingProduct';

interface HeroProps {
  onStart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">



      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="mt-20 relative z-20 max-w-5xl text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-blue-800 to-slate-900 drop-shadow-sm filter pb-4 leading-[1.1]"
      >
        Stop Sending
        <span className="relative mx-3 inline-block text-slate-300 decoration-slate-400 line-through decoration-4 decoration-wavy underline-offset-8 opacity-60 mix-blend-multiply blur-[1px]">
          Ugly
        </span>
        <br className="hidden sm:block" />
        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent drop-shadow-md">
          Stunning
        </span> PDFs.
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed"
      >
        The AI engine that turns boring text into <span className="text-slate-900 font-medium">magazine-grade editorial documents</span> instantly. No design skills required.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <button
          onClick={onStart}
          className="group relative flex h-12 items-center gap-2 rounded-full bg-slate-900 px-8 text-base font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-900/20"
        >
          <Upload className="h-4 w-4" />
          <span>Upload PDF</span>
          <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 blur-lg opacity-0 transition-opacity group-hover:opacity-30" />
        </button>

        <button className="group flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-8 text-base font-semibold text-slate-700 backdrop-blur-sm transition-all hover:bg-white hover:border-slate-300 active:scale-95 shadow-sm">
          <Play className="h-4 w-4 fill-slate-700" />
          <span>See Demo</span>
        </button>
      </motion.div>

      {/* Floating Product Preview */}
      <div className="mt-20 w-full max-w-6xl perspective-[2000px] relative will-change-transform">
        {/* Cloud Glow Behind Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
        <FloatingProduct />
      </div>

    </div>
  );
};