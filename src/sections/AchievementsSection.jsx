import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ShieldCheck, Sparkles, Upload, FileCheck } from 'lucide-react';
import { profileData } from '../data/profile';

export default function AchievementsSection() {
  const { achievements } = profileData;

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#030712]/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Award size={13} />
            <span>06 // VERIFIED BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Technical Milestones
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
            Verified engineering implementations across AI, Computer Vision, and IoT domains. Ready for credential and certificate integration.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 border border-purple-500/30 text-purple-300">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                    <CheckCircle size={14} />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 text-[11px] font-mono text-cyan-400/90">
                  {item.meta}
                </div>
              </div>

              {/* Certificate Placeholder Slot */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-dashed border-white/15 group-hover:border-purple-500/40 transition-colors flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <FileCheck size={15} className="text-purple-400" />
                    <span className="text-[11px]">Credential Placeholder</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase">Insert PDF / URL</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
