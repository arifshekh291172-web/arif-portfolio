import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Send, Sparkles, Terminal } from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';
import { profileData } from '../data/profile';

export default function HeroSection() {
  const { hero } = profileData;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-gradient"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Technical Narrative & Call-To-Actions */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-6 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase font-semibold text-[11px]">
              {profileData.status}
            </span>
          </div>

          {/* Subtitle Greeting */}
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm sm:text-base font-semibold mb-3 tracking-wide">
            <Terminal size={18} className="text-cyan-400" />
            <span>{hero.greeting}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-5">
            <span className="text-gradient-cyan-purple block">AI/ML Developer</span>
            <span>Building Intelligent Digital Experiences.</span>
          </h1>

          {/* Supporting Technical Text */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            {hero.supportingText}
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm font-sans flex items-center justify-center gap-2.5 shadow-glow-cyan hover:shadow-cyan-400/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 font-medium text-sm font-sans flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto backdrop-blur-sm"
            >
              <FileText size={16} className="text-cyan-400" />
              <span>Behind the Code</span>
            </a>

            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-3.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto"
            >
              <Send size={14} />
              <span>Let's Connect</span>
            </button>
          </div>

          {/* Floating Micro Tech Pills */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center gap-2 w-full">
            <span className="text-[11px] font-mono text-slate-500 mr-2 uppercase">SPECIALIZATIONS:</span>
            {hero.floatingTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-slate-900/60 border border-white/5 text-[11px] font-mono text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive AI Core */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Ambient Backing Glow */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* 3D Canvas Canvas Scene */}
          <div className="w-full relative z-10">
            <HeroScene />
          </div>
        </motion.div>
      </div>

      {/* Futuristic Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">SCROLL</span>
        <div className="w-4 h-7 rounded-full border border-slate-600 p-0.5 flex justify-center">
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </div>
      </div>
    </section>
  );
}
