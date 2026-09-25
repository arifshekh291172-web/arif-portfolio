import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Instagram, MapPin, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { socialLinks, contactDetails } from '../data/socials';
import { sendContactMessage } from '../services/contact';

function SocialIcon({ name, size = 18 }) {
  if (name === 'Mail') return <Mail size={size} />;
  if (name === 'Github') return <Github size={size} />;
  if (name === 'Linkedin') return <Linkedin size={size} />;
  if (name === 'Instagram') return <Instagram size={size} />;
  return <Mail size={size} />;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.type) setStatus({ type: null, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await sendContactMessage(formData);
      setStatus({ type: 'success', message: res.message });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Celebrate with confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00F0FF', '#A855F7', '#3B82F6'],
        });
      } catch (err) {
        // Safe fallback
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Submission failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#030712]/70">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Send size={13} />
            <span>08 // TRANSMISSION PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Let's Build Something Intelligent.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Available for internships, AI/ML engineering collaborations, hackathons, and technical projects.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact & Social Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-white/5 flex items-center gap-2">
                <Sparkles size={15} className="text-cyan-400" />
                <span>DIRECT CHANNELS</span>
              </h3>

              <div className="space-y-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform"
                        style={{ color: item.accent }}
                      >
                        <SocialIcon name={item.icon} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </div>
                        <div className="text-xs font-mono text-slate-400">
                          {item.value}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 uppercase">
                      CONNECT &rarr;
                    </span>
                  </a>
                ))}
              </div>

              {/* Status / Location Meta */}
              <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{contactDetails.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-purple-400 flex-shrink-0" />
                  <span>Response: <strong className="text-slate-200">{contactDetails.typicalResponseTime}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-cyan-500/20">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Internship opportunity / AI Project / Technical inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your project, internship scope, or technical query in detail..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Feedback Message Banner */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 text-xs font-mono ${
                      status.type === 'success'
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                        : 'bg-red-950/60 border border-red-500/40 text-red-300'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 size={16} className="flex-shrink-0" />
                    ) : (
                      <AlertCircle size={16} className="flex-shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-cyan hover:shadow-cyan-400/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING TRANSMISSION...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
