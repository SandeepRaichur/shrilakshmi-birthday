import React, { useState, useEffect } from 'react';
import LandingHero from './components/LandingHero';
import Navbar from './components/Navbar';
import OurStorySection from './components/OurStorySection';
import PhotosSection from './components/PhotosSection';
import LetterSection from './components/LetterSection';
import FinalScreen from './components/FinalScreen';
import { shrilakshmiContent } from './data/shrilakshmi';

export default function App() {
  const sections = shrilakshmiContent.sections || {};
  const [activeSection, setActiveSection] = useState('story');

  // Track active section for navbar on scroll
  useEffect(() => {
    const sectionIds = ['story', 'gallery', 'letter'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (targetId) => {
    setActiveSection(targetId);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('story');
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-chartreuse selection:text-ink antialiased">
      
      {/* 1. EDITORIAL OPENING MASTHEAD & GREETING */}
      {sections.hero !== false && (
        <LandingHero
          onEnter={() => handleNavigate('story')}
          onScrollToIndex={() => handleNavigate('story')}
        />
      )}

      {/* 2. STICKY EDITORIAL NAVBAR */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 3. MAIN EDITORIAL CONTENT FLOW */}
      <main className="w-full flex flex-col items-center">
        
        {/* SECTION 01: OUR UNEXPECTED LITTLE STORY (10 Real Chronicle Chapters) */}
        {sections.story !== false && (
          <OurStorySection />
        )}

        {/* SECTION 02: THE SHRILAKSHMI ARCHIVE (The 3 Curated Photo Collections + Lightbox) */}
        {sections.gallery !== false && (
          <PhotosSection />
        )}

        {/* SECTION 03: A SINCERE FRIENDSHIP LETTER (66 Words) */}
        {sections.letter !== false && (
          <LetterSection />
        )}

      </main>

      {/* 4. COLOPHON & FOOTER */}
      {sections.colophon !== false && (
        <FinalScreen onScrollToTop={handleScrollToTop} />
      )}

    </div>
  );
}
