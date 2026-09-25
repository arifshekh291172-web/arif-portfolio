import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 10;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white select-none px-4"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex flex-col items-center max-w-sm w-full">
          {/* Ambient Glow */}
          <div className="absolute w-48 h-48 -top-12 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Holographic Logo Mark */}
          <motion.div
            className="w-16 h-16 mb-8 rounded-2xl border border-cyan-500/40 bg-slate-900/60 p-3 shadow-glow-cyan flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-full border border-purple-500/60 flex items-center justify-center animate-spin-slow">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-glow-cyan" />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            className="text-2xl sm:text-3xl font-bold tracking-widest text-slate-100 flex items-center gap-1 font-sans"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            ARIF<span className="text-cyan-400">.SHEKH</span>
          </motion.h1>

          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-slate-400 font-mono mt-2 mb-8"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            AI/ML Developer
          </motion.p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-[260px] bg-slate-900 border border-slate-800 rounded-full p-0.5 overflow-hidden shadow-inner">
            <motion.div
              className="h-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          {/* Technical Telemetry */}
          <div className="flex justify-between w-full max-w-[260px] mt-2 font-mono text-[10px] text-slate-500">
            <span>INITIALIZING AI CORE</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
