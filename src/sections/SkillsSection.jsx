import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Brain, Network, Sparkles, MessageSquare, Layers, Workflow, Database, Bot,
  Eye, ScanFace, Camera, Hand, Crosshair, Activity, Terminal, Code, FileCode,
  Palette, Atom, Sparkle, Layout, Component, Server, Radio, Flame, Boxes,
  Cloud, Binary, Search, GitBranch, Github, Monitor, Send, TerminalSquare,
  Zap, Cpu, Wifi, CircuitBoard, Sliders, Smartphone, RadioReceiver
} from 'lucide-react';
import { skillCategories, skillsData } from '../data/skills';

const ICON_MAP = {
  Code2, Brain, Network, Sparkles, MessageSquare, Layers, Workflow, Database, Bot,
  Eye, ScanFace, Camera, Hand, Crosshair, Activity, Terminal, Code, FileCode,
  Palette, Atom, Sparkle, Layout, Component, Server, Radio, Flame, Boxes,
  Cloud, Binary, Search, GitBranch, Github, Monitor, Send, TerminalSquare,
  Zap, Cpu, Wifi, CircuitBoard, Sliders, Smartphone, RadioReceiver
};

// Dynamic Lucide Icon Helper
function SkillIcon({ name, color, size = 20 }) {
  const IconComponent = ICON_MAP[name] || Cpu;
  return <IconComponent size={size} style={{ color }} />;
}

// 3D Tilt Card Component
function TiltSkillCard({ skill }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative p-5 rounded-2xl glass-card flex flex-col justify-between hover:shadow-glow-cyan cursor-pointer overflow-hidden border border-white/5"
    >
      {/* Background Accent Sheen */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{ backgroundColor: skill.color }}
      />

      <div>
        {/* Top Header: Icon + Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner"
            style={{ borderColor: `${skill.color}40` }}
          >
            <SkillIcon name={skill.icon} color={skill.color} />
          </div>

          <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
            {skill.categoryName}
          </span>
        </div>

        {/* Skill Title */}
        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
          {skill.name}
        </h3>

        {/* Short Technical Description */}
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          {skill.description}
        </p>
      </div>

      {/* Card Footer: Highlight Tag */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-500">FOCUS</span>
        <span className="font-semibold" style={{ color: skill.color }}>
          {skill.highlight}
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory =
      activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Code2 size={13} />
            <span>02 // TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Skills &amp; Technology Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
            Comprehensive tools, frameworks, and hardware architectures utilized across AI, Computer Vision, and Full-Stack Engineering.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-white/5 max-w-full overflow-x-auto">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Animated Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <TiltSkillCard key={`${skill.category}-${skill.name}`} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            No matching technologies found. Try another query or category filter.
          </div>
        )}
      </div>
    </section>
  );
}
