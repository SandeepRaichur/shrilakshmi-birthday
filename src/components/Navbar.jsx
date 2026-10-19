import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Compass, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { toggleSound, isSoundEnabled, playPop } from '../utils/audioEffects';
import { shrilakshmiContent } from '../data/shrilakshmi';

export default function Navbar({
  activeSection,
  onNavigate,
  discoveries = [],
  onOpenSecret,
  onOpenBadges,
}) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const sections = shrilakshmiContent.sections || {};
  const recipientName = shrilakshmiContent.profile?.name || "Shrilakshmi";

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const navItems = [
    { id: 'desk', label: 'Cozy Desk', icon: '🏠' },
    { id: 'garden', label: 'Terrarium', icon: '🪴', enabled: sections.garden !== false },
    { id: 'arcade', label: 'Arcade', icon: '🕹️', enabled: sections.games !== false },
    { id: 'about-shrilakshmi', label: 'Dossier', icon: '🗂️', enabled: sections.memes !== false },
    { id: 'photos', label: 'Photos', icon: '📷', enabled: sections.photos !== false },
    { id: 'little-things', label: 'Scrapbook', icon: '💌', enabled: sections.littleThings !== false },
    { id: 'heart', label: 'Letter', icon: '✨', enabled: sections.personalMessage !== false },
  ].filter((item) => item.enabled !== false);

  const discoveryCount = discoveries.length;

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 backdrop-blur-xl bg-white/80 dark:bg-stone-900/80 border-b border-purple-100/60 dark:border-stone-800 shadow-xs transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playPop();
            onNavigate('desk');
          }}
          className="flex items-center gap-2 text-stone-800 dark:text-stone-100 font-serif font-bold text-lg sm:text-xl cursor-pointer"
        >
          <span className="text-2xl filter drop-shadow-xs">🌷</span>
          <span>
            for{' '}
            <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 bg-clip-text text-transparent italic">
              {recipientName}
            </span>
          </span>
        </motion.button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/85 dark:bg-stone-800/80 p-1.5 rounded-full border border-purple-100/80 dark:border-stone-700 shadow-glass">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playPop();
                  onNavigate(item.id);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-stone-900 dark:text-white font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white dark:bg-stone-700 rounded-full border border-purple-200/80 dark:border-stone-600 shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Badges */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playPop();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-stone-800 border border-purple-200/80 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs sm:text-sm font-medium shadow-2xs hover:border-purple-300 transition-colors"
            title="Click to view discovered badges"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{discoveryCount}/8 found</span>
          </motion.button>

          {/* Sound Toggle Button */}
          <button
            onClick={handleSoundToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 ${
              soundOn
                ? 'bg-purple-100 text-purple-700 border-purple-300 shadow-xs'
                : 'bg-white/90 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700 hover:text-stone-700'
            }`}
            title={soundOn ? 'Sound is ON' : 'Sound is OFF (Click to enable)'}
          >
            {soundOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                <span className="hidden sm:inline">Sound: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Sound: OFF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
