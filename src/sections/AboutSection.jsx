import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Target, Sparkles, Cpu, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/profile';

export default function AboutSection() {
  const { about } = profileData;
  const { card } = about;

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#030712]/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Terminal size={13} />
            <span>01 // PROFILE OVERVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {about.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Authentic Bio Narrative */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-5 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-white/5">
                <Sparkles size={14} className="text-cyan-400" />
                <span>MISSION STATEMENT & CORE PHILOSOPHY</span>
              </div>

              {about.bio.map((paragraph, index) => (
                <p key={index} className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="text-slate-400 text-[10px]">PROGRAM</div>
                  <div className="text-cyan-300 font-bold mt-0.5">Diploma in AI & ML</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="text-slate-400 text-[10px]">YEAR</div>
                  <div className="text-purple-300 font-bold mt-0.5">Third Year Student</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 col-span-2 sm:col-span-1">
                  <div className="text-slate-400 text-[10px]">AFFILIATION</div>
                  <div className="text-blue-300 font-bold mt-0.5">MSBTE Board</div>
                </div>
              </div>
            </div>

            {/* Practical engineering values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex-shrink-0">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Pragmatic Prototyping</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Transforming machine learning algorithms into live, working software with interactive interfaces.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-purple-500/30 transition-all flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex-shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Hardware to Cloud</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Bridging microcontroller sensor networks with cloud databases and computer vision models.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Verified Profile Card */}
          <motion.div
            className="lg:col-span-5 flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-panel-glow w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden">
              {/* Top Card Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider">
                    SYSTEM ID // AS-2026
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                    VERIFIED CANDIDATE
                  </span>
                </div>

                {/* Candidate Name & Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {card.name}
                </h3>
                <p className="text-sm font-mono text-cyan-300 mt-1 font-medium">
                  {card.role}
                </p>

                {/* Academic & Geographic Telemetry */}
                <div className="mt-6 space-y-3.5 text-sm">
                  <div className="flex items-start gap-3 text-slate-300">
                    <GraduationCap size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">{card.college}</div>
                      <div className="text-xs text-slate-400">{card.degree}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <BookOpen size={18} className="text-purple-400 flex-shrink-0" />
                    <span>Board: <strong className="text-white font-medium">{card.board}</strong></span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin size={18} className="text-pink-400 flex-shrink-0" />
                    <span>Location: <strong className="text-white font-medium">{card.location}</strong></span>
                  </div>
                </div>

                {/* Core Focus Tags */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                    <Target size={14} className="text-cyan-400" />
                    <span>CORE ENGINEERING FOCUS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-xs font-mono text-slate-200"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>ACADEMIC STATUS</span>
                <span className="text-slate-300 font-semibold">FINAL YEAR DIPLOMA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
