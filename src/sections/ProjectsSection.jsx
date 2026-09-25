import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Cpu,
  Eye,
  Bot,
  Activity,
  ArrowUpRight,
  Workflow
} from 'lucide-react';
import { projectCategories, projectsData } from '../data/projects';
import ProjectModal from '../components/ui/ProjectModal';

// Futuristic Visual Graphic Banner for Project Card
function ProjectVisualBanner({ category, title, color }) {
  return (
    <div className="relative w-full h-44 sm:h-52 bg-gradient-to-br from-slate-950 via-[#0B1020] to-slate-900 overflow-hidden flex items-center justify-center p-4 border-b border-white/5">
      {/* Ambient Radial Mesh Glow */}
      <div
        className="absolute w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Dynamic Graphic Icon Core based on category */}
      <div className="relative z-10 flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
        <div
          className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-lg"
          style={{ borderColor: `${color}60` }}
        >
          {category === 'ai-ml' && <Bot size={30} style={{ color }} />}
          {category === 'vision' && <Eye size={30} style={{ color }} />}
          {category === 'iot' && <Cpu size={30} style={{ color }} />}
          {category === 'fullstack' && <Layers size={30} style={{ color }} />}
        </div>
        <span className="font-mono text-[11px] text-slate-400 tracking-wider">
          PROJECT // 3D SPEC
        </span>
      </div>

      {/* Futuristic Corner Tech Accents */}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-slate-500">
        ● PIPELINE ACTIVE
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-cyan-400/80">
        [SYS.ARCH]
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#030712]/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Layers size={13} />
            <span>03 // FEATURED SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Engineered Systems &amp; Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
            A portfolio of production prototypes, computer vision tools, RAG architectures, IoT telemetry, and full-stack software.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5 hover:border-cyan-500/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group rounded-3xl glass-card border border-white/10 hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-950/40 transition-all duration-300"
              >
                <div>
                  {/* Visual Top Graphic */}
                  <ProjectVisualBanner
                    category={project.category}
                    title={project.title}
                    color={project.accentColor}
                  />

                  {/* Card Content Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                        {project.badge || project.categoryName}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-500">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-glow-cyan"
                  >
                    <Workflow size={14} />
                    <span>View Architecture</span>
                  </button>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Source Code on GitHub"
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                      title="View Source on GitHub"
                    >
                      <Github size={16} />
                    </a>
                  )}

                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Live Demo"
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                      title="Open Live Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Cinematic Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
