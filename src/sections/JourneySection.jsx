import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  ScanFace,
  Layers,
  Sparkles,
  Cpu,
  Rocket,
  GitFork
} from 'lucide-react';
import { profileData } from '../data/profile';

const JOURNEY_ICONS = {
  GraduationCap,
  Code2,
  ScanFace,
  Layers,
  Sparkles,
  Cpu,
  Rocket
};

function JourneyIcon({ name }) {
  const IconComponent = JOURNEY_ICONS[name] || Code2;
  return <IconComponent size={18} className="text-cyan-400" />;
}

export default function JourneySection() {
  const { journey } = profileData;

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <GitFork size={13} />
            <span>05 // EVOLUTIONARY TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Engineering Journey
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            The progression of technical mastery from foundational AI and algorithms to autonomous computer vision and IoT systems.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Timeline Spine Container */}
        <div className="relative">
          {/* Vertical Glowing Spine */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-blue-500 -translate-x-1/2 opacity-40 shadow-glow-cyan" />

          <div className="space-y-12">
            {journey.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B0F19] border-2 border-cyan-400 flex items-center justify-center shadow-glow-cyan z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
                  </div>

                  {/* Spacer for Alternate Column */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Timeline Card */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-10' : 'sm:pl-10'}`}>
                    <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 hover:shadow-glow-cyan transition-all group">
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                          STAGE 0{index + 1} // {item.period}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                          <JourneyIcon name={item.icon} />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>

                      <div className="text-xs font-mono text-purple-300 mt-0.5">
                        {item.institution}
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-white/5 text-[10px] font-mono text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
