import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, GitBranch, Star, Code2, ExternalLink, Terminal, AlertCircle } from 'lucide-react';
import { GITHUB_USERNAME } from '../services/api';
import { projectsData } from '../data/projects';

export default function GithubSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!GITHUB_USERNAME) return;

    const fetchGithubData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.warn('Unable to load GitHub repositories:', err.message);
        setError('GitHub API temporarily unavailable or rate limited.');
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <section id="github" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Github size={13} />
            <span>07 // OPEN SOURCE CODEBASES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Code. Build. Experiment.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Open-source repositories, algorithms, computer vision scripts, and hardware firmwares.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl glass-card border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono">8</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Engineered Projects</div>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono">40+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Tech Stack Tools</div>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono">4</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Core Disciplines</div>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Hands-on Code</div>
          </div>
        </div>

        {/* GitHub Live Feed or Graceful Placeholder */}
        {GITHUB_USERNAME && !error ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/5">
              <span>ACTIVE REPOSITORIES FOR @{GITHUB_USERNAME}</span>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View Full Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                FETCHING REPOSITORIES VIA GITHUB API...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 hover:shadow-glow-cyan transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm group-hover:text-cyan-200">
                          <Code2 size={16} />
                          <span className="truncate">{repo.name}</span>
                        </div>
                        <ExternalLink size={13} className="text-slate-500 group-hover:text-cyan-400" />
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {repo.description || 'Public technical repository.'}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>{repo.language || 'Code'}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch size={12} />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Graceful State when GitHub username is not configured */
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-glow-cyan">
              <Github size={28} />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              GitHub Integration Coming Soon
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
              Live GitHub API sync activates seamlessly by providing <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-0.5 rounded">VITE_GITHUB_USERNAME</code> in the environment configuration. In the meantime, explore all verified source code pipelines in the project showcase above.
            </p>

            <div className="pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-400 transition-all shadow-sm"
              >
                <Terminal size={14} />
                <span>Explore Project Codebases</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
