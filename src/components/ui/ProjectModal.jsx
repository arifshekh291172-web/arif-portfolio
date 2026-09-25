import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0B0F19] border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
        >
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 flex-shrink-0">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {project.badge || project.categoryName}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ID // {project.id}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
                  {project.summary}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close Project Modal"
                className="p-2 rounded-xl bg-slate-800/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-all flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-white/5">
            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Problem */}
              <div className="p-5 rounded-2xl bg-red-950/15 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <AlertCircle size={15} />
                  PROBLEM STATEMENT
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="p-5 rounded-2xl bg-cyan-950/15 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 size={15} />
                  ENGINEERING SOLUTION
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Animated Architecture Diagram Flow */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                    <Layers size={14} />
                    SYSTEM ARCHITECTURE & DATA FLOW
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    REAL-TIME PIPELINE
                  </span>
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-white/10 overflow-x-auto">
                  <div className="flex items-center justify-between min-w-[650px] gap-2">
                    {project.architecture.map((step, index) => (
                      <React.Fragment key={step.step}>
                        <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex-1 min-w-[95px] group">
                          <span className="text-[10px] font-mono text-cyan-400 font-bold mb-1">
                            {step.step}
                          </span>
                          <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {step.name}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                            {step.desc}
                          </span>
                        </div>

                        {index < project.architecture.length - 1 && (
                          <div className="flex items-center justify-center text-cyan-500/60 animate-pulse px-1">
                            <ArrowRight size={14} />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Key Features & Tech Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              {/* Key Features */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Cpu size={14} className="text-purple-400" />
                  KEY FEATURES
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-blue-400" />
                  TECHNOLOGY STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Role & Result */}
                <div className="mt-5 pt-4 border-t border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-slate-500">ROLE //</span>
                    <span className="font-semibold text-slate-200">{project.role}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-slate-500">MEASURABLE RESULT //</span>
                    <span className="text-slate-300 italic">{project.result}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              VERIFIED PORTFOLIO SPECIFICATION
            </div>

            <div className="flex items-center gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white border border-white/10 flex items-center gap-2 transition-all hover:border-cyan-500/50"
                >
                  <Github size={14} />
                  <span>SOURCE CODE</span>
                </a>
              ) : (
                <span className="px-4 py-2 rounded-xl bg-slate-900/60 text-xs font-mono text-slate-500 border border-white/5 cursor-not-allowed">
                  CODE PROPRIETARY / ACADEMIC
                </span>
              )}

              {project.liveDemo ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-mono font-bold text-slate-950 flex items-center gap-2 shadow-glow-cyan transition-all"
                >
                  <ExternalLink size={14} />
                  <span>LIVE DEMO</span>
                </a>
              ) : (
                <span className="px-3 py-2 text-xs font-mono text-slate-500 italic">
                  Local / Edge Deployment
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
