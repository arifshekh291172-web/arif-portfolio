import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { profileData } from '../../data/profile';

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'AI Assistant', href: '#ai-assistant' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#02050E] text-slate-400 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Roles */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center">
              <span className="font-mono text-xs text-cyan-400 font-bold">&gt;_</span>
            </div>
            <span>ARIF<span className="text-cyan-400">.SHEKH</span></span>
          </div>

          <p className="text-xs font-mono text-slate-400 mt-2">
            AI/ML Developer | Python | Computer Vision | Generative AI | Full Stack | IoT
          </p>

          <p className="text-[11px] text-slate-500 mt-1">
            Diploma in AI &amp; ML • Theem College of Engineering, Boisar
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-3 rounded-2xl bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:shadow-glow-cyan transition-all"
        >
          <ArrowUp size={16} />
        </button>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <span>© 2026 Arif Shekh. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Engineered with React, Three.js &amp; Tailwind CSS
        </span>
      </div>
    </footer>
  );
}
