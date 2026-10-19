import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, isSoundEnabled, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function Navbar({ activeSection, onNavigate }) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const profile = shrilakshmiContent.profile || {};

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const navLinks = [
    { id: 'story', label: 'OUR STORY', target: 'story' },
    { id: 'gallery', label: 'PHOTOS', target: 'gallery' },
    { id: 'letter', label: 'A LETTER', target: 'letter' },
  ];

  const handleNavClick = (target) => {
    playPop();
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-paper/92 backdrop-blur-md border-b border-paper-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Editorial Monogram */}
        <button
          onClick={() => {
            playPop();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left cursor-pointer group flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-olive inline-block group-hover:scale-125 transition-transform" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-ink uppercase font-semibold group-hover:text-olive transition-colors">
            {profile.name?.toUpperCase() || "SHRILAKSHMI"}
          </span>
          <span className="text-[10px] font-mono text-muted-text hidden sm:inline">
            · {profile.year || "2026"}
          </span>
        </button>

        {/* Center: Editorial Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || activeSection === link.target;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.target)}
                className={`relative text-[11px] sm:text-xs font-mono tracking-widest uppercase px-2.5 py-1 transition-all rounded-xs cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-ink font-bold bg-ink/5'
                    : 'text-muted-text hover:text-ink'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-olive"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Sound Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSoundToggle}
            className="p-1.5 rounded-sm border border-paper-border hover:border-ink text-muted-text hover:text-ink transition-colors cursor-pointer"
            title={soundOn ? 'Mute subtle paper audio' : 'Enable subtle paper audio'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </nav>
  );
}
