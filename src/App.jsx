import React, { useState } from 'react';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import BackgroundCanvas from './components/3d/BackgroundCanvas';
import Navbar from './components/ui/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import JourneySection from './sections/JourneySection';
import ChatbotSection from './sections/ChatbotSection';
import AchievementsSection from './sections/AchievementsSection';
import GithubSection from './sections/GithubSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/ui/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Initial Cinematic Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Custom Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Global Ambient 3D Particle Starfield */}
      <BackgroundCanvas />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ChatbotSection />
        <AchievementsSection />
        <GithubSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
